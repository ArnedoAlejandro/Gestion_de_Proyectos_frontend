import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"

const FormularioColaborador = () => {

    const [ email, setEmail ] = useState("")

    const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

    const handleClick = (e) =>{
        e.preventDefault()
        if(email === ""){
            mostrarAlerta({
                msg: "El email es obligatorio",
                error : true
            })
            return
        }
        submitColaborador(email)
    }

    const { msg } = alerta

  return (
    <>
        <form className=" bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow-lg">
            <div>
                { msg && <Alerta alerta={alerta}/>}
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="email">Email colaborador</label>
                <input 
                    type="email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"    
                    placeholder="Email usuario"
                    id="email"
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value)}
                />
            </div>
            <input  
                type="submit" 
                value="Buscar colaborador" 
                onClick={handleClick}
                className="mt-5 bg-emerald-500 w-full p-3 text-white uppercase font-bold  rounded-lg cursor-pointer 
                hover:bg-emerald-600 transition-colors"
            />
        </form>
    </>
  )
}   

export default FormularioColaborador
