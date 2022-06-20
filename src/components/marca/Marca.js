import React, { useEffect, useState} from 'react'
import { obtenerTodos, guardar, editarPorId } from '../../services/MarcaService';
import Modal from './Modal';


export default function Marca() {
  const [marcas, setMarcas] = useState([]); 

  const [marca, setMarca] = useState({
    nombre: '',
    estado: false
  });   

  const [error, setError] = useState(false);

  const [hidden] = useState('hidden');

  const [loading, setLoading] = useState(false);


  useEffect(() =>{
    const getMarcas = () => {
      obtenerTodos().
      then(r => {
         console.log(r)
         setMarcas(r.data)
      }).catch(e => {
        console.log(e)
      })
    }
    getMarcas();
  },[]); 


  const changeMarca =  e => {
    e.preventDefault();
    setMarca({
      ...marca,
      [e.target.name]: e.target.value
    })
  }
  
  const add = e => {
    setLoading(true);
    e.preventDefault();
    console.log(marca)
    if(marca._id){
      editarMarca();
    }else{
      guardarMarca();
    }
    resetMarca();
  }; 



  const guardarMarca = () => { 
    guardar(marca)
    .then( r =>{
      setMarcas([...marcas, r.data])
      changeError(false);  
      setLoading(false);
    }).catch(e =>{
      console.log(e);
      changeError(true); 
      setLoading(false); 
    }) 
  };

  const closeModal = () => {
    resetMarca()
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
      const marcaFilter = marcas.filter(marc => marc._id == id)[0];
      setMarca({
        ...marcaFilter
      });
    }, 500)
  }

  const editarMarca = () => {
    editarPorId(marca._id, marca)
    .then(r => {
      console.log(r.data._id)
      const id = r.data._id;
      if(!r.data.estado){
        const activos = marcas.filter(marc => marc._id !== id);
        setMarcas(activos);
      }
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const resetMarca = () => {
    setMarca({
      _id: '',
      nombre: '',
      estado: true
    })
  }

  




  return (
    <div className="container">      

        <button 
          onClick={resetMarca}
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
              <th scope="col">Marca</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Fecha Actualización</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              marcas.map((item, index) => {
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

      <Modal 
        marca={marca}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeMarca={changeMarca}
        error={error}
        add={add}
      /> 



    </div>
  )
}


