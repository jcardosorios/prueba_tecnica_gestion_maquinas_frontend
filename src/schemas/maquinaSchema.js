import {z} from 'zod'

export const MaquinaSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().max(255),
    coeficiente: z.number().min(1).max(3)
})

export const MaquinasSchema = z.array(MaquinaSchema)

export const CrearMaquinaSchema = MaquinaSchema.omit({
    id: true
})
