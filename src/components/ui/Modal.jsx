import * as Dialog from '@radix-ui/react-dialog'

function Modal({children, trigger, open, onOpenChange, title=''}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
            {trigger}
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/50 fixed inset-0 z-50 animate-fadeIn'/>
            <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-[80vw] max-w-[400px] rounded-lg bg-background p-6 shadow-2xl focus:outline-none z-50 animate-slideIn'>
                <Dialog.Title className='text-xl font-semibold'>{title}</Dialog.Title>
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal