'use client';

import { useState, useCallback } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// FIX #7 — HEIC removed: OpenAI/Gemini Vision APIs do not support HEIC.
// Supported formats: JPEG, PNG, WebP.
const ACCEPTED_TYPES: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png':  ['.png'],
  'image/webp': ['.webp'],
};

interface UseImageUploadReturn {
  file: File | null;
  preview: string | null;
  isUploading: boolean;
  error: string | null;
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  clearFile: () => void;
  getRootProps: ReturnType<typeof useDropzone>['getRootProps'];
  getInputProps: ReturnType<typeof useDropzone>['getInputProps'];
  isDragActive: boolean;
}

export function useImageUpload(): UseImageUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearFile = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setError(null);
    setIsUploading(false);
  }, [preview]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        const code = rejection.errors[0]?.code;
        if (code === 'file-too-large') {
          setError('File is too large. Maximum size is 10 MB.');
        } else if (code === 'file-invalid-type') {
          setError('Invalid file type. Please upload a JPG, PNG, or WebP image.');
        } else {
          setError('File could not be accepted. Please try again.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const accepted = acceptedFiles[0];
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        setFile(accepted);
        setPreview(URL.createObjectURL(accepted));
      }
    },
    [preview],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  return {
    file,
    preview,
    isUploading,
    error,
    onDrop,
    clearFile,
    getRootProps,
    getInputProps,
    isDragActive,
  };
}
