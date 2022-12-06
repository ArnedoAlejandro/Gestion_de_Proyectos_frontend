import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import io from "socket.io-client"

let socket;
const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

  const [ proyectos, setProyectos ] = useState([])
  const [ alerta, setAlerta ] = useState({})
  const [ proyecto, setProyecto ] = useState({})
  const [ cargando, setCargando ] = useState(false)
  const [ modaFormularioTarea, setModalFormularioTarea ] = useState(false)
  const [ modalEliminarTarea, setModalEliminarTarea ] = useState(false)
  const [ tarea, setTarea ] = useState({})
  const [ colaborador, setColaborador ] = useState({})
  const [ modalEliminarColaborador, setModalEliminarColaborador ] = useState(false)
  const [ buscador, setBuscador ] = useState(false)
  
 

  //REDIRECCIONA RUTAS BIBLIOTECA DE REACT_ROUTER
  const navigate = useNavigate()
  const { auth } = useAuth()

  //CONSULTA A LA BASE DE DATOS DE LOS PROYECTOS EXISTENTES
  useEffect(  ()=>{
    const obtenerProyectos = async () =>{
      try {
        const token= localStorage.getItem("token")
        if(!token) return

        const config = {
          headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`  
          }
        }
        const  { data } = await clienteAxios("/proyectos", config)
        setProyectos(data)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerProyectos()
  },[auth])

//CONEXION A SOCKET IO
  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
  },[])

//ALERTA DE ERROR
  const mostrarAlerta = alerta =>{
    setAlerta(alerta);
    setTimeout(()=>{
      setAlerta(false)
    },2000)
  }

//CREACION DE PROYECTOS
  const submitProyecto = async proyecto =>{
    
    if(proyecto.id){
      await editarProyecto(proyecto)
    }else{
      await nuevoProyecto(proyecto)  
    }
  }

//EDITAR PROYECTO
  const editarProyecto = async proyecto =>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
    //SINCRONIZAR EL ESTADO 
      const proyectosActualizados = proyectos.map( proyectoState =>
        proyectoState._id === data._id ? data : proyectoState)
        setProyectos(proyectosActualizados)

        setAlerta({
          msg: "Proyecto editado correctamente",
          error: false
        })        
        setTimeout(()=>{
          setAlerta({})
          navigate("/proyectos")
        },2000)

        
    } catch (error) {
      console.log(error)
    }
  }
//NUEVO PROYECTO
  const nuevoProyecto = async proyecto =>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios.post("/proyectos", proyecto, config)

      setProyectos([...proyectos, data])
      
      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false
      })
      setTimeout(()=>{
        setAlerta({})
        navigate("/proyectos")
      },2000)

    } catch (error) {
      console.log(error)
    }
  }

//OBTENCION DE PROYECTOS YA EXISTENTES 
  const obtenerProyecto = async id =>{
    setCargando(true)
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      setProyecto(data)
     
    } catch (error) {
      navigate("/proyectos")
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(()=>{
        setAlerta({})
      },2000)
    }finally{
      setCargando(false)
    }
  }

//ELIMINAR PROYECTO
  const eliminarProyecto = async id =>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
    //SINCRONIZAR EL STATE
      const proyectosActualizados = proyectos.filter( proyectoState => 
        proyectoState._id !== id )
      setProyectos(proyectosActualizados)
        
      setAlerta({
        msg: "Proyecto eliminado correctamente",
        error: false
      })
      setTimeout(() =>{
        setAlerta({})
        navigate("/proyectos")
      },2000)
    }catch (error){
      console.log(error)
    }
  }

//ESTADO DE MODAL TAREA
  const handleModalTarea = () => {
    setModalFormularioTarea(!modaFormularioTarea)
  }

  const submitTarea = async tarea =>{
    if(tarea?.id){
      editarTarea(tarea)
    }else{
      await crearTarea(tarea)
    }
  }
  
//CREAR TAREA NUEVA
  const crearTarea = async tarea => {
    try {
    const token = localStorage.getItem("token")
    if(!token) return
    
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`  
      }
    }
    const { data } = await clienteAxios.post("/tareas", tarea, config)
    
    //SOKET IO
    socket.emit("nueva tarea", data)
    //setModalFormularioTarea(false)

    setAlerta({
      msg : "Tarea agregada correctamente",
      error :false
    })

    setTimeout(()=>{
      setModalFormularioTarea(false)
    },2000)

    
      
    } catch (error) {
      console.log(error)
    }
  }
//EDITAR TAREA YA EXISTENTE
  const editarTarea = async tarea =>{
    try {
      const token = localStorage.getItem("token")
    if(!token) return
    
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`  
      }
    }
    const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
    
    //Soket IO
    socket.emit("editar tarea", data)

    setAlerta({})
    setModalFormularioTarea(false)    
    
    } catch (error) {
      console.log(error)
    }
  }
    
//EDITAR TAREA DESDE EL MODAL
  const handleModalEditarTarea = tarea =>{
    setTarea(tarea)
    setModalFormularioTarea(true)
  }
//ELIMINAR TAREA
  const handleEliminarTarea = (tarea) =>{
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  } 
//ELIMINAR TAREA
  const eliminarTarea = async () =>{
    try {
      const token = localStorage.getItem("token")
    if(!token) return
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`  
      }
    }
    const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

    setAlerta({
      msg : "La tarea se elimino correctamente",
      error: false
    })
  
    setModalEliminarTarea(false) 

    //SOKET.emit emite un evento a la base de datos
    socket.emit("eliminar tarea" , tarea)

    setTarea({})   
    setTimeout(()=>{
      setAlerta({})
    },2000)


    } catch (error) {
      console.log(error)
    }
}

