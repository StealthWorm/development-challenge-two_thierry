import { Link } from "react-router-dom";
import Particle from "../components/Particle";
import logo from '../assets/logo.svg'

export default function HomeScreen() {
  return (
    <>
      <Particle />
      <div className="flex animate-color-wave justify-center items-center h-screen w-full space-x-4 bg-gradient-to-tr from-transparent via-[#2c2246] to-tr">
        <Link className="flex text-6xl text-slate-100 z-0 relative" to='/patients'>
          <img src={logo} className="w-[10rem] animate-pulse" />
          <img src={logo} className="w-[10rem] animate-breath absolute opacity-90 blur-xl " />
        </Link>
      </div>
    </>
  )
}