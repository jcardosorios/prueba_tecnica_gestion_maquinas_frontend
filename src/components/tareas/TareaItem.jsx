import { CheckCircledIcon} from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { capitalText, decimalHoursToTime, formatCustomDate } from '../../utils/utils'
import BadgeCustom from '../ui/BadgeCustom'


function TareaItem({tarea, onEdit}) {
  return (
    <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
      <td className='p-4 align-middle font-medium '>{tarea.id}</td>
      <td className='p-4 text-center'>{tarea.id_maquina}</td>
      <td className='p-4 text-center'>{tarea.id_produccion || '-'}</td>
      <td className='p-4 align-middle'>{formatCustomDate(tarea.fecha_hora_inicio)}</td>
      <td className='p-4 align-middle'>{formatCustomDate(tarea.fecha_hora_termino)}</td>
      <td className='p-4 align-middle'>{decimalHoursToTime(tarea.tiempo_empleado)}</td>
      <td className='p-4 align-middle'>{decimalHoursToTime(tarea.tiempo_produccion)}</td>
      <td className='p-4 align-middle'>
        <BadgeCustom  estado={tarea.estado}>
          <CheckCircledIcon width={10} height={10}/>
          {capitalText(tarea.estado)}
        </BadgeCustom>
      </td>
      <td className='p-4 align-middle text-center'>
        <button
          disabled={tarea.estado === 'COMPLETADA'}
          onClick={() => onEdit(tarea)}
          className='inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 cursor-pointer'
        >
          <CheckCircledIcon className='h-4 w-4 mx-auto text-green-600'/>
        </button>
      </td>
    </tr>
  )
}

export default TareaItem