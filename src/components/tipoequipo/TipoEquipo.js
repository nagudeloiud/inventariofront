import React, { useEffect, useState} from 'react'
import { obtenerTodos, guardar, editarPorId } from '../../services/TipoEquipoService';
import { obtenerTodosUsuarios } from '../../services/UsuarioService';
import ModalTipoEquipo from './ModalTipoEquipo';

export default function TipoEquipo() {
  const [usuarios, setUsuarios] = useState([]);

  const [tipoequipos, setTipoEquipos] = useState([]);  

  const [tipoequipo, setTipoEquipo] = useState({
    nombre: '',
    estado: false,
    usuario: {
      "email": "enrique.zapata@gmail.com"
    }
  });   

  const [error, setError] = useState(false);

  const [hidden] = useState('hidden');
  
  const [loading, setLoading] = useState(false);  


  useEffect( () => {
      const getUsuarios = () => {
          obtenerTodosUsuarios()
          .then(r => {
              console.log(r);
              setUsuarios(r.data)
          }).catch(e => {
              console.log(e)
          })
      }
      getUsuarios();
    }, []);

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
    setLoading(true);
    e.preventDefault();
    console.log(tipoequipo)
    if(tipoequipo._id){
      editarTipoEquipo();
    }else{
      guardarTipoEquipo();
    }
    resetTipoEquipo();
  }; 


  const guardarTipoEquipo = () => { 
    guardar(tipoequipo)
    .then( r =>{
      setTipoEquipos([...tipoequipos, r.data])
      changeError(false);  
      setLoading(false);
    }).catch(e =>{
      console.log(e);
      changeError(true); 
      setLoading(false); 
    }) 
  };

  const closeModal = () => {
    resetTipoEquipo()
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
      console.log(id)
      const tipoequipoFilter = tipoequipos.filter(tipoe => tipoe._id == id)[0];
      setTipoEquipo({
        ...tipoequipoFilter
      });
    }, 500)
  }

  const editarTipoEquipo = () => {
    editarPorId(tipoequipo._id, tipoequipo)
    .then(r => {
      console.log(r.data._id)
      const id = r.data._id;
      if(!r.data.estado){
        const activos = tipoequipos.filter(tipoe => tipoe._id !== id);
        setTipoEquipos(activos);
      }
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const resetTipoEquipo = () => {
    setTipoEquipo({
      _id: '',
      nombre: '',
      estado: true,
      usuario: {
        "email": "enrique.zapata@gmail.com"
      }      
    })
  }

  




  return (
    <div className="container">      
        <button 
          onClick={resetTipoEquipo}        
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

        <ModalTipoEquipo 
          tipoequipo={tipoequipo}   
          loading={loading}
          closeModal={closeModal}
          hidden={hidden}
          changeTipoEquipo={changeTipoEquipo}
          error={error}
          add={add}
          usuarios={usuarios}
        /> 

 

    </div>
  )
}


