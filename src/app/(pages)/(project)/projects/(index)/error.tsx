"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 items-start justify-start">
        <h2 className="text-2xl font-bold lg:text-3xl">
          Something went wrong 🤒
        </h2>
        <p>
          An error occurred while rendering this page. Please contact your
          administrator.
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <Button onClick={reset}>Try again</Button>
        <Button onClick={() => router.push("/")} variant="secondary">
          Go home
        </Button>
      </div>
    </div>
  );
}
