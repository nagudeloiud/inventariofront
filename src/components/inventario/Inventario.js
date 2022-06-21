import React, { useEffect, useState } from 'react'
import { obtenerTodos, guardar, editarPorId } from '../../services/InventarioService'; /** todos los registros de inventarios*/
import { obtenerTodosMarcas} from "../../services/MarcaService";/** todos los registros de marcas*/
import { obtenerTodosUsuarios} from "../../services/UsuarioService";/** todos los registros de usuarios*/
import { obtenerTodosTipoEquipos} from "../../services/TipoEquipoService";/** todos los registros de tipoequipos*/
import { obtenerTodosEstados} from "../../services/EstadoService";/** todos los registros de estados*/

import InventarioTabla from './InventarioTabla'
import InventarioModal from './InventarioModal';

export default function Inventario() {

  
  const [marcas, setMarcas] = useState([]);

  const [usuarios, setUsuarios] = useState([]);
  
  const [tipoEquipos, setTipoEquipos] = useState([]);
  
  const [estados, setEstados] = useState([]);

  const [inventarios, setInventarios] = useState([]);

  const [inventario, setInventario] = useState({
    serial: "",
    modelo: "",
    descripcion: "",
    foto: null,
    color: "",
    fechaCompra: "",
    precio: "",
    usuario: "",
    marca: "",
    estado: "",
    tipoEquipo: ""
  });

  const [error, setError] = useState(false);

  const [hidden] = useState("hidden");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInventarios = () => {
      obtenerTodos()
        .then((r) => {
          console.log(r);
          setInventarios(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getMarcas = () => {
      obtenerTodosMarcas()
        .then((r) => {
          console.log(r);
          setMarcas(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getUsuarios = () => {
      obtenerTodosUsuarios()
        .then((r) => {
          console.log(r);
          setUsuarios(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getTipoEquipos = () => {
      obtenerTodosTipoEquipos()
        .then((r) => {
          console.log(r);
          setTipoEquipos(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getEstados = () => {
      obtenerTodosEstados()
        .then((r) => {
          console.log(r);
          setEstados(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getInventarios();
    getMarcas();
    getUsuarios();
    getTipoEquipos();
    getEstados();
  }, []);



  const changeInventario = e => {
    e.preventDefault();
    setInventario({
      ...inventario,
      [e.target.name]: e.target.value 
    })
  }

  const add = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(inventario);
    if (inventario._id) {
      editarInventario();
    } else {
      guardarInventario();
    }
    resetEstado();
  };

  const guardarInventario = () => {
    console.log('el inventario:  ',inventario);
    guardar(inventario)
      .then((r) => {
        setInventarios([...inventarios, r.data]);
        changeError(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        changeError(true);
        setLoading(false);
      });
  };

  const closeModal = () => {
    resetEstado();
    changeError(false);
  };

  const changeError = (e) => {
    setError(e);
  };

  const openEditById = (e) => {
    e.preventDefault();
    setLoading(true);
      setLoading(false);
      const id = e.target.getAttribute("data");
      console.log(id);
      const estadoFilter = inventarios.filter((est) => est._id === id)[0];
      setInventario({
        ...estadoFilter,
      });
  };

  const editarInventario = () => {
    editarPorId(inventario._id, inventario)
      .then((r) => {
        console.log(r.data._id);
        const id = r.data._id;
        if (!r.data.estado) {
          const activos = inventarios.filter((est) => est._id !== id);
          setInventarios(activos);
        }
        changeError(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        changeError(true);
        setLoading(false);
      });
  };

  const resetEstado = () => {
    setInventario({
      _id: "",
      modelo: "",
      serial: "",
      descripcion: "",
      foto: "",
      precio: "",
      color: "",
      marca: "",
      usuario: "",
      tipoEquipo: "",
      estado: "",
    });
  };


  return (
    <div className='container'>
      <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={resetEstado}
      >
        <i className="fa-solid fa-plus"></i>
        Agregar
      </button>
      <InventarioTabla
        inventarios={inventarios}
        marcas={marcas} 
        usuarios={usuarios}
        tipoEquipos={tipoEquipos}
        estados={estados}
        openEditById={openEditById}
      />
      <InventarioModal
        inventario={inventario}
        changeInventario={changeInventario}
        marcas={marcas}
        usuarios={usuarios}
        tipoEquipos={tipoEquipos}
        estados={estados}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        error={error}
        add={add}         
      />


    </div>
  )
}