import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { twMerge } from 'tailwind-merge';

function DropdownMenuCustom({trigger, items}) {
  const baseItemClasses = "group text-sm leading-none rounded-md flex items-center h-8 px-2 relative pl-7 select-none data-[disabled]:text-gray-400 data-[highlighted]:bg-blue-500 data-[highlighted]:text-white outline-none cursor-pointer";
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[120px] bg-card rounded-md p-2 shadow-xl border border-border z-50 animate-fadeIn" sideOffset={5}>
          {items.map((item, index) => {
            const itemClasses = twMerge(baseItemClasses, item.className);
            return (
              <DropdownMenu.Item
                key={index}
                className={itemClasses}
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