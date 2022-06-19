import React, { useEffect, useState} from 'react'
import { obtenerTodos, guardar } from '../../services/TipoEquipoService';

export default function TipoEquipo() {

  const [tipoequipos, setTipoEquipos] = useState([]);   

  const [tipoequipo, setTipoEquipo] = useState({
    nombre: '',
    estado: false
  });   
  const [error, setError] = useState(false);




  useEffect(() =>{
    const getTipoEquipos = () => {
      obtenerTodos().
      then(r => {
         console.log(r)
         setTipoEquipos(r.data)
      }).catch(e => {
        console.log(e)
      })
    }
    getTipoEquipos();
  },[]); 


  const changeTipoEquipo =  e => {
    e.preventDefault();
    setTipoEquipo({
      ...tipoequipo,
      [e.target.name]: e.target.value
    })
  }
  

  const add = e => {
    e.preventDefault();
    console.log(tipoequipo)
    guardarTipoEquipo();
  }; 

  const guardarTipoEquipo = () => { 
    guardar(tipoequipo)
    .then( r =>{
      setTipoEquipos([...tipoequipos, r.data])
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
    resetTipoEquipo()
    changeError(false)
  }

  const resetTipoEquipo = () => {
    setTipoEquipo({
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
              <th scope="col">TipoEquipo</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Fecha Actualización</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              tipoequipos.map((item, index) => {
                const date = new Date(item.fechaCreacion);
                const creacion = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
                return(
                  <tr key={item._id}>
                    <th scope="row">{ index + 1}</th>
                    <td>{item.nombre}</td>
                    <td>{item.estado ? 'Activo' : 'Inactivo'}</td>
                    <td>{creacion}</td>
                    <td>{item.fechaActualizacion}</td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-outline-success"
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"     
                        data = {item._id}
                        

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
              <h5 className="modal-title" id="exampleModalLabel">Nuevo TipoEquipo</h5>
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
                    value={tipoequipo.nombre} 
                    name = "nombre" 
                    type="text" 
                    className="form-control" 
                    onChange={changeTipoEquipo}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">TipoEquipo:</label>
                  <select 
                    required 
                    className="form-select" 
                    aria-label="Default select example" 
                    value={tipoequipo.estado} 
                    name="estado" 
                    onChange={changeTipoEquipo}>
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


