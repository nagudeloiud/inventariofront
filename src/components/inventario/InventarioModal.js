import React, { useEffect, useState } from 'react'

/* Ya no se necesita era para obtener los usuarios aqui...pero ya me llegan desde inventario.js como atributo 
de <ModalInventario ....  */
/*
import { obtenerTodosUsuarios } from '../../services/UsuarioService';
*/

function setOptionsMarcas(marcas) {
    return marcas.map(
      marca => <option value={marca._id} label={marca.nombre} key={marca._id} ></option>
    )
  }
  
  function setOptionsUsuarios(usuarios) {
    return usuarios.map(
      usuario => <option value={usuario._id} label={usuario.email} key={usuario._id} ></option>
    )
  }
  
  function setOptionsTipoEquipos(tipoEquipos) {
    return tipoEquipos.map(
      tipoEquipo => <option value={tipoEquipo._id} label={tipoEquipo.nombre} key={tipoEquipo._id} ></option>
    )
  }
  
  function setOptionsEstados(estados) {
    return estados.map(
      estado => <option value={estado._id} label={estado.nombre} key={estado._id} ></option>
    )
  }

export default function ModalInventario({
    inventario, changeInventario, 
    marcas,
    usuarios,
    tipoEquipos,
    estados,
    loading,
    closeModal,
    hidden,
    error,
    add
}) {


    return (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {inventario._id ? "Editar Inventario" : "Nuevo Inventario"}
                </h5>
                {loading && (
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
    
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={add}>
                  <input type={hidden} name="_id" value={inventario._id}></input>
                  <div className="row">
                    <div className="col"> 
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">
                          Modelo:
                        </label>
                        <input
                          disabled={inventario._id ? true : false}
                          readOnly={inventario._id ? true : false}
                          required
                          value={inventario.modelo}
                          name="modelo"
                          type="text"
                          className="form-control"
                          onChange={changeInventario}
                        />
                      </div>
                    </div>
                    <div className="col"> 
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">
                          Serial:
                        </label>
                        <input
                          disabled={inventario._id ? true : false}
                          readOnly={inventario._id ? true : false}
                          required
                          value={inventario.serial}
                          name="serial"
                          type="text"
                          className="form-control"
                          onChange={changeInventario}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Descripción:
                    </label>
                    <textarea
                      value={inventario.descripcion}
                      name="descripcion"
                      type="text"
                      className="form-control"
                      onChange={changeInventario}
                    />
                  </div>
                  <div className="row">
                    <div className="col"> 
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">
                          Precio:
                        </label>
                        <input
                          value={inventario.precio}
                          name="precio"
                          type="number"
                          className="form-control"
                          onChange={changeInventario}
                        />
                      </div>
                    </div>
                    <div className="col"> 
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">
                          Color:
                        </label>
                        <input
                          value={inventario.color}
                          name="color"
                          type="text"
                          className="form-control"
                          onChange={changeInventario}
                        />
                      </div>
                    </div>
                  </div>  
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Foto:
                    </label>
                    <input
                      value={inventario.foto}
                      name="foto"
                      type="text"
                      className="form-control"
                      onChange={changeInventario}
                    />
                  </div>
                  <div className="row">
                    <div className="col"> 
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">
                          Marca:
                        </label>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          value={inventario.marca}
                          name="marca"
                          onChange={changeInventario}
                        >
                          <option defaultValue={""}></option>
                          {setOptionsMarcas(marcas)}
                        </select>
                      </div>
                    </div>
                    <div className="col">   
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">
                          Usuario:
                        </label>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          value={inventario.usuario}
                          name="usuario"
                          onChange={changeInventario}
                        >
                          <option defaultValue={""}></option>
                          {setOptionsUsuarios(usuarios)}
                        </select>
                      </div>
                    </div>  
                  </div>
                  <div className="row">
                    <div className="col">  
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">
                          Tipo Equipo:
                        </label>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          value={inventario.tipoEquipo}
                          name="tipoEquipo"
                          onChange={changeInventario}
                        >
                          <option defaultValue={""}></option>
                          {setOptionsTipoEquipos(tipoEquipos)}
                        </select>
                      </div>
                    </div>
                    <div className="col">    
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label">
                          Esatado:
                        </label>
                        <select
                          required
                          className="form-select"
                          aria-label="Default select example"
                          value={inventario.estado}
                          name="estado"
                          onChange={changeInventario}
                        >
                          <option defaultValue={""}></option>
                          {setOptionsEstados(estados)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div
                      className={error ? "alert alert-danger" : "d-none"}
                      role="alert"
                    >
                      ¡Ha ocurrido un error!
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    {loading ? (
                      <button className="btn btn-primary" type="button" disabled>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Guardar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );



    /** Esto era para obtener los usuarios...pero ya me llegaron como atributo desde inventarios.js en 
     * <InventarioModal .....
     */
/*
    const [usuarios, setUsuarios] = useState([]);
    useEffect( () => {
        const getUsuarios = () => {
            obtenerTodosUsuarios()
            .then(r => {
                console.log(r);
                setUsuarios(r.data)
            }).catch(e => {
                console.log(e)
            })
        }
        getUsuarios();
      }, []);
*/

/*
  return (
<div 
    className="modal fade" id="modalInventarios" 
    tabIndex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Agregar Inventario</h5>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          >
          </button>
        </div>
            <div className="modal-body">
            <form className="needs-validation" noValidate="">
            <div className="row g-3">
                <div className="col-sm-6">
                <label htmlFor="serial" className="form-label">Serial</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="serial" 
                    placeholder=""
                    name="serial"
                    value={inventario.serial}
                    required
                    onChange={changeInventario}  
                />
                <div className="invalid-feedback">
                    Valid first name is required.
                </div>
                </div>

                <div className="col-sm-6">
                <label htmlFor="modelo" className="form-label">Modelo</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="modelo" placeholder="" 
                    required
                    name="modelo"
                    value={inventario.modelo}
                    onChange={changeInventario}  
                />
                <div className="invalid-feedback">
                    Valid last name is required.
                </div>
                </div>

                <div className="col-12">
                <label htmlFor="descripcion" className="form-label">Descripción
                <span className="text-muted">(Optional)</span>
                </label>
                <div className="input-group has-validation">
                    <textarea
                    name="descripcion"
                    className="form-control" 
                    id="descripcion" 
                    placeholder="Aquí descripción..."
                    value={inventario.descripcion}
                    onChange={changeInventario}  
                    />
                <div className="invalid-feedback">
                    Your username is required.
                    </div>
                </div>
                </div>

                <div className="col-12">
                <label htmlFor="color" className="form-label">Color <span className="text-muted">(Optional)</span></label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="color" 
                    placeholder="verde"
                    name="color"
                    value={inventario.color}
                    onChange={changeInventario}  
                />
                <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                </div>
                </div>

                <div className="col-12">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="precio" 
                    name="precio"
                    placeholder="1000"
                    value={inventario.precio}
                    onChange={changeInventario}  
                />
                <div className="invalid-feedback">
                    Please enter your shipping address.
                </div>
                </div>

                <div className="col-md-5">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <select className="form-select" id="usuario" required="">
                    <option value="">Selecciona uno...</option>
                    {usuarios.map(u => {
                        return (
                            <option key={u._id} value={u._id}>{u.nombre}</option>
                        );
                    })}

                </select>
                <div className="invalid-feedback">
                    Please select a valid country.
                </div>
                </div>

                <div className="col-md-4">
                <label htmlFor="state" className="form-label">State</label>
                <select className="form-select" id="state" required="">
                    <option value="">Choose...</option>
                    <option>California</option>
                </select>
                <div className="invalid-feedback">
                    Please provide a valid state.
                </div>
                </div>

                <div className="col-md-3">
                <label htmlFor="zip" className="form-label">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                <div className="invalid-feedback">
                    Zip code required.
                </div>
                </div>
            </div>

                <hr className="my-4" />

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="same-address"/>
                    <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="save-info"/>
                    <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                </div>

                <hr className="my-4"/>

                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                    <div className="form-check">
                    <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked="" required=""/>
                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                    </div>
                    <div className="form-check">
                    <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required=""/>
                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                    </div>
                    <div className="form-check">
                    <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required=""/>
                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                    </div>
                </div>

                <div className="row gy-3">
                    <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required=""/>
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                        Name on card is required
                    </div>
                    </div>

                    <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required=""/>
                    <div className="invalid-feedback">
                        Credit card number is required
                    </div>
                    </div>

                    <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required=""/>
                    <div className="invalid-feedback">
                        Expiration date required
                    </div>
                    </div>

                    <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required=""/>
                    <div className="invalid-feedback">
                        Security code required
                    </div>
                    </div>
                </div>

                <hr className="my-4"/>

                <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
            </form>
            </div>
        </div>
        </div>
    </div>
  )

  */
}