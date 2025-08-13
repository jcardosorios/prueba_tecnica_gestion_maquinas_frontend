import { formatCustomDate } from "../../utils/utils"

function ProduccionItem({produccion}) {
    // console.log(produccion)
  return (
    <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
        <td className='p-4 align-middle font-medium '>{produccion.id}</td>
        <td className='p-4 align-middle'>{produccion.tiempo_produccion}</td>
        <td className='p-4 align-middle'>{produccion.tiempo_inactividad}</td>
        <td className='p-4 align-middle'>{formatCustomDate(produccion.fecha_hora_inicio_inactividad)}</td>
        <td className='p-4 align-middle'>{formatCustomDate(produccion.fecha_hora_termino_inactividad)}</td>

    </tr>
  )
}

export default ProduccionItem