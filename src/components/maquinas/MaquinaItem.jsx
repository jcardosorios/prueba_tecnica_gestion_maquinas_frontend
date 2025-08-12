import { Pencil1Icon, TrashIcon, DotsHorizontalIcon} from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DropdownMenuCustom from '../ui/DropdownMenuCustom'
import { deleteMaquina } from '../../api/maquinasService'
import { toast } from 'react-toastify';

function MaquinaItem({maquina, onEdit}) {

  // Items de menu desplegable
  const menuItems = [
    { 
        label: "Editar", 
        icon: <Pencil1Icon className="h-4 w-4" />,
        onSelect: () => onEdit(maquina) 
    },
    { 
        label: "Eliminar", 
        icon: <TrashIcon className="h-4 w-4" />,
        onSelect: () => {
          if (window.confirm(`¿Estás seguro de que quieres eliminar la máquina "${maquina.nombre}"?`)) {
            deleteMutation(maquina.id)
        }
        },
        className: 'text-destructive'
    },
  ];

  // Query para eliminación de máquinas
  const queryClient = useQueryClient()
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteMaquina,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['maquinas'] })
        toast.success('Máquina eliminada exitosamente')
      },
      onError: (error) => {
        toast.error("Error al eliminar la máquina:", error)
      }
  });

  return (
    <tr key={maquina.id} className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
      <td className='p-4 align-middle font-medium '>{maquina.id}</td>
      <td className='p-4 align-middle'>{maquina.nombre}</td>
      <td className='p-4 align-middle'>{maquina.coeficiente}</td>
      <td className='p-4 align-middle text-right'>
        <DropdownMenuCustom items={menuItems} 
          trigger={
            <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 cursor-pointer'>
              <DotsHorizontalIcon />
            </div>
          }
          />
      </td>
    </tr>
  )
}

export default MaquinaItem