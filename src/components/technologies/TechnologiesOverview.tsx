"use client";

import { CreateTechnology, TechnologyCard } from "@/components/technologies";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import useSWR from "swr";

const TechnologiesOverview = () => {
  const { data, error } = useSWR(`${process.env.NEXT_API_URL}/technologies`, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  const { technologies, total } = data?.data || {
    technologies: [],
    total: 0,
  };

  return (
    <Card className="flex flex-col items-start justify-start gap-6 p-4 h-max">
      <CardHeader className="p-0 w-full">
        <div className="flex flex-row justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Technologies</CardTitle>
            <CardDescription className="text-sm">
              Manage your Technologies here
            </CardDescription>
          </div>
          <CreateTechnology />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-44">
          <div className="pr-4 w-full flex flex-row items-start justify-start gap-2 flex-wrap">
            {technologies &&
              technologies.map((item: any, index: any) => (
                <TechnologyCard key={index} item={item} />
              ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-0 w-full flex items-center justify-end">
        <Button variant="ghost" className="text-sm p-2">
          Discover All <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TechnologiesOverview;
