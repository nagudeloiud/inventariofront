import Usuario from "../components/usuario/Usuario";
import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodosUsuarios = () => {
  return axiosConfig.get(
    '/usuarios'
    //process.env.REACT_APP_BASE_URL+'/estados'
  );
}


export const guardar = (usuario) => {  
  return  axiosConfig.post('/usuarios', usuario); 
};


export const editarPorId = (id, usuario) => {  
  return  axiosConfig.put('/usuarios/'+id, usuario); 
};
