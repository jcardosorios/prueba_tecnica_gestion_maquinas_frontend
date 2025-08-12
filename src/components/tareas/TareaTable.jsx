import React from 'react'
import TareaItem from './TareaItem'

function TareaTable({tareas, onEdit}) {
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
                    >ID Máquina</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >ID Producción</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >Inicio</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >Término</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >T. Empleado</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >T. Producción</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >Estado</th>
                    <th scope="col" className="h-12 px-4 align-middle font-medium text-muted-foreground text-right w-[100px]">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody className='[&_tr:last-child]:border-0'>
                {tareas.map((tarea) => 
                    <TareaItem tarea={tarea} key={tarea.id} onEdit={onEdit}/>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default TareaTable