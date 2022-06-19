import React, { useEffect, useState} from 'react'
import { obtenerTodos, guardar } from '../../services/EstadoService';

export default function Estado() {

  const [estados, setEstados] = useState([]);   

  const [estado, setEstado] = useState({
    nombre: '',
    estado: false
  });   
  const [error, setError] = useState(false);




  useEffect(() =>{
    const getEstados = () => {
      obtenerTodos().
      then(r => {
         console.log(r)
         setEstados(r.data)
      }).catch(e => {
        console.log(e)
      })
    }
    getEstados();
  },[]); 


  const changeEstado =  e => {
    e.preventDefault();
    setEstado({
      ...estado,
      [e.target.name]: e.target.value
    })
  }
  

  const add = e => {
    e.preventDefault();
    console.log(estado)
    guardarEstado();
  }; 

  const guardarEstado = () => { 
    guardar(estado)
    .then( r =>{
      setEstados([...estados, r.data])
      changeError(false);  
    }).catch(e =>{
      console.log(e);
      changeError(true);  
    }) 
  };

  
  const changeError = e => {
    setError(e);
  }

  const closeModal = () => {
    resetEstado()
    changeError(false)
  }

  const resetEstado = () => {
    setEstado({
      _id: '',
      nombre: '',
      estado: true
    })
  }

  




  return (
    <div className="container">      
      <div className='table-responsive'>
        <button 
          type="button" 
          className="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"          
          >
          <i className="fa-solid fa-plus"></i>
            Agregar            
         </button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Fecha Actualización</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              estados.map((est, index) => {
                const date = new Date(est.fechaCreacion);
                const creacion = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
                return(
                  <tr key={est._id}>
                    <th scope="row">{ index + 1}</th>
                    <td>{est.nombre}</td>
                    <td>{est.estado ? 'Activo' : 'Inactivo'}</td>
                    <td>{creacion}</td>
                    <td>{est.fechaActualizacion}</td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-outline-success"
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"     
                        data = {est._id}
                        

                       >                                            
                        <i className="fa-solid fa-pen-to-square"></i>
                        -
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-danger">             
                        <i className="fa-solid fa-trash"></i>
                        -
                      </button>
                    </td>    
                    <td></td>
                  </tr>  
                )
              })
            }
          </tbody>
        </table>
      </div>     



      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Nuevo Estado</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close" 
                onClick={closeModal}>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={add}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                  <input 
                    required 
                    value={estado.nombre} 
                    name = "nombre" 
                    type="text" 
                    className="form-control" 
                    onChange={changeEstado}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Estado:</label>
                  <select 
                    required 
                    className="form-select" 
                    aria-label="Default select example" 
                    value={estado.estado} 
                    name="estado" 
                    onChange={changeEstado}>
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>                    
                  </select>                  
                                  </div>
                <div className="modal-footer">                   
                  <div className={error ? 'alert alert-danger': 'd-none'} role="alert">
                    ¡Ha ocurrido un error al guardar!
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>





    </div>
  )
}