//AGREGAR COLABORADOR
  const submitColaborador = async email =>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return
      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios.post("/proyectos/colaboradores" , { email }, config)
      setColaborador(data)
      console.log(colaborador)
      setAlerta({})
    
    } catch (error) {
      setAlerta({
        msg : error.response.data.msg,
        error : true
      })
    }
   
  }

  const agregarColaborador = async email=>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return
        const config = {
          headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`  
          }
        }
        const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}` , email, config)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setColaborador({})
        setTimeout(()=>{
          setAlerta({})
          //TODO: Fijarse de redireccionar a colaboradores
          // navigate("/proyectos/colaboradores")
        },2000)
        
      } catch (error) {
        setAlerta({
          msg : error.response.data.msg,
          error: true
        }) 
        setTimeout(()=>{
          setAlerta({})    
        },2000)
    }
  }

  const handleModalEliminarColaborador = ( colaborador ) =>{
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador( colaborador )
  }

  const eliminarColaborador = async () =>{
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }
      const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)

      const proyectoActualizado = {...proyecto}

      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(
        colaboradorState => colaboradorState._id !== colaborador._id )
      socket.emit("eliminar colaborador ")

      setProyecto(proyectoActualizado)
      setAlerta({
          msg: data.msg,
          error: false
      })
      setColaborador({})
      setModalEliminarColaborador(false)

      setTimeout(() => {
          setAlerta({})
      }, 3000);

  } catch (error) {
      console.log(error.response)
  }
 
  }

  const completarTarea = async id =>{
    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }
      const { data } = await clienteAxios.post(`/tareas/estado/${id}`,{},  config)

      setTarea({})
      setAlerta({})
      socket.emit('cambiar estado', data)

    } catch (error) {
      console.log(error.response)
    }
  }

  const handleBuscador = () => {
    setBuscador(!buscador)
}

//SOKET IO 
  const submitTareasProyectos = ( tarea ) =>{
    //AGREGAR TAREA AL STATE
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = [ ...proyectoActualizado.tareas, tarea]
    
    setProyecto(proyectoActualizado) 
  }

  //ELIMINAR TAREA SOCKET IO
    const EliminarTareaProyecto = ( tarea ) => {
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState =>
      tareaState._id !== tarea._id ) 
    
      setProyecto(proyectoActualizado)
    }

    //EDITAR TAREA SOKET IO
    const editarTareaProyecto = tarea =>{
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => (
      tareaState._id === tarea._id ? tarea : tareaState ))
    
      setProyecto(proyectoActualizado)
    }

    //CAMBIAR ESTADO SOKET IO
    const cambiarEstadoTarea = tarea => {
      const proyectoActualizado = {...proyecto}
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
      setProyecto(proyectoActualizado)
  }

  //ELIMINAR COLABORADOR 
  // const eliminarColaboradorTiempoReal = colaborador =>{
  //    const proyectoActualizado = {...proyecto}

  //     proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(
  //       colaboradorState => colaboradorState._id !== colaborador._id )
  // }

  const cerrarSesionProyecto = () =>{
    setProyectos([])
    setProyecto({})
    setAlerta({})
  }
  return (
    <ProyectosContext.Provider value={{
      proyectos,
      alerta,
      mostrarAlerta,
      submitProyecto,
      obtenerProyecto, 
      proyecto, 
      cargando,
      eliminarProyecto,
      modaFormularioTarea,
      handleModalTarea,
      submitTarea,
      handleModalEditarTarea,
      tarea,
      handleEliminarTarea,
      modalEliminarTarea,
      eliminarTarea,
      submitColaborador,
      colaborador,
      agregarColaborador,
      handleModalEliminarColaborador,
      modalEliminarColaborador,
      eliminarColaborador,
      completarTarea,
      handleBuscador,
      buscador,
      submitTareasProyectos,
      EliminarTareaProyecto,
      editarTareaProyecto,
      cambiarEstadoTarea,
      cerrarSesionProyecto,
      // eliminarColaboradorTiempoReal
    }}>
        {children}
    </ProyectosContext.Provider>
  )
}

export {
  ProyectosProvider
}

export default ProyectosContext
