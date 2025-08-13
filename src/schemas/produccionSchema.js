import {z} from 'zod'

export const ProduccionSchema = z.object({
    id: z.number().int().positive(),
    tiempo_produccion: z.number().min(0),
    tiempo_inactividad: z.number().min(0),
    fecha_hora_inicio_inactividad: z.iso.datetime().transform((str) => new Date(str)),
    fecha_hora_termino_inactividad: z.iso.datetime().transform((str) => new Date(str)),
})

export const ProduccionesSchema = z.array(ProduccionSchema)