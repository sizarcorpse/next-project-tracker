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
const TagOverview = async () => {
  return (
    <Card className="flex flex-col items-start justify-start gap-6 p-4">
      <CardHeader className="p-0 w-full">
        <div className="flex flex-row justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Tags</CardTitle>
            <CardDescription className="text-sm">
              Overview of all tags
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-12">
          <div className="pr-4 w-full flex flex-row items-start justify-start gap-2 flex-wrap"></div>
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

export default TagOverview;
