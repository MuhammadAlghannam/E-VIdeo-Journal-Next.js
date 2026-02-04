"use client";

import { UnderlineIcon } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const UnderlineToolbar = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              editor?.isActive("underline") && "bg-accent",
              className,
            )}
            onClick={(e) => {
              e.preventDefault()
              editor?.chain().focus().toggleUnderline().run();
              onClick?.(e);
            }}
            disabled={!editor?.can().chain().focus().toggleUnderline().run()}
            ref={ref}
            {...props}
          >
            {children || <UnderlineIcon className={cn(
              "h-4 w-4",
              editor?.isActive("underline") && "text-white"
            )} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Underline</span>
          <span className="ml-1 text-xs text-gray-11">(cmd + u)</span>
        </TooltipContent>
      </Tooltip>
    );
  },
);

UnderlineToolbar.displayName = "UnderlineToolbar";

export { UnderlineToolbar };

