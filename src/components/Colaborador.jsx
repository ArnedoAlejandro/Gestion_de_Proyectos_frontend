import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {

  const { nombre, email } = colaborador
  const { handleModalEliminarColaborador } = useProyectos()

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="">
        <p className="mb-3 uppercase font-bold text-1xl mr-3">{nombre}</p>
        <p className="mb-2 text-gray-600  mr-3">{email}</p>
      </div>
      <div className="flex gap-2">
        <button 
          className="bg-red-600 rounded-lg font-bold uppercase p-2 border-black text-white hover:bg-red-700"
          onClick={()=> handleModalEliminarColaborador(colaborador)}
        >  
            Eliminar
        </button>
      </div>
    </div>
  )
}

export default Colaborador