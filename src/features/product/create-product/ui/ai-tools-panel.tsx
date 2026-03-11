"use client";

import { Button } from "@/shared/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

interface AiToolsPanelProps {
  onGenerateProductData: () => void;
  onImproveDescription: () => void;
  onSuggestCategory: () => void;
  loading?: boolean;
}

export const AiToolsPanel = ({ loading, onGenerateProductData, onImproveDescription, onSuggestCategory }: AiToolsPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Tools</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button disabled={loading} onClick={onGenerateProductData} type="button" variant="secondary">
          Generate full product card
        </Button>
        <Button disabled={loading} onClick={onImproveDescription} type="button" variant="secondary">
          Improve description readability
        </Button>
        <Button disabled={loading} onClick={onSuggestCategory} type="button" variant="secondary">
          Suggest category automatically
        </Button>
      </CardContent>
    </Card>
  );
};
