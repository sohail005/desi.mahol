"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Category } from "@/types/music";

interface CategoryManagerProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onCreateCategory: (name: string) => Promise<void>;
}

export default function CategoryManager({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onCreateCategory,
}: CategoryManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);
    try {
      await onCreateCategory(name);
      setName("");
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't create category.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <span className="mb-1 block text-xs font-semibold text-white/60 uppercase">Category</span>
      <div className="flex items-center gap-2">
        <select
          value={selectedCategoryId}
          onChange={(event) => onSelectCategory(event.target.value)}
          className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-amber-400/60"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Create category"
          className="liquid-glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
        >
          <Plus size={16} />
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleCreate}
            onClick={(event) => event.stopPropagation()}
            className="liquid-glass-card relative w-full max-w-xs rounded-2xl p-5 text-white"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 text-white/50 hover:text-white"
            >
              <X size={16} />
            </button>
            <h3 className="mb-3 text-sm font-semibold">New category</h3>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Happy"
              className="mb-3 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-amber-400/60"
            />
            {error && <p className="mb-3 text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={isSaving}
              className="liquid-glass liquid-glass-accent w-full rounded-xl py-2 text-sm font-semibold disabled:opacity-60"
            >
              {isSaving ? "Creating…" : "Create"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
