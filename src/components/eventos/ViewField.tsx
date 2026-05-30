import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ViewFieldProps {
  label: string;
  /** When empty/nullish a "-" placeholder is shown. */
  value?: ReactNode;
  className?: string;
}

/** Read-only label + value pair used across the details (view mode). */
export function ViewField({ label, value, className }: ViewFieldProps) {
  const isEmpty =
    value === null || value === undefined || (typeof value === "string" && value.trim() === "");

  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="text-sm">{isEmpty ? "-" : value}</div>
    </div>
  );
}
