"use client";

import { useState } from "react";

export default function AdminUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify({ image: reader.result }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Uploaded ✅");
      setFile(null);
      setPreview("");
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="w-[400px] bg-white shadow-xl border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">
          Upload Image
        </h2>

        {/* Upload Box */}
        <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 hover:border-blue-500 transition">

          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
          ) : (
            <p className="text-gray-500">
              Click or drag image here
            </p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file}
          className="mt-5 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50"
        >
          Upload to Cloudinary
        </button>

      </div>

    </div>
  );
}