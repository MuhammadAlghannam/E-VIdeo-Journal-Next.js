import CustomeBtn from "@/components/shared/CustomeBtn";

export default function NotFound() {
  return (
    <main className="container-1440 flex-center min-h-screen bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-h1-semibold text-foreground">
            404
          </h1>
          <h2 className="text-h4-regular text-muted-foreground">
            This page could not be found
          </h2>
          <p className="text-h7-regular text-text-gray max-w-md mx-auto">
            The page you&apos;re looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4">
          <CustomeBtn
            href="/"
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            Go back home
          </CustomeBtn>
        </div>
      </div>
    </main>
  );
}

