"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";

export default function Error({
  // error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="container-1440 flex-center min-h-screen bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-h1-semibold text-destructive">
            Oops!
          </h1>
          <h2 className="text-h4-regular text-muted-foreground">
            Something went wrong!
          </h2>
          {/* <p className="text-h7-regular text-text-gray max-w-md mx-auto">
            {error.message}
          </p> */}
        </div>

        <div className="pt-4">
          <CustomeBtn
            onClick={reset}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            Try again
          </CustomeBtn>
        </div>
      </div>
    </main>
  );
}
