import TipoEquipo from "../components/tipoequipo/TipoEquipo";
import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodosTipoEquipos = () => {
  return axiosConfig.get(
    '/tiposequipo/user-activo' // Solo tipos de equipo activos
    //'/tiposequipo'//salian todos incluso los inactivos
    //process.env.REACT_APP_BASE_URL+'/estados'
  );
}


export const guardar = (tipoequipo) => {  
  return  axiosConfig.post('/tiposequipo', tipoequipo); 
};


export const editarPorId = (id, tipoequipo) => {  
  return  axiosConfig.put('/tiposequipo/'+id, tipoequipo); 
};
