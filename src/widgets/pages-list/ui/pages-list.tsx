import Link from "next/link";

import { AppPage } from "@/shared/config/pages";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

interface PagesListProps {
  pages: AppPage[];
}

export const PagesList = ({ pages }: PagesListProps) => {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>App Pages</CardTitle>
          <CardDescription>Add new records in `src/shared/config/pages.ts` and they will appear here automatically.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {pages.map((page) => {
          return (
            <Card key={page.path}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{page.title}</CardTitle>
                  <Badge variant="secondary">{page.section}</Badge>
                </div>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link className="text-sm font-medium text-slate-900 underline" href={page.path}>
                  Open {page.path}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
