import { useState, useEffect } from 'react'
import { format, setHours, setMinutes } from "date-fns"
import { es } from "date-fns/locale"
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
import { getTimeFromDate } from '../../utils/utils'
import DataTimeField from '../ui/DataTimeField'

function TareaCreateForm({ onMutationSuccess, initialData = null }) {
    const [startTimeStr, setStartTimeStr] = useState("")
    const [endTimeStr, setEndTimeStr] = useState("")
    
    // Manejo de calendarios
    const [openCalendarStart, setOpenCalendarStart] = useState(false)
    const [openCalendarEnd, setOpenCalendarEnd] = useState(false)
  
    const queryClient = useQueryClient()
    const isEditing = !!initialData?.id;

    
    // Valores iniciales
    const initialValue  = {
        id_maquina: initialData?.id_maquina || '',
        fecha_hora_inicio: initialData?.fecha_hora_inicio || new Date(),
        fecha_hora_termino: isEditing ? new Date() : null,
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
        const timeString =  getTimeFromDate(new Date())
        if(isEditing){
            const startTime = getTimeFromDate(new Date(initialData?.fecha_hora_inicio)) 
            setStartTimeStr(startTime)
            setEndTimeStr(timeString)
            setValue("hora_inicio", timeString, { shouldValidate: true, shouldDirty: true })
            setValue("hora_termino", timeString, { shouldValidate: true, shouldDirty: true })
        } else {
            setStartTimeStr(timeString)
            setValue("hora_inicio", timeString, { shouldValidate: true, shouldDirty: true })
        }
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
        console.log(data)
        if(isEditing){
            const formData = {
                fecha_hora_termino: new Date(data.fecha_hora_termino.setSeconds(0,0))
            }
            mutate({id: initialData.id, formData})
            return
        }

        const formData = {
            id_maquina: data.id_maquina,
            fecha_hora_inicio: new Date(data.fecha_hora_inicio.setSeconds(0,0)),
            ...(data.fecha_hora_termino && {
                fecha_hora_termino: data.fecha_hora_termino,
            }),
        }
        
        mutate(formData)
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
            <DataTimeField 
                date_field="fecha_hora_inicio"
                openCalendar={openCalendarStart}
                setOpenCalendar={setOpenCalendarStart}
                timeStr={startTimeStr}
                getValues={getValues}
                setValue={setValue}
                isEditing={isEditing}
                handleTimeChange={handleTimeChange}
                handleClearDate={handleClearDate}
            >
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
            </DataTimeField>
            
            {/* Fecha termino */}
            <DataTimeField 
                date_field="fecha_hora_termino"
                openCalendar={openCalendarEnd}
                setOpenCalendar={setOpenCalendarEnd}
                timeStr={endTimeStr}
                getValues={getValues}
                setValue={setValue}
                isEditing={isEditing}
                handleTimeChange={handleTimeChange}
                handleClearDate={handleClearDate}
            >
                <input type="hidden" {...register("fecha_hora_termino", {
                    validate: (value) => {
                        if (getValues("hora_termino") && !value) {
                            return 'No puede haber hora de término sin fecha de término'
                        }
                        const fechaInicio = getValues("fecha_hora_inicio")
                        if (value && fechaInicio) {
                            if (value < fechaInicio) {
                                return 'La fecha de término no puede ser anterior a la fecha de inicio'
                            }
                            const inicio = new Date(fechaInicio);
                            inicio.setSeconds(0, 0);

                            const termino = new Date(value);
                            termino.setSeconds(0, 0);

                            const timeDiff = termino.getTime() - inicio.getTime();
                            const hoursDiff = timeDiff / (1000 * 60 * 60);
                            if (hoursDiff < 5) {
                                return 'La duración no puede ser menor a 5 horas'
                            }
                            if (hoursDiff > 120) {
                                return 'La duración no puede ser mayor a 120 horas'
                            }
                        }
                    }
                })} />
                <input type="hidden" {...register("hora_termino", {
                    validate: (value) => {
                        if (getValues("fecha_hora_termino") && !value) {
                            return 'Es obligatorio seleccionar una hora de termino si se ha elegido una fecha'
                        }
                    }
                })} />
                {errors.fecha_hora_termino && (
                    <ErrorMessage>{errors.fecha_hora_termino.message}</ErrorMessage>
                )}
                {errors.hora_termino && (
                    <ErrorMessage>{errors.hora_termino.message}</ErrorMessage>
                )}
            </DataTimeField>
        
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