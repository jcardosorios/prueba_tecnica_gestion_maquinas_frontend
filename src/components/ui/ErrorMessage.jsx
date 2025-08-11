export default function ErrorMessage({children}) {
  return (
    <div className="text-left text-destructive font-semibold p-1 text-xs">
        *{children}
    </div>
  )
}
