
import { toast } from 'react-toastify';
import MaquinaItem from './MaquinaItem'


function MaquinaTable({maquinas, onEdit}) {

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
                {maquinas.map((maquina) => 
                    <MaquinaItem maquina={maquina} key={maquina.id} onEdit={onEdit}/>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default MaquinaTable