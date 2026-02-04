"use client";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Align = "left" | "center" | "right" | "justify";

interface TextAlignButtonProps extends React.ComponentProps<typeof Button> {
  align?: Align;
}

const alignToIcon: Record<Align, React.ComponentType<{ className?: string }>> = {
  left: AlignLeft,
  center: AlignCenter,
  right: AlignRight,
  justify: AlignJustify,
};

const alignToLabel: Record<Align, string> = {
  left: "Align left",
  center: "Align center",
  right: "Align right",
  justify: "Align justify",
};

// Ensure command typings by importing the extension module augmentation
import "@tiptap/extension-text-align";

const TextAlignButton = React.forwardRef<HTMLButtonElement, TextAlignButtonProps>(
  ({ className, onClick, children, align = "left", ...props }, ref) => {
    const { editor } = useToolbar();

    const Icon = alignToIcon[align];
    const label = alignToLabel[align];

    const isActive = editor?.isActive({ textAlign: align }) || false;
    const canRun = editor?.can().chain().focus().setTextAlign(align).run() || false;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", isActive && "bg-accent", className)}
            onClick={(e) => {
              if (editor && canRun) {
                editor.chain().focus().setTextAlign(align).run();
              }
              onClick?.(e);
            }}
            disabled={!canRun}
            ref={ref}
            aria-label={label}
            {...props}
          >
            {children || <Icon className={cn(
              "h-4 w-4",
              isActive && "text-white"
            )} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    );
  },
);

TextAlignButton.displayName = "TextAlignButton";

export { TextAlignButton };


