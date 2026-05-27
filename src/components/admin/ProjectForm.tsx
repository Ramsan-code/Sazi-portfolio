"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/errors";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category_id: string | { _id: string; name: string; slug: string };
}

interface ProjectFormProps {
  initialData?: {
    _id: string;
    name: string;
    category_id: { _id: string; name: string };
    subcategory_id?: { _id: string; name: string } | null;
    img: string;
    img_public_id: string;
    description: string;
    tools: string[];
  };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    name: initialData?.name || "",
    category_id: initialData?.category_id?._id || "",
    subcategory_id: initialData?.subcategory_id?._id || "",
    description: initialData?.description || "",
    tools: initialData?.tools.join(", ") || "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.img || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/category")
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []));
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!form.category_id) {
      setSubcategories([]);
      return;
    }
    setSubcategoriesLoading(true);
    fetch(`/api/subcategory?category_id=${form.category_id}`)
      .then((r) => r.json())
      .then((d) => setSubcategories(d.data || []))
      .catch(() => setSubcategories([]))
      .finally(() => setSubcategoriesLoading(false));
  }, [form.category_id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Reset subcategory when category changes
      ...(name === "category_id" ? { subcategory_id: "" } : {}),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<{ url: string; public_id: string } | null> => {
    if (!imageFile) return null;
    setUploading(true);
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(imageFile);
      });

      const res = await fetch("/api/project/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (err: unknown) {
      setError("Image upload failed: " + getErrorMessage(err, "Unknown error"));
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      let img = initialData?.img || "";
      let img_public_id = initialData?.img_public_id || "";

      // Upload new image if selected
      if (imageFile) {
        const uploaded = await uploadImage();
        if (!uploaded) return;
        img = uploaded.url;
        img_public_id = uploaded.public_id;
      }

      if (!img) {
        setError("Please select a project image.");
        return;
      }

      const payload = {
        name: form.name,
        category_id: form.category_id,
        subcategory_id: form.subcategory_id || null,
        img,
        img_public_id,
        description: form.description,
        tools: form.tools.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const url = isEdit
        ? `/api/project/${initialData._id}`
        : "/api/project";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setSuccess(isEdit ? "Project updated!" : "Project created!");
      if (!isEdit) router.push("/admin/projects");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Something went wrong."));
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategory = categories.find((c) => c._id === form.category_id);
  const hasSubcategories = subcategories.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Project Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Project Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="e.g. Acme Brand Identity"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Category */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Category
          </label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Subcategory
          </label>
          <select
            name="subcategory_id"
            value={form.subcategory_id}
            onChange={handleChange}
            disabled={!form.category_id || subcategoriesLoading || !hasSubcategories}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {subcategoriesLoading
                ? "Loading subcategories..."
                : hasSubcategories
                ? "Select a subcategory"
                : "No subcategory required"}
            </option>
            {subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-zinc-500">
            {selectedCategory
              ? hasSubcategories
                ? `Choose the relevant ${selectedCategory.name} type.`
                : `${selectedCategory.name} projects do not need a subcategory.`
              : "Choose a category first."}
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Project Image
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full h-52 bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-white transition-colors overflow-hidden group"
        >
          {imagePreview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-bold uppercase tracking-widest">
                  Change Image
                </span>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-zinc-500 text-sm">Click to upload image</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe this project..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
        />
      </div>

      {/* Tools */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Tools Used
          <span className="ml-2 text-zinc-600 normal-case tracking-normal font-normal">
            (comma separated)
          </span>
        </label>
        <input
          name="tools"
          value={form.tools}
          onChange={handleChange}
          placeholder="Illustrator, Photoshop, Figma"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Error / Success */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 text-sm">
          {success}
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="flex-1 bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading
            ? "Uploading..."
            : submitting
            ? "Saving..."
            : isEdit
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
}
