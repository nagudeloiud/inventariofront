/** Componente llamado TablaModulos que sirve para todos los modulos que manejen los mismos datos(campos-atributos):
 *  _id, nombre, estado, fechaCreacion, fechaActualizacion.
 *   A saber serviría para estados, marcas, tiposequipo
 * 
 */

import React from 'react'

export default function TablaModulos({items, openEditById}) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Fecha Creación</th>
          <th scope="col">Fecha Actualización</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, index) => {
            const date = new Date(item.fechaCreacion);
            const creacion = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
            return(
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
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
                      data={item._id}
                      onClick={openEditById}
                    >
                    <i className="fa-solid fa-pen-to-square" data={item._id}
                    onClick={openEditById}></i>
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-outline-danger"
                    >
                    <i className="fa-solid fa-trash"></i>
                   
                  </button>
                </td>
                <td></td>
            </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>
  )
}