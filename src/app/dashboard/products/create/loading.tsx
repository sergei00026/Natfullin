import { Skeleton } from "@/shared/ui/shadcn/skeleton";

const CreateProductLoading = () => {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
      <Skeleton className="mb-6 h-32 w-full" />
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    </div>
  );
};

export default CreateProductLoading;
