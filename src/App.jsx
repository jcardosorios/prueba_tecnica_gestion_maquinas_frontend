
import * as Tabs from "@radix-ui/react-tabs";
import MaquinaView from './views/MaquinaView'
import { ToastContainer } from 'react-toastify';
import TareasView from "./views/TareasView";
import ProduccionView from "./views/ProduccionView";

const tab_content = [
  {
    name: 'Máquinas',
    value: 'maquinas',
    content: <MaquinaView />
  },
  {
    name: 'Tareas',
    value: 'tareas',
    content: <TareasView />
  },
  {
    name: 'Producción',
    value: 'produccion',
    content: <ProduccionView/>
  },
]

function App() {

  return (
    <>
      <main className='min-h-screen bg-background p-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <header className='mb-8'>
            <h1 className='text-3xl font-bold text-foreground'>Gestión de ciclo de producción</h1>
          </header>
          {/* Tabs */}
          <Tabs.Root defaultValue="maquinas" className="w-full">
            <Tabs.List className="flex bg-secondary py-1 rounded-md">
              {tab_content.map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 py-1 mx-2  rounded-md text-muted-foreground cursor-pointer hover:bg-background/70 data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  {tab.name}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {/* Contenido */}
            {tab_content.map((tab) =>(
              <Tabs.Content key={tab.value} value={tab.value} className="py-4">
                {tab.content}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
        <ToastContainer />
      </main>
      
    </>
  )
}

export default App
