"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProjectEndDate = ({ form }: any) => {
  const endDate = form.getValues("endDate");
  const prismaDateTime = endDate;
  const formattedDate =
    prismaDateTime != undefined
      ? format(new Date(prismaDateTime), "MMM d, y")
      : null;

  return (
    <FormField
      control={form.control}
      name="endDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="flex items-center justify-between gap-4 h-[27px]">
            <div className="flex items-center justify-start gap-2">
              <CalendarDays size={16} />
              <p>Project Termination Date</p>
            </div>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full flex items-center justify-start gap-2 border-0 bg-muted px-3 py-2",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="h-4 w-4 opacity-50" />
                  {field.value ? formattedDate : <span>Pick a date</span>}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(field.value)}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProjectEndDate;
