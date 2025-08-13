import { useQuery } from "@tanstack/react-query"
import { getProducciones } from "../api/produccionService"
import Card from "../components/ui/Card"
import ProduccionTable from "../components/produccion/ProduccionTable"

function ProduccionView() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['producciones'],
        queryFn : getProducciones
    })

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (isError) {
        return <p>Ocurrió un error: {error.message}</p>
    }

    return (
        <Card>
            <h1 className='text-2xl font-semibold'>Producción</h1>
            <ProduccionTable producciones={data}/>
        </Card>
    )
}

export default ProduccionView