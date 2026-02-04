"use client";

import { LinkIcon, UnlinkIcon } from "lucide-react";
import React, { useState } from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const LinkToolbar = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, children, ...props }, ref) => {
    const { editor } = useToolbar();
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState("");

    const isLinkActive = editor?.isActive("link");

    const handleSetLink = () => {
      if (url) {
        editor?.chain().focus().setLink({ href: url }).run();
      }
      setIsOpen(false);
      setUrl("");
    };

    const handleUnsetLink = () => {
      editor?.chain().focus().unsetLink().run();
    };

    const handleToggleLink = () => {
      if (isLinkActive) {
        handleUnsetLink();
      } else {
        setIsOpen(true);
      }
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isLinkActive && "bg-accent",
                  className,
                )}
                onClick={handleToggleLink}
                ref={ref}
                {...props}
              >
                {children || (
                  isLinkActive ?
                    <UnlinkIcon className={cn("h-4 w-4", "text-white")} /> :
                    <LinkIcon className="h-4 w-4" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm font-medium">
                    Add Link
                  </Label>
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSetLink();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSetLink} disabled={!url.trim()}>
                    Add Link
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          <span>{isLinkActive ? "Remove link" : "Add link"}</span>
        </TooltipContent>
      </Tooltip>
    );
  },
);

LinkToolbar.displayName = "LinkToolbar";

export { LinkToolbar };

