import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

function DropdownMenuCustom({trigger, items}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[120px] bg-card rounded-md p-2 shadow-xl border border-border z-50 animate-fadeIn" sideOffset={5}>
          {items.map((item, index) => {
            if (item.separator) {
              return <DropdownMenu.Separator key={index} className="h-px bg-gray-200 my-2" />;
            }
            return (
              <DropdownMenu.Item
                key={index}
                className="group text-sm leading-none rounded-md flex items-center h-8 px-2 relative pl-7 select-none data-[disabled]:text-gray-400 data-[highlighted]:bg-blue-500 data-[highlighted]:text-white outline-none cursor-pointer"
                onSelect={item.onSelect}
                disabled={item.disabled}
              >
                {item.icon && <div className="absolute left-2">{item.icon}</div>}
                {item.label}
              </DropdownMenu.Item>
            );
          })}
          
          <DropdownMenu.Arrow className="fill-card" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMenuCustom