"use client";

import { useEffect } from "react";

import { Button } from "@/shared/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

interface CreateProductErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const CreateProductError = ({ error, reset }: CreateProductErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cannot open create product page</CardTitle>
          <CardDescription>Something went wrong while loading seller data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={reset} type="button">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProductError;
