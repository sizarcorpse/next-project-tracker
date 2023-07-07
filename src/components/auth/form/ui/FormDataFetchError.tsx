import { useRouter } from "next/navigation";

const FormDataFetchError = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 rounded-md gap-8 bg-muted sm:p-6 md:p-12 md:gap-12">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold text-center text-muted-foreground">
          Something went wrong
        </h2>
        <p className="text-sm text-center text-muted-foreground">
          We are unable to fetch your profile. Please try again after sometime.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          title="Retry"
          className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={() => router.refresh()}
        >
          Retry
        </button>
        <button
          className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FormDataFetchError;
