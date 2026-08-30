import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-accent text-bg hover:bg-accent/90",
        outline:
          "border border-line bg-transparent text-ink hover:border-accent/60 hover:text-accent",
        ghost: "text-muted hover:bg-bg-elev hover:text-ink",
        phosphor:
          "border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20",
      },
      size: {
        default: "h-9 px-3.5",
        sm: "h-8 px-2.5",
        lg: "h-11 px-5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
