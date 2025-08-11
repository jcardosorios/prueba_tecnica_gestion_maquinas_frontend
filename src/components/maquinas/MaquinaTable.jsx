
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import DropdownMenuCustom from '../ui/DropdownMenuCustom'
import { Pencil1Icon, TrashIcon} from '@radix-ui/react-icons'

const menuItems = [
  { 
    label: "Editar", 
    icon: <Pencil1Icon className="h-4 w-4" />,
    onSelect: () => console.log('Editando...') 
  },
  { 
    label: "Eliminar", 
    icon: <TrashIcon className="h-4 w-4" />,
    onSelect: () => console.log('Eliminando...'),
  },
]

function MaquinaTable({maquinas}) {
    

    return (
    <div className='relative w-full overflow-auto border border-border rounded-md'>
        <table className='w-full caption-bottom text-sm '>
            <thead className='[&_tr]:border-b'>
                <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >ID</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >Nombre máquina</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >Coeficiente</th>
                    <th scope="col" className="h-12 px-4 align-middle font-medium text-muted-foreground text-right w-[100px]">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody className='[&_tr:last-child]:border-0'>
                {maquinas.map((maquina) => (
                    <tr key={maquina.id} className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                        <td className='p-4 align-middle font-medium'>{maquina.id}</td>
                        <td className='p-4 align-middle'>{maquina.nombre}</td>
                        <td className='p-4 align-middle'>{maquina.coeficiente}</td>
                        <td className='p-4 align-middle text-right'>
                            <DropdownMenuCustom items={menuItems} 
                                trigger={
                                    <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0'>
                                        <DotsHorizontalIcon />
                                    </div>
                                }
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default MaquinaTable