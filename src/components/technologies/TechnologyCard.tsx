"use client";

import { Svg } from "@/components/common";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
type TechnologyCardProps = {
  item: {
    name: string;
    icon: string;
    slug: string;
  };
  className?: string;
};

const TechnologyCard: FC<TechnologyCardProps> = ({ item, className }) => {
  const { name, icon, slug } = item;
  const router = useRouter();

  if (!item) return <Skeleton className="h-9 w-12 bg-secondary" />;

  return (
    <Card
      className={cn(
        "group flex flex-row items-center py-2 px-4 gap-2 cursor-pointer hover:bg-primary hover:text-primary-foreground",
        className
      )}
      onClick={() => router.push(`/technology/${slug}`)}
    >
      <Svg
        className="w-4 h-4 fill-card-foreground group-hover:fill-primary-foreground"
        url={icon}
      />
      <CardTitle className="text-sm font-normal">{name}</CardTitle>
    </Card>
  );
};

export default TechnologyCard;
