import { DotsHorizontalIcon } from '@radix-ui/react-icons'

function MaquinaTable() {
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
                <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                    <td className='p-4 align-middle font-medium'>1</td>
                    <td className='p-4 align-middle'>Máquina 1</td>
                    <td className='p-4 align-middle'>1.2</td>
                    <td className='p-4 align-middle text-right'>
                        <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0'>
                            <DotsHorizontalIcon />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MaquinaTable