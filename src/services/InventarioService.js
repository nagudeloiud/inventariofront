import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodos = () => {
  return axiosConfig.get(
      '/inventarios'
  );
} 

export const guardar = (inventario) => {
  return axiosConfig.post("/inventarios", inventario);
};

export const editarPorId = (id, inventario) => {
  return axiosConfig.put("/inventarios/" + id, inventario);
};