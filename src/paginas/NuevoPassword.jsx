import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

  const params = useParams()
  const {token} = params  
  const [ tokenValido, setTokenValido ] = useState(false)
  const [ alerta, setAlerta ] = useState({})
  const [ password, SetPassword ] = useState("")
  const [ passwordModificado, setPasswordModificado ] = useState(false)

  useEffect(()=>{
    const comprobarToken = async ()=>{
      console.log("Render")
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
       
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  },[] )

  const { msg } = alerta

  const handleSubmit = async (e) =>{
   
    e.preventDefault()
    if(password.length < 6){
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true
      })
      return
      
    }
    try {
      const url = `/usuarios/olvide-password/${token}`
      
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
   
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Reestablece tu password e ingresa a tus  {" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      
      { msg && <Alerta alerta={alerta}/>}

      { tokenValido && (

        <form 
          className="my-10 bg-white shadow-xl rounded-lg p-10"
          onSubmit={handleSubmit}  
        >
        
        <div className="my-10 ">

          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">
            Nuevo Password
          </label>
          
          <input 
            id="password"
            type="password"
            placeholder="Nuevo Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gay-50"
            onChange={ e => SetPassword(e.target.value)}
            
          />

        </div>

        <input 
          type="submit" 
          value="Guardar Nuevo Password" 
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded 
            hover:bg-sky-900 cursor-pointer   transition-colors "
        />
      
      </form>
      )}
      
      {passwordModificado &&( 
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm  "
            to="/"
            >
            Inicia Sesion
          </Link>
        )}
        
    </>
  )
}

export default NuevoPassword