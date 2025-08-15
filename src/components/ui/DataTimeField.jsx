import { format, setHours, setMinutes } from "date-fns"
import { es } from "date-fns/locale"
import * as Popover from '@radix-ui/react-popover'
import { twMerge } from 'tailwind-merge';
import { CalendarIcon, Cross2Icon} from '@radix-ui/react-icons'
import ErrorMessage from './ErrorMessage'
import Calendar  from './Calendar';
import { date } from "zod";

function DataTimeField({
    date_field,
    openCalendar,
    setOpenCalendar,
    timeStr,
    getValues,
    setValue,
    isEditing,
    handleTimeChange,
    handleClearDate,
    children
}) {


    return (
    <div className="flex flex-col">
        <label 
            htmlFor={date_field} 
            className="text-sm font-medium leading-none mb-3"
        >Fecha y hora de {date_field.split('_')[2]}</label>
        <div className='flex gap-2'>
            <Popover.Root 
            open={isEditing & date_field == 'fecha_hora_inicio' ? false : openCalendar} 
            onOpenChange={setOpenCalendar}
            >
                <Popover.Trigger asChild>
                    <button 
                        id={date_field}
                        type="button"
                        className={twMerge("flex-1 justify-start text-left font-normal h-10 px-4 py-2 bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center whitespace-nowrap rounded-md border border-input text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-muted disabled:text-muted-foreground", !getValues(date_field) && "text-muted-foreground", isEditing & date_field == 'fecha_hora_inicio' && "bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {getValues(date_field ) ? format(getValues(date_field), "PPP", { locale: es }) : <span>Elige una fecha</span>}
                        
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content className="w-auto p-0 z-[1000]" align="start">
                        <Calendar 
                            mode="single" 
                            selected={getValues(date_field)} 
                            onSelect={(date) => {
                                setValue(date_field, date, { shouldValidate: true, shouldDirty: true })
                                setOpenCalendar(false)
                            }} 
                            initialFocus />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
            <input
                type="time"
                value={timeStr}
                disabled={date_field == 'fecha_hora_inicio' ? isEditing : false}
                onChange={(e) => handleTimeChange(date_field, e.target.value)}
                className="h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:text-muted-foreground disabled:bg-muted "
                onKeyDown={(e) => {
                    if (e.target.value && (e.key === 'Backspace' || e.key === 'Delete')) {
                        e.preventDefault();
                    }
                }}
            />
            <button 
                type="button"
                disabled={date_field == 'fecha_hora_inicio' ? isEditing : false}
                onClick={(e) => handleClearDate(date_field, e)}
                className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:disabled:bg-background"
            >
                <Cross2Icon className="h-4 w-4" />
            </button>
        </div>
        {children}
    </div>
  )
}

export default DataTimeField