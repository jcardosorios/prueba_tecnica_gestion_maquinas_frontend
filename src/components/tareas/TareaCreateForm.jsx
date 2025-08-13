import { useState, useEffect } from 'react'
import { format, setHours, setMinutes } from "date-fns"
import { es, is } from "date-fns/locale"
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import * as Popover from '@radix-ui/react-popover'
import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge';
import ErrorMessage from '../ui/ErrorMessage'
import { useForm } from 'react-hook-form'
import { CalendarIcon, Cross2Icon} from '@radix-ui/react-icons'
import { getMaquinas } from '../../api/maquinasService'
import { createTarea, updateTarea } from '../../api/tareasService'
import Calendar  from '../ui/Calendar';
import { toast } from 'react-toastify'

function TareaCreateForm({ onMutationSuccess, initialData = null }) {
    const [startTimeStr, setStartTimeStr] = useState("")
    const [endTimeStr, setEndTimeStr] = useState("")
    
    // Manejo de calendarios
    const [openCalendarStart, setOpenCalendarStart] = useState(false)
    const [openCalendarEnd, setOpenCalendarEnd] = useState(false)
  
    const queryClient = useQueryClient()
    const isEditing = !!initialData?.id;
    // console.log(initialData)
    // Valores iniciales
    const initialValue  = {
        id_maquina: initialData?.id_maquina || '',
        fecha_hora_inicio: initialData?.fecha_hora_inicio || new Date(),
        fecha_hora_termino: null,
        hora_inicio:  null,
        hora_termino: null,
    }

    // Manejo de formulario
    const {register, reset, handleSubmit, getValues, setValue, formState: { errors }} = useForm({defaultValues: initialValue})

    const { data } = useQuery({
        queryKey: ['maquinas'],
        queryFn : getMaquinas
    })

    // Valores al cargar pagina
    useEffect(() => {
        const time = initialData?.fecha_hora_inicio || new Date()
        const timeString = format(time, "HH:mm")
        setStartTimeStr(timeString)
        setValue("hora_inicio", timeString, { shouldValidate: true, shouldDirty: true })
    }, []);

    // MUtacion para crear/editar tareas
    const { mutate, isPending } = useMutation({
        mutationFn: isEditing ? updateTarea : createTarea,
        onError: (error) => {
            toast.error(`Error al ${isEditing ? 'editar' : 'crear'} la tarea: ${error.message}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tareas'] })
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['tareas'] })
            }, 5000);
            reset()
            toast.success(`Tarea ${isEditing ? 'editada' : 'creada'} con éxito`)
            onMutationSuccess()
        }
    })

    // Manejo de cambios en horas
    const handleTimeChange = (field, time) => {
        if (!time) {
            if (field === 'fecha_hora_inicio') {
                setStartTimeStr("")
                setValue('hora_inicio', null, { shouldValidate: true, shouldDirty: true });
            } else {
                setEndTimeStr("")
                setValue('hora_termino', null, { shouldValidate: true, shouldDirty: true });
            }
            setValue(field, null, { shouldValidate: true, shouldDirty: true });
            return;
        }
        const [hours, minutes] = time.split(':').map(Number)
        const currentDate = getValues(field)
        const dateToUpdate = currentDate || new Date()
        const newDate = setMinutes(setHours(dateToUpdate, hours), minutes)
        setValue(field, newDate, { shouldValidate: true, shouldDirty: true })
        
        if (field === 'fecha_hora_inicio') {
            setStartTimeStr(time);
            setValue('hora_inicio', time, { shouldValidate: true, shouldDirty: true });
        } else {
            setEndTimeStr(time);
            setValue('hora_termino', time, { shouldValidate: true, shouldDirty: true });
        }
    }

    // Manejo de limpieza de fechas
    const handleClearDate = (field, e) => {
        e.stopPropagation();
        setValue(field, null, { shouldValidate: true, shouldDirty: true });
        if (field === 'fecha_hora_inicio') {
            setStartTimeStr("");
            setValue('hora_inicio', null, { shouldValidate: true, shouldDirty: true });
        } else {
            setEndTimeStr("");
            setValue('hora_termino', null, { shouldValidate: true, shouldDirty: true });
        }
    }

    // Manejo de formulario
    const handleForm = (data) => {
        if (!isEditing) {
            const formData = {
                id_maquina: data.id_maquina,
                fecha_hora_inicio: format(data.fecha_hora_inicio, 'yyyy-MM-dd HH:mm:ss')
            }
            
            if (data.fecha_hora_termino) {
                formData['fecha_hora_termino'] = format(data.fecha_hora_termino, 'yyyy-MM-dd HH:mm')
            }
            mutate(formData)
            return
        }

        const formData = {
            fecha_hora_termino: format(data.fecha_hora_termino, 'yyyy-MM-dd HH:mm:ss')
        }
        mutate({id: initialData.id, formData})

    }

    return (
        <form className="my-3 flex flex-col gap-5"
            onSubmit={handleSubmit(handleForm)}
        >
            {initialData?.id && (
                <div className="flex flex-col">
                    <label 
                        htmlFor="id" 
                        className="text-sm font-medium leading-none mb-3"
                    >ID Tarea</label>
                    <input 
                        type="text"
                        id="id"
                        disabled
                        value={initialData.id}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:bg-muted disabled:text-muted-foreground"
                    />
                </div>
            )}
            {/* Maquina */}
            <div className="flex flex-col">
                <label 
                    htmlFor="id_maquina" 
                    className="text-sm font-medium leading-none mb-3"
                >Máquinas</label>
                <select 
                    id="id_maquina"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:bg-muted disabled:text-muted-foreground"
                    defaultValue={''}
                    disabled={isEditing}
                    {...register("id_maquina", {
                        required: 'Es obligatorio seleccionar una máquina'
                    })}
                >
                    <option value="" disabled hidden>Seleccione una máquina</option>
                    {data?.map((maquina) => {
                        return <option value={maquina.id} key={maquina.id}>{maquina.nombre}</option>
                    })}
                </select>
                {errors.id_maquina && (
                    <ErrorMessage>{errors.id_maquina.message}</ErrorMessage>
                )}
            </div>
            {/* Fecha inicio */}
            <div className="flex flex-col">
                <label 
                    htmlFor="fecha_hora_inicio" 
                    className="text-sm font-medium leading-none mb-3"
                >Fecha y hora de inicio</label>
                <div className='flex gap-2'>
                    <Popover.Root 
                    open={isEditing ? false : openCalendarStart} 
                    onOpenChange={setOpenCalendarStart}
                    >
                        <Popover.Trigger asChild>
                            <div  id='fecha_hora_inicio' disabled={isEditing} className={twMerge("flex-1 justify-start text-left font-normal h-10 px-4 py-2 bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center whitespace-nowrap rounded-md border border-input text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-muted disabled:text-muted-foreground", !getValues("fecha_hora_inicio") && "text-muted-foreground", isEditing && "bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {getValues("fecha_hora_inicio") ? format(getValues("fecha_hora_inicio"), "PPP", { locale: es }) : <span>Elige una fecha</span>}
                                
                            </div>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content className="w-auto p-0 z-[1000]" align="start">
                                <Calendar 
                                    mode="single" 
                                    selected={getValues("fecha_hora_inicio")} 
                                    onSelect={(date) => {
                                        setValue("fecha_hora_inicio", date, { shouldValidate: true, shouldDirty: true })
                                        setOpenCalendarStart(false)
                                    }} 
                                    initialFocus />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                    <input
                        type="time"
                        value={startTimeStr}
                        disabled={isEditing}
                        onChange={(e) => handleTimeChange('fecha_hora_inicio', e.target.value)}
                        className="h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:text-muted-foreground disabled:bg-muted "
                    />
                    <button 
                        type="button"
                        disabled={isEditing}
                        onClick={(e) => handleClearDate("fecha_hora_inicio", e)}
                        className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:disabled:bg-background"
                    >
                        <Cross2Icon className="h-4 w-4" />
                    </button>
                </div>
                <input type="hidden" {...register("fecha_hora_inicio", {
                    required: 'Es obligatorio seleccionar una fecha de inicio',
                    validate: (value) => {
                        if (getValues("hora_inicio") && !value) {
                            return 'No puede haber hora de inicio sin fecha de inicio';
                        }
                    }
                })} />
                <input type="hidden" {...register("hora_inicio", {
                    validate: (value) => {
                        if (getValues("fecha_hora_inicio") && !value) {
                            return 'Es obligatorio seleccionar una hora de inicio si se ha elegido una fecha'
                        }
                    }
                })} />
                {errors.fecha_hora_inicio && (
                    <ErrorMessage>{errors.fecha_hora_inicio.message}</ErrorMessage>
                )}
                {errors.hora_inicio && (
                    <ErrorMessage>{errors.hora_inicio.message}</ErrorMessage>
                )}
            </div>
            {/* Fecha termino */}
            <div className="flex flex-col">
                <label 
                    htmlFor="fecha_hora_termino" 
                    className="text-sm font-medium leading-none mb-3"
                >Fecha y hora de termino</label>
                <div className='flex gap-2'>
                    <Popover.Root  open={openCalendarEnd} onOpenChange={setOpenCalendarEnd}>
                        <Popover.Trigger asChild>
                            <button id='fecha_hora_termino' type="button" className={twMerge("flex-1 justify-start text-left font-normal h-10 px-4 py-2 bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center whitespace-nowrap rounded-md border border-input text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", !getValues("fecha_hora_termino") && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {getValues("fecha_hora_termino") ? format(getValues("fecha_hora_termino"), "PPP", { locale: es }) : <span>Elige una fecha</span>}
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content className="w-auto p-0 z-[1000]" align="start">
                                <Calendar 
                                    mode="single" 
                                    selected={getValues("fecha_hora_termino")} 
                                    onSelect={(date) => {
                                        setValue("fecha_hora_termino", date, { shouldValidate: true, shouldDirty: true })
                                        setOpenCalendarEnd(false)
                                    }} 
                                />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                    <input
                        type="time"
                        value={endTimeStr}
                        onChange={(e) => handleTimeChange('fecha_hora_termino', e.target.value)}
                        className="h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <button 
                        type="button"
                        onClick={(e) => handleClearDate("fecha_hora_termino", e)}
                        className="p-1 rounded-full text-muted-foreground hover:bg-muted"
                    >
                        <Cross2Icon className="h-4 w-4" />
                    </button>
                </div>
                <input type="hidden" {...register("fecha_hora_termino", {
                    validate: (value) => {
                        if (getValues("hora_termino") && !value) {
                            return 'No puede haber hora de término sin fecha de término'
                        }
                        const fechaInicio = getValues("fecha_hora_inicio")
                        if (value && fechaInicio && value < fechaInicio) {
                            return 'La fecha de término no puede ser anterior a la fecha de inicio'
                        }
                    }
                })} />
                {errors.fecha_hora_termino && (
                    <ErrorMessage>{errors.fecha_hora_termino.message}</ErrorMessage>
                )}
                <input type="hidden" {...register("hora_termino", {
                    validate: (value) => {
                        if (getValues("fecha_hora_termino") && !value) {
                            return 'Es obligatorio seleccionar una hora de termino si se ha elegido una fecha'
                        }
                    }
                })} />
                {errors.hora_termino && (
                    <ErrorMessage>{errors.hora_termino.message}</ErrorMessage>
                )}
            </div>
            <div className='flex justify-end gap-3 mt-4'>
                <Dialog.Close asChild>
                    <button type='button' className='bg-destructive/80 p-2 rounded-md hover:bg-destructive/90'>
                        Cancelar
                    </button>
                </Dialog.Close>
                <button type='submit' disabled={isPending} className='bg-ring/80 p-2 rounded-md hover:bg-ring/90'>Guardar</button>
            </div>
        </form>
    )
}

export default TareaCreateForm