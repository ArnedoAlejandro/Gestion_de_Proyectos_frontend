import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useProyectos from '../hooks/useProyectos'

export default function ModalEliminarTarea() {

    const { handleEliminarTarea, modalEliminarTarea,eliminarTarea } = useProyectos()    

  return (
    <>
      <Transition appear show={modalEliminarTarea} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleEliminarTarea}>
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
                    
                    
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 ">
                        
                    <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 "
                        onClick={ handleEliminarTarea }
                    >
                        <span className="sr-only">Cerrar</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>

                    </button>
                </div>
                    
                    ¿Esta seguro que desea eliminar la tarea?
                </Dialog.Title>
                    
                    <p className="text-gray-600">Una ves eliminado ya no podra volver tener acceso a la informacion</p>
                    <div className="flex mt-5 mr-10  ">
                        <button
                            type="button"
                            className="w-full m-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={eliminarTarea}
                            >
                            Eliminar
                        </button>
                        <button
                            type="button"
                            className=" w-full  inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={ handleEliminarTarea }
                        > Cancelar</button>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
