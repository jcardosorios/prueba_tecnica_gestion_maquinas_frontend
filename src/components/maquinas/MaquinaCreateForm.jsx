import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { createMaquina } from '../../api/maquinasService'
import ErrorMessage from "../ui/ErrorMessage";

function MaquinaCreateForm({ onMutationSuccess }) {

    const queryClient = useQueryClient()
    const initialValue  = {
        nombre: '',
        coeficiente: 1
    }

    const {register, reset, handleSubmit, formState: { errors }} = useForm({defaultValues: initialValue})

    const { mutate, isPending } = useMutation({
        mutationFn: createMaquina,
        onError: (errors) => {
            toast.error('Error al crear la máquina:', errors)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['maquinas'] })
            reset()
            toast.success('Máquina creada con éxito')
            onMutationSuccess();
        }
    })

    const handleForm = (formData) =>  mutate(formData)

    return (
    <form className="my-3 flex flex-col gap-5"
        onSubmit={handleSubmit(handleForm)}
    >
        <div className="flex flex-col">
            <label 
                htmlFor="nombre" 
                className="text-sm font-medium leading-none mb-3"
            >Nombre máquinas</label>
            <input 
                type="text"
                id="nombre"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Prensa hidraulica"
                {...register("nombre", {
                    required: 'Nombre de la máquina es obligatorio'
                })}
            />
            {errors.nombre && (
                <ErrorMessage>{errors.nombre.message}</ErrorMessage>
            )}
        </div>
        <div className="flex flex-col">
            <label 
                htmlFor="coeficiente" 
                className="text-sm font-medium leading-none mb-3"
            >Coeficiente máquina</label>
            <input 
                type="number" 
                id="coeficiente" 
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                step={0.01}
                placeholder={1.25}
                {...register('coeficiente', {
                    required: 'Coeficiente es obligatorio',
                    min: {
                        value: 1,
                        message: 'El valor mínimo es 1'
                    },
                    max: {
                        value: 3,
                        message: 'El valor máximo es 3'
                    },
                })}
            />
            {errors.coeficiente && (
                <ErrorMessage>{errors.coeficiente.message}</ErrorMessage>
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

export default MaquinaCreateForm