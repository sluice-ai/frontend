import { useCallback, useEffect, useState } from "react";

import type { ImageAttachment } from "@/features/routing-workbench/types";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export function useImageAttachment() {
  const [imageAttachment, setImageAttachment] =
    useState<ImageAttachment | null>(null);

  const removeImage = useCallback(() => {
    setImageAttachment((current) => {
      if (current?.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }
      return null;
    });
  }, []);

  const attachFile = useCallback((file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      window.alert("Image is too large. Maximum size is 10 MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file (JPEG, PNG, WebP, or GIF).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result ?? "");
      const previewUrl = URL.createObjectURL(file);

      setImageAttachment((current) => {
        if (current?.previewUrl) {
          URL.revokeObjectURL(current.previewUrl);
        }
        return {
          file,
          base64,
          mimeType: file.type,
          previewUrl,
        };
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImageSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;

      attachFile(file);
    },
    [attachFile],
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (!item.type.startsWith("image/")) continue;

        const file = item.getAsFile();
        if (!file) continue;

        attachFile(file);
        event.preventDefault();
        break;
      }
    },
    [attachFile],
  );

  useEffect(() => removeImage, [removeImage]);

  return {
    imageAttachment,
    handleImageSelect,
    handlePaste,
    removeImage,
  };
}
