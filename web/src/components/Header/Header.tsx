import Clock from './Clock'

export function Header() {
  return (
    <header className="flex flex-row w-full items-center bg-[#002137] justify-center px-8">
      <h1 className="flex text-white font-black  my-4 text-4xl justify-between w-full items-center">
        Gerenciamento de Pacientes
      </h1>
      <Clock />
    </header>
  )
}