import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({proyecto}) => {

    const {auth} = useAuth()

    const { nombre, _id, creador } = proyecto

  return (
    <div className="border-b flex flex-col md:flex-row p-5 justify-between">
        <div className="flex items-center gap-2">
          <p className="flex-1  text-xl ">
              {nombre} {" "}  
          </p>

          { auth._id !== creador && (
            <p className="p-1 ml-2 bg-green-400 text-sm rounded-lg uppercase text-white  font-bold border-l-black">Colaborador</p>
          )}
        </div>
        <Link 
            to={`${_id}`}
            className="text-gray-600 uppercase font-black hover:text-gray-900 "
        >Ver Proyecto</Link>
    </div>
  )
}

export default PreviewProyecto