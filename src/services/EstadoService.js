import Estado from "../components/estado/Estado";
import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodosEstados = () => {
  return axiosConfig.get(
    '/estados'
    //process.env.REACT_APP_BASE_URL+'/estados'
  );
}


export const guardar = (estado) => {  
  return  axiosConfig.post('/estados', estado); 
};


export const editarPorId = (id, estado) => {  
  return  axiosConfig.put('/estados/'+id, estado); 
};
