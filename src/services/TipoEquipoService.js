import TipoEquipo from "../components/tipoequipo/TipoEquipo";
import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodos = () => {
  return axiosConfig.get(
    '/tiposequipo'
    //process.env.REACT_APP_BASE_URL+'/estados'
  );
}


export const guardar = (tipoequipo) => {  
  return  axiosConfig.post('/tiposequipo', tipoequipo); 
};


export const editarPorId = (id, tipoequipo) => {  
  return  axiosConfig.put('/tiposequipo/'+id, tipoequipo); 
};
