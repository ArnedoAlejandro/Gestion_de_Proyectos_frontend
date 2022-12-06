import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const { handleBuscador, cerrarSesionProyecto } = useProyectos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () =>{
        cerrarSesionAuth()
        cerrarSesionProyecto()
        localStorage.removeItem("token")
    }

  return (
    <header className="p-4 py-5 bg-emerald-700 border-b">
        <div className="md:flex md: justify-between ">
            <h2 className="text-4xl text-white uppercase font-black shadow-black text-center mb-5 md:mb-0">
                Gestion de Proyectos
            </h2>

            <button>

            </button>
            <div className="flex flex-col md:flex-row items-center gap-4 ml-4">
                <button
                    type="button"
                    className="text-gray-300 font-bold uppercase hover:text-white   "
                    onClick={handleBuscador}
                >
                    Buscar Proyecto
                </button>
                <Link 
                    to="/proyectos" 
                    className="text-gray-300 font-bold uppercase hover:text-white"
                >Proyectos</Link>

                <button 
                    type="button" 
                    className="text-gray-200 bg-yellow-600 p-2 font-bold rounded-md shadow-lg uppercase hover:bg-yellow-700 hover:text-white"
                    onClick={handleCerrarSesion}
                >Cerrar Sesion</button>

                <Busqueda />
            </div>
        </div>
    </header>
  )
}

export default Header