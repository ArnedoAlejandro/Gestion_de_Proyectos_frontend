import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

  const { auth } = useAuth();
 
  return (
    <aside className="my-15 md:w-1/3 lg:w-1/5 xl:w-1/6 px-10 py-10 ">
        <p className=" text-xl font-bold uppercase">Bienvenido "{auth.nombre}"</p>

        <Link
            to="crear-proyecto"
            className="bg-emerald-700 text-white uppercase font-bold w-full p-3 block 
              mt-5 text-center rounded-lg hover:bg-emerald-800 transition-colors"
        >
        Crear Proyecto</Link>

    </aside>
  )
}

export default Sidebar
