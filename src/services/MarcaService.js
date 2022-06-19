import Marca from "../components/marca/Marca";
import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodos = () => {
  return axiosConfig.get(
    '/marcas'
    //process.env.REACT_APP_BASE_URL+'/estados'
  );
}


export const guardar = (marca) => {  
  return  axiosConfig.post('/marcas', marca); 
};


export const editarPorId = (id, marca) => {  
  return  axiosConfig.put('/marcas/'+id, marca); 
};
