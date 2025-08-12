
import { useState } from 'react';
import {PlusCircledIcon} from '@radix-ui/react-icons'
import { useQuery } from "@tanstack/react-query"
import { getMaquinas } from '../../api/maquinasService'
import Card from '../ui/Card'
import MaquinaTable from './MaquinaTable'
import Modal from '../ui/Modal';
import MaquinaCreateForm from './MaquinaCreateForm';

function MaquinaContent() {
    // Estado modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Estado de edicion
    const [editingMaquina, setEditingMaquina] = useState(null)

    // Query de obtención de maquinas
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['maquinas'],
        queryFn : getMaquinas
    })
    
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingMaquina(null)
    }

    const handleEditMaquina = (maquina) => {
        setEditingMaquina(maquina);
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
        <h1 className='text-2xl font-semibold'>Máquinas</h1>
        <div className='flex flex-row-reverse'>
            <button className='p-2 bg-ring/90 text-sm hover:bg-ring rounded-md flex justify-center items-center gap-2'
                onClick={() => {
                    setIsModalOpen(true)
                    setEditingMaquina(null)
                }}
            >
                <PlusCircledIcon />
                Agregar máquina
            </button>
        </div>
        <MaquinaTable maquinas={data} onEdit={handleEditMaquina}/>
        <Modal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title={editingMaquina ? 'Editar máquina' : 'Agregar máquina'}
        >
            <MaquinaCreateForm onMutationSuccess={handleCloseModal} initialData={editingMaquina} />
        </Modal>
    </Card>
  )
}

export default MaquinaContent