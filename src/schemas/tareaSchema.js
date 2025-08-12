import {z} from 'zod'

export const TareaSchema = z.object({
    id: z.number().int().positive(),
    id_produccion: z.number().int().positive().optional().nullable(),
    id_maquina: z.number().int().positive(),
    fecha_hora_inicio: z.iso.datetime().transform((str) => new Date(str)),
    fecha_hora_termino: z.iso.datetime().transform((str) => new Date(str)).optional().nullable(),
    tiempo_empleado: z.number().min(0).optional().nullable(),
    tiempo_produccion: z.number().min(0).optional().nullable(),
    estado: z.enum(['PENDIENTE', 'COMPLETADA'])
})

export const TareasSchema = z.array(TareaSchema)

export const CrearTareaSchema = TareaSchema.omit({
    id: true,
    id_produccion: true,
    tiempo_empleado: true,
    tiempo_produccion: true,
    estado: true
})