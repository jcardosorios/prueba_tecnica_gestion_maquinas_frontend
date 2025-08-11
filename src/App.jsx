
import * as Tabs from "@radix-ui/react-tabs";
import MaquinaContent from './components/maquinas/MaquinaContent.jsx'

const tab_content = [
  {
    name: 'Máquinas',
    value: 'maquinas',
    content: <MaquinaContent />
  },
  {
    name: 'Tareas',
    value: 'tareas',
    content: <div>Contenido del Tab 2</div>
  },
  {
    name: 'Producción',
    value: 'produccion',
    content: <div>Contenido del Tab 3</div>
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
                  className="flex-1 py-1 mx-2  rounded-md text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
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
      </main>
      
    </>
  )
}

export default App
