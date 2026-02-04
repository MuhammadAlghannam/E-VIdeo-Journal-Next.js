"use client";

import { BoldIcon } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
// Removed unused type alias that referenced `any` to satisfy eslint rule

const BoldToolbar = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
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
							editor?.isActive("bold") && "bg-accent",
							className,
						)}
						onClick={(e) => {
							editor?.chain().focus().toggleBold().run();
							onClick?.(e);
						}}
						disabled={!editor?.can().chain().focus().toggleBold().run()}
						ref={ref}
						{...props}
					>
						{children || <BoldIcon className={cn(
							"h-4 w-4",
							editor?.isActive("bold") && "text-white")} />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>Bold</span>
					<span className="ml-1 text-xs text-gray-11">(cmd + b)</span>
				</TooltipContent>
			</Tooltip>
		);
	},
);

BoldToolbar.displayName = "BoldToolbar";

export { BoldToolbar };
