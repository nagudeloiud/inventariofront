import React, { useEffect, useState} from 'react'
import { obtenerTodosUsuarios, guardar, editarPorId } from '../../services/UsuarioService';

export default function Usuario() {

  const [usuarios, setUsuarios] = useState([]);   

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    estado: true
  });   

  const [error, setError] = useState(false);

  const [hidden] = useState('hidden');

  const [loading, setLoading] = useState(false);




  useEffect(() =>{
    const getUsuarios = () => {
      obtenerTodosUsuarios().
      then(r => {
         console.log(r)
         setUsuarios(r.data)
      }).catch(e => {
        console.log(e)
      })
    }
    getUsuarios();
  },[]); 


  const changeUsuario =  e => {
    e.preventDefault();
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  
  const add = e => {
    setLoading(true);
    e.preventDefault();
    console.log(usuario);
    if(usuario._id){
      editarUsuario();
    }else{
      guardarUsuario();
    }
    resetUsuario();
  }; 


  const guardarUsuario = () => { 
    console.log('el usuario a grabar:  ', usuario);
    guardar(usuario)
    .then( r =>{
      setUsuarios([...usuarios, r.data])
      changeError(false);  
      setLoading(false);
    }).catch(e =>{
      console.log('excepcion guardar usuario -> ', e);
      changeError(true); 
      setLoading(false);  
    }) 
  };

  const closeModal = () => {
    resetUsuario()
    changeError(false)
  }

  const changeError = e => {
    setError(e);
  }

  const openEditById = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const id = e.target.getAttribute('data');
      console.log('openEditById atribute data en id', id)
      const usuarioFilter = usuarios.filter(usu => usu._id == id)[0];
      setUsuario({
        ...usuarioFilter
      });
    }, 500)
  }

  const editarUsuario = () => {
    editarPorId(usuario._id, usuario)
    .then(r => {
      console.log(r.data._id)
      const id = r.data._id;
      if(!r.data.estado){
        const activos = usuarios.filter(usu => usu._id !== id);
        setUsuarios(activos);
      }
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }



  const resetUsuario = () => {
    setUsuario({
      _id: '',
      nombre: '',
      email: '',
      estado: true
    })
  }

  




  return (
    <div className="container">    

      <button 
        onClick={resetUsuario}
        type="button" 
        className="btn btn-outline-primary"
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"          
        >
        <i className="fa-solid fa-plus"></i>
          Agregar            
      </button>  

      <div className='table-responsive'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Usuario</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Fecha Actualización</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios.map((item, index) => {
                const date = new Date(item.fechaCreacion);
                const creacion = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
                const date2 = new Date(item.fechaActualizacion);
                const actualizacion = date2.getFullYear() + '-' + date2.getMonth() + '-' + date2.getDay();
                return(
                  <tr key={item._id}>
                    <th scope="row">{ index + 1}</th>
                    <td>{item.nombre}</td>
                    <td>{item.estado ? 'Activo' : 'Inactivo'}</td>
                    <td>{item.fechaCreacion}</td> 
                    <td>{item.fechaActualizacion}</td>
                    <td>{item.email}</td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-outline-success"
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"     
                        data = {item._id}
                        onClick={openEditById}
                       >                                            
                        <i className="fa-solid fa-pen-to-square"  data={item._id}
                        onClick={openEditById}></i>
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-danger">             
                        <i className="fa-solid fa-trash"></i>
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



      <div className="modal fade" id="exampleModal" 
            tabIndex="-1" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header"> 
              <h5 className="modal-title" id="exampleModalLabel">{usuario._id ? 'Editar Usuario': 'Nuevo Usuario'}</h5>
                {
                  (loading && <div className="spinner-grow spinner-grow-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>)
                }

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
                  <input type={hidden} name="_id" value={usuario._id}></input>
                  <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                  <input 
                    disabled={usuario._id ? true : false}
                    readOnly={usuario._id ? true : false}
                    required 
                    value={usuario.nombre} 
                    name = "nombre" 
                    type="text" 
                    className="form-control" 
                    onChange={changeUsuario}
                   />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-email" className="col-form-label">Email:</label>
                  <input 
                    disabled={usuario._id ? true : false}
                    readOnly={usuario._id ? true : false}                  
                    required 
                    value={usuario.email} 
                    name = "email" 
                    type="text" 
                    className="form-control" 
                    onChange={changeUsuario}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Estado:</label>
                  <select 
                    disabled={usuario._id ? false : true}//si editamos usuario disabled=false, si adicionamos disable=true porque no es campo para agregar...estado siempre lo ponemos verdadero al adicionar. 
                    readOnly={usuario._id ? false : true}                  
                    required 
                    className="form-select" 
                    aria-label="Default select example" 
                    value={usuario.estado} 
                    name="estado" 
                    onChange={changeUsuario}>
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
                  
         
                  {
                    loading ? ( 
                      <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                           Loading...
                      </button>) : 
                      (<button type="submit" className="btn btn-primary">
                         GuardarEstado
                      </button>)
                  }
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}