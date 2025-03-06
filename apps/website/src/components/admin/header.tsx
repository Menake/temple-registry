export default function Header({children}: {children: React.ReactNode}) {
    return (
        <header className="border-b border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            {children}
          </div>
        </header>
    )
}