import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker } from "react-day-picker"
import { twMerge } from 'tailwind-merge';
import "react-day-picker/style.css";

function Calendar({className, showOutsideDays = true, ...props}) {
  return (
    <DayPicker
        showOutsideDays={showOutsideDays}
        className={twMerge("p-3 bg-white z-[1000] rounded-md", className)}
        components={{
            IconLeft: ({ className, ...props }) => (
                <ChevronLeftIcon className={cn("h-4 w-4", className)} {...props} />
            ),
            IconRight: ({ className, ...props }) => (
                <ChevronRightIcon className={cn("h-4 w-4", className)} {...props} />
            ),
        }}
        {...props}
        // onSelect={}
    />
  )
}

export default Calendar