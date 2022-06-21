/** Componente llamado   Modal   que sirve o se implemento solo para    tipoequipos    
 *   aunque pudies servir para otros modulos que manejen los mismos datos(campos-atributos):
 *  _id, nombre, estado, fechaCreacion, fechaActualizacion.
 *   A saber serviría para estados, marcas, tiposequipo.
 * 
 * Si se decidiese globalizarlo entonces colocarlo en el directorio   iu    y coloca variables generales
 * y no especificas a    tipoequipo.      por ejm en lugar de mandar el atributo   tipoequipo  se mandaria por decir algo
 *  el atributo  data   o   registro    o    item    o    informacion
 * 
 */
import React from 'react'

export default function ModalTipoEquipo({tipoequipo, loading, closeModal, hidden, changeTipoEquipo, error, add, usuarios}) {
  return (
<div 
    className="modal fade" id="exampleModal" 
    tabIndex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{tipoequipo._id ? 'Editar TipoEquipo': 'Nuevo TipoEquipo'}</h5>
          {
            (loading && <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>)
          }

          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={add}>
            <input type={hidden} name="_id" value={tipoequipo._id}></input>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Nombre:
              </label>
              <input 
                disabled={tipoequipo._id ? true : false}
                readOnly={tipoequipo._id ? true : false}
                required
                value={tipoequipo.nombre}
                name="nombre"
                type="text" 
                className="form-control"
                onChange={changeTipoEquipo}                
              />
            </div>

            <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">Usuario</label>
                  <select className="form-select" id="usuario" required="">
                      <option value="">Selecciona uno...</option>
                      {usuarios.map(u => {
                          tipoequipo.usuario = u;
                          return (                                
                              <option key={u._id} value={u._id} > {u.nombre}</option>
                          );
                      })}
                  </select>
            </div>


            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">Estado:</label>
              <select
                disabled={tipoequipo._id ? false : true}
                readOnly={tipoequipo._id ? false : true}
                required
                className="form-select" 
                aria-label="Default select example"
                value={tipoequipo.estado}
                name="estado"
                onChange={changeTipoEquipo}
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
            <div className="modal-footer">
                <div className={error ? 'alert alert-danger': 'd-none'} role="alert">
                  ¡Ha ocurrido un error!
                </div>
                <button 
                  type="button" 
                  className="btn btn-secondary" data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
                {
                  loading ? (<button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                    </button>) : (<button type="submit" className="btn btn-primary">
                      GuardarTipoEquipo
                    </button>)
                }
             </div>
          </form>
            </div>
        </div>
      </div>
    </div>
  )
}