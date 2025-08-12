import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { createMaquina, updateMaquina } from '../../api/maquinasService'
import ErrorMessage from "../ui/ErrorMessage";

function MaquinaCreateForm({ onMutationSuccess, initialData = null }) {

    const queryClient = useQueryClient()
    const isEditing = !!initialData?.id;
    
    const initialValue  = {
        id: initialData?.id || '',
        nombre: initialData?.nombre || '',
        coeficiente: initialData?.coeficiente || 1
    }

    const {register, reset, handleSubmit, formState: { errors }} = useForm({defaultValues: initialValue})

    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData, reset]);

    // QUery para Edicion de maquinas 
    const { mutate, isPending } = useMutation({
        mutationFn: isEditing ? updateMaquina : createMaquina,
        onError: (error) => {
            toast.error(`Error al ${isEditing ? 'editar' : 'crear'} la máquina: ${error.message}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maquinas'] })
            reset()
            toast.success(`Máquina ${isEditing ? 'editada' : 'creada'} con éxito`)
            onMutationSuccess();
        }
    })

    const handleForm = (formData) => {
        formData = {
            nombre: formData.nombre,
            coeficiente: formData.coeficiente
        }
        if (isEditing) {
            mutate({id: initialData.id, formData});
        } else {
            mutate(formData);
        }
    }

    return (
    <form className="my-3 flex flex-col gap-5"
        onSubmit={handleSubmit(handleForm)}
    >
        {initialValue?.id && (
            <div className="flex flex-col">
                <label 
                    htmlFor="id" 
                    className="text-sm font-medium leading-none mb-3"
                >ID máquina</label>
                <input 
                    type="text"
                    id="id"
                    disabled
                    value={initialValue.id}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:bg-muted disabled:text-muted-foreground"
                />
            </div>
        )}
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