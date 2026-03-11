"use client";

import { KeyboardEvent, useState } from "react";

import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import { Input } from "@/shared/ui/shadcn/input";
import { Textarea } from "@/shared/ui/shadcn/textarea";

interface SeoSectionProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onKeywordsChange: (keywords: string[]) => void;
  onGenerateSeo: () => void;
  disabled?: boolean;
}

export const SeoSection = ({
  disabled,
  onDescriptionChange,
  onGenerateSeo,
  onKeywordsChange,
  onTitleChange,
  seoDescription,
  seoKeywords,
  seoTitle,
}: SeoSectionProps) => {
  const [keywordInput, setKeywordInput] = useState("");

  const addKeyword = () => {
    const normalized = keywordInput.trim();
    if (!normalized || seoKeywords.includes(normalized)) {
      return;
    }
    onKeywordsChange([...seoKeywords, normalized]);
    setKeywordInput("");
  };

  const onKeywordEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">SEO</p>
        <Button disabled={disabled} onClick={onGenerateSeo} size="sm" type="button" variant="secondary">
          Generate with AI
        </Button>
      </div>
      <div className="space-y-1">
        <Input disabled={disabled} onChange={(event) => onTitleChange(event.target.value)} placeholder="SEO title" value={seoTitle} />
        <p className="text-right text-xs text-slate-500">{seoTitle.length}/70</p>
      </div>
      <div className="space-y-1">
        <Textarea
          disabled={disabled}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="SEO description"
          value={seoDescription}
        />
        <p className="text-right text-xs text-slate-500">{seoDescription.length}/160</p>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            disabled={disabled}
            onChange={(event) => setKeywordInput(event.target.value)}
            onKeyDown={onKeywordEnter}
            placeholder="Add keyword"
            value={keywordInput}
          />
          <Button disabled={disabled} onClick={addKeyword} type="button" variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {seoKeywords.map((keyword) => {
            return (
              <button
                className="rounded-full"
                key={keyword}
                onClick={() => onKeywordsChange(seoKeywords.filter((item) => item !== keyword))}
                type="button"
              >
                <Badge variant="secondary">{keyword} x</Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
