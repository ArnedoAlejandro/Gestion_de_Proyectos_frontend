import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"



const Login = () => {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ alerta, setAlerta ] = useState({})

  // {setAuth} VALIDACION DE AUTENTICACION
  const { setAuth } = useAuth();
 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
  

    if ( [email, password].includes("")){
      setAlerta({
        msg:"Ambos campos son obligatorios",
        error: true
      });
      return 
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/login`, { email, password})
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth( data )
      navigate("/proyectos")

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
      <h1 className="text-emerald-600  font-black text-6xl">
        Iniciar sesion y administra tus {" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      { msg && <Alerta alerta={alerta} /> }


      <form 
        className="my-10 shadow-xl rounded-lg p-10 bg-white"
        onSubmit={ handleSubmit }  
      >
        
        <div className="my-10 ">

          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">
            Email
          </label>
          
          <input 
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3  border rounded-xl bg-gay-50"
            onChange={ (e)=>setEmail(e.target.value)}
            
          />

        </div>
        <div className="my-10 ">

          <label className="uppercase text-gray-600  block text-xl font-bold" htmlFor="password">
            Password
          </label>
          
          <input 
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gay-50"
            onChange={ (e) => setPassword(e.target.value) }
          />

        </div>

        <input 
          type="submit" 
          value="Iniciar Sesion" 
          className="bg-emerald-500 mb-5 w-full py-3 text-white uppercase font-bold rounded 
            hover:bg-emerald-600 cursor-pointer   transition-colors "
        />
      
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-slate-800"
          to="/registrar"
        >
          No tienes una cuenta? Registrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-slate-800"
          to="/olvide-password"
        >
          Olvide mi Password
        </Link>
      </nav>
        
    </>
  )
}

export default Login
