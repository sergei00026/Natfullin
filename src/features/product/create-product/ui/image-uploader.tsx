"use client";

import Image from "next/image";

import { ProductImage } from "@/entities/product/model/types";
import { Button } from "@/shared/ui/shadcn/button";

interface ImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  disabled?: boolean;
}

export const ImageUploader = ({ disabled, images, onChange }: ImageUploaderProps) => {
  const onFilesSelected = (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    const next = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));
    onChange([...images, ...next]);
  };

  const onRemove = (id: string) => {
    const target = images.find((item) => item.id === id);
    if (target) {
      URL.revokeObjectURL(target.preview);
    }
    onChange(images.filter((image) => image.id !== id));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Product images</label>
      <input
        accept="image/*"
        className="block w-full rounded-md border border-slate-300 p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white"
        disabled={disabled}
        multiple
        onChange={(event) => onFilesSelected(event.target.files)}
        type="file"
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image) => {
          return (
            <div className="space-y-2" key={image.id}>
              <Image alt={image.file.name} className="h-24 w-full rounded-md object-cover" height={96} src={image.preview} unoptimized width={160} />
              <Button className="w-full" onClick={() => onRemove(image.id)} size="sm" type="button" variant="outline">
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
