import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {

  const [ nombre, setNombre ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ repetirPassword, setRepetirPassword ] = useState("")
  const [ alerta, setAlerta ] = useState({})

//Evento del formulario
  const handleSubmit = async (e) =>{
    e.preventDefault();

    if([nombre,email,password,repetirPassword].includes("")){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    if(password !== repetirPassword){
      setAlerta({
        msg: "Los password no son iguales",
        error: true
      })
      return
    }
    if( password.length < 5){
      setAlerta({
        msg: "Password minimo de cinco caracteres",
        error: true
      })
      return
    }
    setAlerta({})

    //Crear usuario en la API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {nombre, password, email})
      
      setAlerta({
        msg: data.msg,
        error: false
      })
      setNombre("")
      setEmail("")
      setPassword("")
      setRepetirPassword("")

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }

  const { msg } = alerta


  return (
    <>
      <h1 className="text-emerald-700 font-black text-6xl">
        Crea tu cuenta y administra tus {" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta}/> }
      
      <form 
        className="my-10 bg-white shadow-xl rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        
        <div className="my-10 ">

          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">
            Nombre
          </label>
          
          <input 
            id="nombre"
            type="text"
            placeholder="Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gay-50"
            value={nombre}
            onChange={ (e)=> setNombre(e.target.value)}
            
          />

        </div>

        <div className="my-10 ">

          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">
            Email
          </label>
          
          <input 
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gay-50"
            value={email}
            onChange={ (e)=> setEmail(e.target.value)}
          />

          

        </div>
        
        <div className="my-10 ">

          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">
            Password
          </label>
          
          <input 
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gay-50"
            value={password}
            onChange={ (e)=> setPassword(e.target.value)}
          />

          

        </div>

        <div className="my-10 ">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">
            Repetir Password
          </label>
          
          <input 
            id="password2"
            type="password"
            placeholder="Repetir tu Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gay-50"
            value={repetirPassword}
            onChange={ (e)=> setRepetirPassword(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value="Crear Cuenta" 
          className="bg-emerald-500 mb-5 w-full py-3 text-white uppercase font-bold rounded 
            hover:bg-emerald-600 cursor-pointer   transition-colors "
        />
      
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm  "
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesion
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm ml-5"
          to="/olvide-password"
        >
          Olvide mi Password
        </Link>
      </nav>
  </>
  )
}
  


export default Registrar