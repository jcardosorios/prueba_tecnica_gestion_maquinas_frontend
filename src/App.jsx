
import * as Tabs from "@radix-ui/react-tabs";

const tab_content = [
  {
    name: 'Máquinas',
    value: 'maquinas'
  },
  {
    name: 'Tareas',
    value: 'tareas'
  },
  {
    name: 'Producción',
    value: 'produccion'
  },
]

function App() {

  return (
    <>
      <main className='min-h-screen bg-background p-8'>
        <div className='max-w-7xl mx-auto'>
          <header className='mb-8'>
            <h1 className='text-3xl font-bold text-foreground'>Gestión de ciclo de producción</h1>
          </header>
        
          <Tabs.Root defaultValue="maquinas" className="w-full">
            <Tabs.List className="flex bg-secondary py-1 rounded-md">
              {
                tab_content.map((tab) => (
                  <Tabs.Trigger
                    key={tab.value}
                    value={tab.value}
                    className="flex-1 py-1 mx-2  rounded-md text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                      {tab.name}
                    </Tabs.Trigger>
                ))
              }
            </Tabs.List>
            <Tabs.Content value="maquinas" className="p-4">
              Contenido del Tab 1
            </Tabs.Content>
            <Tabs.Content value="tareas" className="p-4">
              Contenido del Tab 2
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </main>
      
    </>
  )
}

export default App
