import { Badge } from "@radix-ui/themes"
import { twMerge } from 'tailwind-merge';


function BadgeCustom({children, estado}) {
    const colors = estado=='COMPLETADA' ? 'bg-green-400 text-green-700' : 'bg-muted '
    const baseBadgeClasses = "px-1 py-0.5 text-xs rounded-full flex font-semibold items-center gap-1 text-[10px] justify-center"
    const itemClasses = twMerge(baseBadgeClasses, colors)
    return (
        <span className={itemClasses} >{children}</span>
    )
}

export default BadgeCustom