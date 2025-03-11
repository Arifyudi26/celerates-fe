import { PageTitleProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

export default function PageTitle({ title, classname }: PageTitleProps) {
  return <h1 className={cn("text-2xl font-semibold", classname)}>{title}</h1>;
}
