import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Tarea from "../components/Tarea"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import io from "socket.io-client"

let socket;

const Proyecto = () => {

    const params = useParams();
    const { obtenerProyecto, proyecto, 
            handleModalTarea, alerta, 
            submitTareasProyectos,EliminarTareaProyecto,
            editarTareaProyecto, cambiarEstadoTarea, colaborador} = useProyectos()
    
    const admin = useAdmin()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(()=>{
        //LE DAMOS EL VALOR A SOKET Y NUESTRA URL CON LA CUAL VAMOS A INTERACTUAR
        socket = io(import.meta.env.VITE_BACKEND_URL)
        //.emit pasa un nombre de referencia para el backend y le pasa un parametro de referencia
        socket.emit("abrir proyecto", params.id)
    },[])

    //RENDERIZADO DE SOKET IO
    useEffect(()=>{
        //Agregar tarea
       socket.on("tarea agregada", tareaNueva =>{
        if(tareaNueva.proyecto === proyecto._id){            
            submitTareasProyectos(tareaNueva)
        }
       })
       //Eliminar tarea
       socket.on("tarea eliminada", tareaEliminada =>{
        if(tareaEliminada.proyecto === proyecto._id ){
            EliminarTareaProyecto(tareaEliminada)
        }
       })
       //Editar tarea
       socket.on("tarea editada", tareaEditada =>{
        if(tareaEditada.proyecto._id === proyecto._id){
            editarTareaProyecto(tareaEditada)
        }
        })
         //Cambiar estado tarea completado o incompleta
       socket.on("nuevo estado", nuevoEstadoTarea =>{
        if(nuevoEstadoTarea.proyecto._id === proyecto._id){
            cambiarEstadoTarea(nuevoEstadoTarea)
        }
       })
    
    })
  
    const { nombre } = proyecto
    const { msg } = alerta

return (
        
        < >
            <div className="flex justify-between  " >
                <h1 className="text-4xl font-bold "> Proyecto: {nombre}</h1>
                
                {admin && (
                    <div 
                        className="flex items-center gap-2 text-gray-400 hover:text-black ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                            
                        <Link 
                            className="font-bold uppercase"
                            to={`/proyectos/editar/${params.id}`}>Editar Proyecto
                        </Link>
                    </div>
                )}
            
            </div>
            {admin && (
                <button
                    onClick= { handleModalTarea }
                    className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-emerald-500 text-white shadow-lg text-center mt-5 flex gap-2 items-center hover:bg-emerald-600"
                
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                Agregar Tarea</button>
            )}
            <h2 className="font-bold text-2xl uppercase mt-10">Tareas del Proyecto</h2>

            <div className="bg-white shadow-lg mt-8 p-2 rounded-lg">
                {proyecto.tareas?.length ?  proyecto.tareas?.map(tarea => (
                    <Tarea 
                        key={tarea._id} 
                        tarea = {tarea}
                    />
                ))
                : <p className="uppercase text-center m-y5 font-bold p-10">No hay tareas en este proyecto </p>}
            </div>

            {admin && (
            <>
                <div className="flex items-center justify-between mt-10">
                    <p className="font-bold text-xl uppercase">Colaboradores</p>
                    <Link 
                        to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                        className="flex text-gray-400 uppercase font-bold hover:text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    Añadir</Link>
                </div>

                {/* {msg && <Alerta alerta = {alerta} />} */}
                
                <div className="bg-white shadow-lg mt-8 p-2 rounded-lg">   

                    {proyecto.colaboradores?.length ? proyecto.colaboradores?.map(colaborador => (
                        <Colaborador 
                            key={colaborador._id} 
                            colaborador = {colaborador}
                        />
                    ))
                    : <p className="uppercase text-center m-y5 font-bold p-10">No hay colaboradores en este proyecto </p>}
                </div>
                </>
            )}

            <ModalFormularioTarea />
            <ModalEliminarColaborador/>
            <ModalEliminarTarea />

        </>
        )
    
}

export default Proyecto
