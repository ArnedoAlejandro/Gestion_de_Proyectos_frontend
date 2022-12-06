import FormularioProyecto from "../components/FormularioProyecto"


const NuevoProyecto = () => {
    return (
      <>
        <h1 className="text-3xl font-black text-center">Crear Proyecto nuevo</h1>
  
        <div className="mt-10 flex justify-center">
          <FormularioProyecto/>
        </div>
      </>
    )
  }
  
  export default NuevoProyecto
  