"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImageBoxProps {
  page: "home" | "about";
  initialUrl: string;
  label: string;
}

export function ImageBox({ page, initialUrl, label }: ImageBoxProps) {
  const [preview, setPreview] = useState<string>(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setSuccess(false);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);

    // Convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, page }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Upload failed");
          setPreview(initialUrl); // revert on error
        } else {
          setPreview(data.url);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
      } catch {
        setError("Upload failed. Please try again.");
        setPreview(initialUrl);
      } finally {
        setUploading(false);
        // Reset input so same file can be re-selected
        if (inputRef.current) inputRef.current.value = "";
      }
    };
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      {/* Square image box */}
      <button
        type="button"
        id={`image-box-${page}`}
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="group relative w-[200px] h-[200px] border-2 border-dashed border-zinc-700 rounded-lg overflow-hidden transition-all duration-200 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed"
        aria-label={`Upload image for ${label}`}
      >
        {/* Image */}
        {preview ? (
          <Image
            src={preview}
            alt={label}
            fill
            sizes="200px"
            className="object-cover"
            unoptimized={preview.startsWith("blob:")}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600">
            <span className="text-4xl">+</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="text-2xl">📷</span>
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            {uploading ? "Uploading…" : "Replace Image"}
          </span>
        </div>

        {/* Uploading spinner overlay */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-white" />
          </div>
        )}

        {/* Success badge */}
        {success && (
          <div className="absolute top-2 right-2 rounded-full bg-emerald-500 px-2 py-1 text-xs font-bold text-white shadow">
            ✓ Updated
          </div>
        )}
      </button>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      )}

      {/* Helper text */}
      <p className="text-xs text-zinc-600 font-mono">
        Click to upload · PNG, JPG, WebP · Max 5MB
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden="true"
      />
    </div>
  );
}
