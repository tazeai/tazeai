"use client";

import NotFoundError from "@/components/not-found-error";

export default function ErrorBoundary({ error }: any) {
  return (
    <div className="p-4">
      <NotFoundError />
    </div>
  );
}
