"use client";

import { Heading1, Heading2, Heading3, Heading4, Type } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const headingLevels: Array<{ level: 1 | 2 | 3 | 4; label: string; icon: React.ComponentType<{ className?: string }>; shortcut: string }> = [
  { level: 1, label: "Heading 1", icon: Heading1, shortcut: "Cmd+Alt+1" },
  { level: 2, label: "Heading 2", icon: Heading2, shortcut: "Cmd+Alt+2" },
  { level: 3, label: "Heading 3", icon: Heading3, shortcut: "Cmd+Alt+3" },
  { level: 4, label: "Heading 4", icon: Heading4, shortcut: "Cmd+Alt+4" },
];

const HeadingToolbar = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    const currentHeading = headingLevels.find(level =>
      editor?.isActive("heading", { level: level.level })
    );

    const handleHeadingChange = (level: 1 | 2 | 3 | 4) => {
      if (editor?.isActive("heading", { level })) {
        // If already active, toggle back to paragraph
        editor.chain().focus().setParagraph().run();
      } else {
        // Set the heading level
        editor?.chain().focus().toggleHeading({ level }).run();
      }
      // Trigger any external click handlers without using `any`
      onClick?.(new MouseEvent("click") as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  currentHeading && "bg-accent",
                  className,
                )}
                ref={ref}
                {...props}
              >
                {children || (
                  currentHeading ?
                    React.createElement(currentHeading.icon, { className: cn("h-4 w-4", "text-white") }) :
                    <Type className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {headingLevels.map(({ level, label, icon: Icon, shortcut }) => (
                <DropdownMenuItem
                  key={level}
                  onClick={() => handleHeadingChange(level)}
                  className={cn(
                    "flex items-center gap-2",
                    editor?.isActive("heading", { level }) && "bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {shortcut}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <span>Heading</span>
        </TooltipContent>
      </Tooltip>
    );
  },
);

HeadingToolbar.displayName = "HeadingToolbar";

export { HeadingToolbar };

