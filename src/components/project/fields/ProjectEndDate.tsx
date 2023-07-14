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
  return (
    <FormField
      control={form.control}
      name="endDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="flex items-center justify-between gap-4 h-6">
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
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
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
