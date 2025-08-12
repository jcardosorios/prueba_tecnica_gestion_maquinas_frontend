import { useState } from 'react'
import { getTareas } from '../api/tareasService'
import { useQuery } from '@tanstack/react-query'
import {PlusCircledIcon} from '@radix-ui/react-icons'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal';
import TareaTable from '../components/tareas/TareaTable'
import TareaCreateForm from '../components/tareas/TareaCreateForm'


function TareasView() {
    // Estado modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Estado de edicion
    const [editingTarea, setEditingTarea] = useState(null)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tareas'],
        queryFn : getTareas
    })

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingTarea(null)
    }

    const handleEditTarea = (tarea) => {
        setEditingTarea(tarea);
        setIsModalOpen(true);
    }

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (isError) {
        return <p>Ocurrió un error: {error.message}</p>
    }

    return (
        <Card>
            <h1 className='text-2xl font-semibold'>Tareas</h1>
            <div className='flex flex-row-reverse'>
                <button className='p-2 bg-ring/90 text-sm hover:bg-ring rounded-md flex justify-center items-center gap-2 cursor-pointer'
                    onClick={() => {
                        setIsModalOpen(true)
                        setEditingTarea(null)
                    }}
                >
                    <PlusCircledIcon />
                    Agregar tarea
                </button>
            </div>
            <TareaTable tareas={data} onEdit={handleEditTarea}/>
            <Modal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                title={editingTarea ? 'Editar tarea' : 'Agregar tarea'}
            >
                <TareaCreateForm onMutationSuccess={handleCloseModal}/>
                {/* <MaquinaCreateForm onMutationSuccess={handleCloseModal} initialData={editingMaquina} /> */}
            </Modal>
        </Card>
    )
}

export default TareasView