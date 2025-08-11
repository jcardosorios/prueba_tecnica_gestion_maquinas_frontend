
import { useState } from 'react';
import {PlusCircledIcon} from '@radix-ui/react-icons'
import { useQuery } from "@tanstack/react-query"
import { getMaquinas } from '../../api/maquinasService'
import Card from '../ui/Card'
import MaquinaTable from './MaquinaTable'
import Modal from '../ui/Modal';
import MaquinaCreateForm from './MaquinaCreateForm';

function MaquinaContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['maquinas'],
        queryFn : getMaquinas
    })

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
            <Modal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                trigger={
                    <div className='p-2 bg-ring/90 text-sm hover:bg-ring rounded-md flex justify-center items-center gap-2'>
                        <PlusCircledIcon />
                        Agregar máquina
                    </div>
                }
                title='Agregar máquina'
            >
                <MaquinaCreateForm onMutationSuccess={handleCloseModal}/>
            </Modal>
        </div>
        <MaquinaTable maquinas={data} />
    </Card>
  )
}

export default MaquinaContent