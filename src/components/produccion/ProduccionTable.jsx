import ProduccionItem from "./ProduccionItem"

function ProduccionTable({producciones}) {
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
                    >T. Producción</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >T. Inactividad</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >Fecha Inicio Inactividad</th>
                    <th
                        scope="col"
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >Fecha Término Inactividad</th>
                </tr>
            </thead>
            <tbody className='[&_tr:last-child]:border-0'>
                {producciones.map((produccion) => 
                    <ProduccionItem produccion={produccion} key={produccion.id}/>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default ProduccionTable