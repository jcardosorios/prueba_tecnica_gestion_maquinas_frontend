
import Card from '../ui/Card'
import {PlusCircledIcon} from '@radix-ui/react-icons'
import MaquinaTable from './MaquinaTable'

function MaquinaContent() {
  return (
    <Card>
        <h1 className='text-2xl font-semibold'>Máquinas</h1>
        <div className='flex flex-row-reverse'>
            <button className='p-2 bg-ring/90 hover:bg-ring rounded-md flex justify-center items-center gap-2'>
                <PlusCircledIcon />
                Agregar máquina
            </button>
        </div>
        <MaquinaTable />
    </Card>
  )
}

export default MaquinaContent