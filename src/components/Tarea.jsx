import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({tarea}) => {

  const admin = useAdmin()

  const { handleModalEditarTarea, handleEliminarTarea,completarTarea } = useProyectos()

  const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea

  return (
    <div className="border-b p-5 flex justify-between items-center ">
      <div className="flex flex-col items-start">
        <p className="mb-3 text-gray-800 uppercase font-bold text-1xl mr-3">{nombre}</p>
        <p className="mb-2 text-gray-600  uppercase text-sm  mr-3">{descripcion}</p>
        <p className="mb-2 text-gray-600 font-bold  uppercase mr-3">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-2 text-gray-600 font-bold text-sm mr-3">{prioridad}</p>
        { estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}</div>
      <div className="flex flex-col lg:flex-row gap-2"> 
        
        {admin && (
          <button 
            className="bg-yellow-600 rounded-lg font-bold uppercase p-2 border-black text-white hover:bg-yellow-700"
            onClick={()=>handleModalEditarTarea(tarea)}
          >  
              Editar
          </button>
        )}
        
        <button 
          className={ `${estado ? "bg-emerald-500 hover:bg-emerald-600"  : "bg-gray-600"} rounded-lg font-bold uppercase p-2 border-black text-white hover:bg-gray-700`}
          onClick={ ()=> completarTarea(_id)}
        >
          { estado ? "Completa" : "incompleta"}
        </button> 
        
        {admin && (
          <button 
            className="bg-red-600 rounded-lg font-bold uppercase p-2 border-black text-white hover:bg-red-700"
            onClick={ ()=> handleEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
        
      </div>
    </div>
  )
}

export default Tarea
