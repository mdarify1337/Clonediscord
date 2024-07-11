"use client";

import {
    Tooltip, 
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"


interface   ActionTooltipProps{
    label:string,
    children: React.ReactNode,
    side?: "top" | "right" | "bottom" | "left",
    align?: "start" | "center"| "end"
}

export default function AciontTooltip({
    label,
    children,
    side,
    align
}: ActionTooltipProps){
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p
                        className="font-semibold text-sm capitalize"
                    >
                        {label.toLocaleLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}