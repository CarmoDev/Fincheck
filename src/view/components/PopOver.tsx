import * as RdxPopover from "@radix-ui/react-popover";
import { cn } from "../../app/utils/cn";

function PopOverRoot({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopOverTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxPopover.Trigger className="outline-none" asChild>
      {children}
    </RdxPopover.Trigger>
  );
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "end" | "start";
  side?: "left" | "right" | "bottom" | "top";
}

function PopOverContent({
  children,
  className,
  align,
  side,
}: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        align={align}
        side={side}
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]  z-[99]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade p-4",
          className
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const PopOver = {
  Root: PopOverRoot,
  Trigger: PopOverTrigger,
  Content: PopOverContent,
};
