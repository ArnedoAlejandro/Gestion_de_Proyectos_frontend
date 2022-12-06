import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'


const PRIORIDAD = ["Alta", "Media", "Baja"] 


export default function ModalFormularioTarea() {

    const { handleModalTarea, modaFormularioTarea, mostrarAlerta, alerta, submitTarea, tarea } = useProyectos()
    const [ nombre, setNombre ] = useState("")
    const [ descripcion, setDescripcion ] = useState("")
    const [ prioridad, setPrioridad ] = useState("")
    const [ fechaEntrega, setFechaEntrega ] = useState("")
    const [ id, setId ] = useState("")

    const params = useParams()

    useEffect(()=>{
        if(tarea._id){
            setNombre(tarea.nombre)
            setId(tarea._id)
            setDescripcion(tarea.descripcion)
            setPrioridad(tarea.prioridad)
            setFechaEntrega(tarea.fechaEntrega.split("T")[0])
            return
        }
        setNombre("")
        setId("")
        setDescripcion("")
        setPrioridad("")
        setFechaEntrega("")
       
    }, [tarea] )

    const handleSubmit = async e =>{
        e.preventDefault();
        
        if([ nombre, descripcion, prioridad, fechaEntrega ].includes("")){
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return            
        }
        
        await submitTarea({ id,nombre, descripcion, prioridad, fechaEntrega, proyecto: params.id})
        setId("")
        setNombre("")
        setDescripcion("")
        setFechaEntrega("")
        setPrioridad("")
        
        mostrarAlerta({
            msg : "Tarea modificada correctamente",
            error: false
        })    
       
        

    }

    const { msg } = alerta

  return (
    <>
        
        <Transition appear show={ modaFormularioTarea } as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={ handleModalTarea }>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                
            </Transition.Child>
            

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >

                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button
                                type="button"
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 "
                                onClick={ handleModalTarea }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    <Dialog.Title
                        as="h1"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                       {id ? <p className="text-4xl text-center">Editar Tarea</p>: 
                        <p className="text-4xl">Crear Tarea</p>}                  
                    </Dialog.Title>
                    
                    { msg && <Alerta alerta={alerta}/> }

                    <form 
                        className="my-7 items-center"
                        onSubmit={handleSubmit}
                        
                    >
                    
                        <div className="mb-5 item-center">
                            <label 
                                className="text-gray-700 uppercase font-bold"
                                htmlFor="nombre"
                            >
                                Nombre Tarea
                            </label>
                            <input 
                                className=" border-2 w-full mt-2 p-2 rounded-lg"
                                type="text"
                                id= "nombre"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e)=>setNombre(e.target.value)}
                            />
                        </div>
                        <div className="mb-5 item-center">
                            <label 
                                className="text-gray-700 uppercase font-bold"
                                htmlFor="fecha-entrega"
                            >
                                Fecha Entrega
                            </label>
                            <input 
                                className=" border-2 w-full mt-2 p-2 rounded-lg"
                                type="date"
                                id= "fecha-entrega"
                                value={fechaEntrega}
                                onChange={(e)=>setFechaEntrega(e.target.value)}
                            />
                        </div>
                        <div className="mb-15 item-center ">
                            <label 
                                className="text-gray-700 uppercase font-bold"
                                htmlFor="prioridad"
                            >
                                Prioridad
                            </label>
                            <select 
                                className=" border-2 p-2 mt-2 w-full rounded-lg "
                                id= "prioridad"
                                value={prioridad}
                                onChange={(e)=>setPrioridad(e.target.value)}
                            >   
                                <option value="alta">--Seleccione Prioridad de su tarea--</option>
                                    {PRIORIDAD.map( opcion =>(
                                        <option key={opcion}>{opcion}</option>
                                    ))}
                            </select>
                           
                        </div>
                        <div className="mb-5 item-center mt-5">
                            <label 
                                className="text-gray-700 uppercase font-bold"
                                htmlFor="descripcion"
                            >
                                Descripcion 
                            </label>
                            <textarea 
                                className=" border-2 p-2 mt-2 w-full rounded-lg "
                                id= "descripcion"
                                placeholder="Descripcion de la Tarea"
                                value={descripcion}
                                onChange={(e)=>setDescripcion(e.target.value)}
                            />
                        </div>

                        <input 
                            type="submit"
                            value={ id ? "Guardar Cambios" : "Crear Tarea "}
                            className="bg-emerald-500 uppercase text-sm font-bold w-full text-white p-3 rounded-lg hover:bg-emerald-600 transition"
                        />
                    
                    </form>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    </>
  )
}
