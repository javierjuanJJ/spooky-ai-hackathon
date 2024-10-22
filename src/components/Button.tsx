import React from "react";
import {cn} from "../lib/utils/utils"
export const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}
>(({className, variant = "default", ...props}, ref) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                {
                    "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
                    "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                    "text-primary underline-offset-4 hover:underline": variant === "link",
                },
                className
            )}
            ref={ref}
            {...props}
        />
    )
})