import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const Pacientes = () => { 
    //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  const[erroresA, setErroresA] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  const[correo,setCorreo]=useState("");
  const[direccion,setDireccion]=useState("");
  const[apellido,setApellido]=useState("");
  const[fechaNacimiento,setFechaNacimiento]=useState("");
  const[estadoCivil,setEstadoCivil]=useState(0);  
  const[municipio,setMunicipio]=useState(0);

  const[identificador,setIdentificador]=useState("");  
  const[numero,setNumero]=useState(0);
  const[identificadorEmergencias,setIdentificadorEmergencias]=useState("");  
  const[numeroEmergencias,setNumeroEmergencias]=useState(0);
  const[contactos,setContactos]=useState([]);
  const[contactosA,setContactosA]=useState([]);
  const[paso,setPaso]=useState(1);
  const[pasoA,setPasoA]=useState(1);

  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState("");
  const[nuevoMunicipio,setNuevoMunicipio]=useState(0);
  const[nuevoApellido,setNuevoApellido]=useState("");
  const[nuevaDireccion,setNuevaDireccion]=useState("");
  const[nuevoCorreo,setNuevoCorreo]=useState("");
  const[nuevaFechaNacimiento,setNuevaFechaNacimiento]=useState("");
  const[nuevoEstado,setNuevoEstado]=useState(0);
  const[nuevoContactos,setNuevoContactos]=useState([]);
  const[nuevoestadoCivil,setNuevoEstadoCivil]=useState(0);  
  const[nuevoidentificadorEmergencias,setNuevoIdentificadorEmergencias]=useState("");  
  const[nuevonumeroEmergencias,setNuevoNumeroEmergencias]=useState(0);
  const[nuevoidentificador,setNuevoidentificador]=useState("");  
  const[nuevoNumero,setNuevoNumero]=useState(0);
  //LA LISTA QUEMOSTRAREMOS
  const[municipioLista, setMunicipioLista] = useState([]);
  const[pacienteLista, setPacienteLista] = useState([]);
  const[estadoCivilLista, setEstadoCivilLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  const[modalA, setModalA] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns,setColumns] = useState([
    'apellido',
    'nombrepaciente',
    'municipio',
    'estadocivil',
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'apellido',
    'nombrepaciente',
    'municipio',
    'estadocivil',
  ]);

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/pacientes`).then((response)=>{
     setPacienteLista([]);
    setPacienteLista(response.data);  });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/estadosciviles`).then((response)=>{ 
    setEstadoCivilLista(response.data);  });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/municipios`).then((response)=>{
      setMunicipioLista(response.data);  });
  };

  const abrirModal=()=>{
    var modal = new Modal(document.getElementById('nuevoRegistro'));
    setModalB(modal);
    modal.show();
  }
  const cerrarModal=()=>{
    //Limpiamos los errores
    setErrores([]);
    //limpiamos los campos
    setNombre('');
    setContactos([]);
    setMunicipio(0);
    setApellido('');
    setDireccion('');
    setFechaNacimiento('');
    setCorreo('');
    setEstadoCivil(0);
    setNumeroEmergencias(0);
    setIdentificadorEmergencias('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }

  const abrirModalActualizacion=()=>{
    var modal = new Modal(document.getElementById('actualizarDetalles'));
    setModalA(modal);
    modal.show();
  }
  const cerrarModalActualizacion=()=>{
    //Limpiamos los errores
    setErroresA([]);
    //limpiamos los campos
    setNuevoNombre('');
    setNuevoContactos([]);
    setNuevoMunicipio(0);
    setNuevoApellido('');
    setNuevaDireccion('');
    setNuevaFechaNacimiento('');
    setNuevoCorreo('');
    setNuevoEstadoCivil(0);
    setNuevoNumeroEmergencias(0);
    setNuevoIdentificadorEmergencias('');
    //limpiamos el formulario
    document.getElementById("formularioActu").reset();
    //cerramos el modal
    var modal = modalA;
    modal.hide();
  }

  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/pacientes`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
      municipio:municipio,
      apellido:apellido,
      correo:correo,
      estadoCivil:estadoCivil,
      direccion:direccion,
      fechaNacimiento:fechaNacimiento,
      numeros:contactos,
      identificadorEmergencias:identificadorEmergencias,
      numeroEmergencias:numeroEmergencias,

    }).then((response)=>{
      if(response.data.errores==null){      
        cerrarModalActualizacion();
        swal({
          title: "Exito!",
          text: "Guardado con exito",
          icon: "success",
          button: `Entendido`, 
        })
      }else{        
        setErrores(response.data.errores);
      }
      //ACTUALIZAR DATOS
      obtenerRegistros();
    }).catch(function (error) {
      if(error.response!=null){
       swal({
         title: "Error!",
         text: error.response.data.detail,
         icon: "error",
         button: "Aww yiss!",
       });
     }if(error.response==null){
       swal({
         title: "Error!",
         text: "Error de conexion al servidor",
         icon: "error",
         button: "Aww yiss!",
       });
     }
     });
  };
  const actualizaDetalles=(idpaciente)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/pacientes`,{
      nombre:nuevoNombre,
      idpaciente:idpaciente,
      idmunicipio:nuevoMunicipio,
      apellido:nuevoApellido,
      direccion:nuevaDireccion,
      fechaNacimiento:nuevaFechaNacimiento,
      correo:nuevoCorreo,
      estado:nuevoEstado,
      identificadorEmergencias:nuevoidentificadorEmergencias,
      numeroEmergencias:nuevonumeroEmergencias,
      contactos:contactosA,
      completo:1,
    }).then((response)=>{
      if(response.data.errores==null){      
        cerrarModalActualizacion();
        swal({
          title: "Exito!",
          text: "Actualizado con exito",
          icon: "success",
          button: `Entendido`, 
        })
      }else{        
        setErroresA(response.data.errores);
      }
      
    }).catch(function (error) {
      if(error.response!=null){
       swal({
         title: "Error!",
         text: error.response.data.detail,
         icon: "error",
         button: "Aww yiss!",
       });
     }if(error.response==null){
       swal({
         title: "Error!",
         text: "Error de conexion al servidor",
         icon: "error",
         button: "Aww yiss!",
       });
     }
     });
  }
  const eliminarRegistro=(idpaciente)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/pacientes/${idpaciente}`).then((res)=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Eliminado con exito",
        icon: "success",
        button: `Entendido`, 
      })  
    }).catch(function (error) {
     if(error.response!=null){
      swal({
        title: "Error!",
        text: error.response.data.detail,
        icon: "error",
        button: "Aww yiss!",
      });
    }if(error.response==null){
      swal({
        title: "Error!",
        text: "Error de conexion al servidor",
        icon: "error",
        button: "Aww yiss!",
      });
    }
    });
  };

  const actualizaRegistro=(idpaciente)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/pacientes`,{nombre:nuevoNombre,idpaciente:idpaciente,idmunicipio:nuevoMunicipio, estado:nuevoEstado,apellido:nuevoApellido,completo:0}).then(()=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Actualizado con exito",
        icon: "success",
        button: `Entendido`, 
      })
    }).catch(function (error) {
      if(error.response!=null){
       swal({
         title: "Error!",
         text: error.response.data.detail,
         icon: "error",
         button: "Aww yiss!",
       });
     }if(error.response==null){
       swal({
         title: "Error!",
         text: "Error de conexion al servidor",
         icon: "error",
         button: "Aww yiss!",
       });
     }
     });;
  };
  
  function buscar(rows) {
    return rows.filter((row) =>
      buscarColumnas.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }
  const eliminarNumero=(index)=>{
    contactos.splice(index,1);
    setNumero("");
    setIdentificador("");
    var error = errores;
    error.numero = "";
    error.identificador="";
    setErrores(error);
  }
  const agregarNumero=()=>{
    if(contactos.length>=3){
      var error = errores;
      error.numero = "Solamente se pueden agregar un maximo de 3 números";
      error.identificador = "Solamente se pueden agregar un maximo de 3 números";
      setErrores(error);
      setNumero(0);
      setIdentificador(0);
      document.getElementById("numeroform").reset();
    }else{
      var numeroNuevo={};
      numeroNuevo.numero = numero;
      numeroNuevo.identificador = identificador;
      contactos.push(numeroNuevo);
      setNumero(0);
      setIdentificador(0);
      document.getElementById("numeroform").reset();
    }   
  }

  //PARA ACTUALIAZION
  const eliminarNumeroActu=(index)=>{
    contactosA.splice(index,1);
    setNuevoNumero("");
    setNuevoidentificador("");
    setNuevoidentificador(0);
    var error = erroresA;
    error.numero = "";
    error.identificador="";
    setErroresA(error);
  }
  const agregarNumeroActu=()=>{
    if(contactosA.length>=3){
      var error = erroresA;
      error.numero = "Solamente se pueden agregar un maximo de 3 números";
      error.identificador = "Solamente se pueden agregar un maximo de 3 números";
      setErroresA(error);
      setNuevoNumero(0);
      setNuevoidentificador(0);
      document.getElementById("numeroformAct").reset();
    }else{
      var numeroNuevo={};
      numeroNuevo.numero = nuevoNumero;
      numeroNuevo.nombreidentificador = nuevoidentificador;
      contactosA.push(numeroNuevo);
      setNuevoNumero(0);
      setNuevoidentificador(0);
      document.getElementById("numeroformAct").reset();
    }   
  }


  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   obtenerRegistros();
 
  },[]);
  return (
    <div class="container my-4">
      <div class="modal fade" id="nuevoRegistro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
              <button type="button" class="btn-close"  onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <form id="formulario" onSubmit={agregarRegistro}>
            <div class="modal-body">
              
              
              <nav>
                
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class={"nav-link position-relative" + (paso==1 ?' active':'')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>setPaso(1)}>
      <span class="badge bg-info p-1">1</span> Datos de Usuario
      {(errores.nombre || errores.apellido || errores.municipio || errores.direccion || errores.fechaNacimiento || errores.correo|| errores.estadoCivil) &&
          <span class="position-absolute top-0 end-90 translate-middle p-2 bg-danger border border-light rounded-circle">
          </span> 
      }
    </button>
    <button class={"nav-link position-relative" + (paso==2 ?' active':'')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={()=>setPaso(2)}>
      <span class="badge bg-info p-1">2</span> Numeros de contacto
      {(errores.numero || errores.identificador) &&
          <span class="position-absolute top-0 end-90 translate-middle p-2 bg-danger border border-light rounded-circle">
          </span> 
      }
    </button>
    <button class={"nav-link position-relative" + (paso==3 ?' active':'')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>setPaso(3)}>
      <span class="badge bg-info p-1">3</span> Contacto de emergencia
      {(errores.numeroEmergencias || errores.identificadorEmergencias) &&
          <span class="position-absolute top-0 end-90 translate-middle p-2 bg-danger border border-light rounded-circle">
          </span> 
      }
    </button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class={"tab-pane fade"+ (paso==1? ' active show':'')} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      {/*INICIA DATOS DEUSUARIO*/}
      <div class="row mt-3 px-3">
      <div class="bordeLateral"><h6>Información General:</h6></div>
        <div class="col col-6">
                <label for="exampleInputEmail1" class="form-label">Nombres del Paciente:</label>
                <input  type="text" class="form-control form-control-sm" placeholder='Ingrese los nombres del paciente' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                { 
                errores.nombre &&
               <p><small class="text-danger">* {errores.nombre}</small></p>
              }
                </div>
                <div class="col col-6">
                <label for="exampleInputEmail1" class="form-label">Apellidos del Paciente:</label>
                <input type="text" class="form-control form-control-sm" placeholder='Ingrese los apellidos del pacientes' onChange={(event)=>{ setApellido(event.target.value)}}/>        
                { 
                errores.apellido &&
               <p><small class="text-danger">* {errores.apellido}</small></p>
              }
                </div>
                <div class="col col-4 mt-3">
              <label for="" class="form-label">Departamento:</label>
                </div>
                <div class="col col-4 mt-3">
              <label for="" class="form-label">Municipio:</label>
              <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setMunicipio(event.target.value)}}>
                   <option selected>Seleccione un Municipio</option>
                    {municipioLista.map((municipio) => {
                     
                    
                    return(  <option  value={municipio.idmunicipio}>{municipio.municipio}</option>)
                    })}
                  </select>        
                { 
                errores.municipio &&
               <p><small class="text-danger">* {errores.municipio}</small></p>
              }
              </div>
             
              <div class="col col-4 mt-3">
                  <label for="exampleInputEmail1" class="form-label">Direccion:</label>
                  <input type="text" class="form-control form-control-sm" placeholder='Ingrese la direccion' onChange={(event)=>{ setDireccion(event.target.value)}}/>        
                  { 
                  errores.direccion &&
                <p><small class="text-danger">* {errores.direccion}</small></p>
                }
              </div>
              
              <div class="col col-4 mt-3">
                  <label for="exampleInputEmail1" class="form-label">Fecha de Nacimiento:</label>
                  <input type="date" class="form-control form-control-sm" placeholder='Ingrese la direccion' onChange={(event)=>{ setFechaNacimiento(event.target.value)}}/>        
                  { 
                  errores.fechaNacimiento &&
                <p><small class="text-danger">* {errores.fechaNacimiento}</small></p>
                }
              </div>
              <div class="col col-4 mt-3">
                  <label for="exampleInputEmail1" class="form-label">Correo:</label>
                  <input type="email" class="form-control form-control-sm" placeholder='Ingrese el correo' onChange={(event)=>{ setCorreo(event.target.value)}}/>        
                  { 
                  errores.correo &&
                <p><small class="text-danger">* {errores.correo}</small></p>
                }
              </div>
              <div class="col col-4 mt-3">
                <label for="" class="form-label">Estado Civil:</label>
                <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                  setEstadoCivil(event.target.value)}}>
                    <option selected>Seleccione un Estado Civil</option>
                      {estadoCivilLista.map((estado) => {
                      
                      
                      return(  <option  value={estado.idestado}>{estado.estadocivil}</option>)
                      })}
                    </select>        
                  { 
                  errores.estado &&
                <p><small class="text-danger">* {errores.estado}</small></p>
                }
              </div>
      </div>

      {/*FINALIZA*/}
  </div>
  <div class={"tab-pane fade"+ (paso==2? ' active show':'')} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
    <form class="row mt-3 px-3" id="numeroform">
    <div class="bordeLateral"><h6>Numero/s de contacto:</h6></div>
    
    <div class="col col-6">
          <label for="exampleInputEmail1" class="form-label">Identificador de número:</label>
          <input type="text" class="form-control form-control-sm" placeholder='Ingrese el identificador' onChange={(event)=>{ setIdentificador(event.target.value)}}/>        
          { 
          errores.identificador &&
        <p><small class="text-danger">* {errores.identificador}</small></p>
        }
      </div>
      <div class="col col-6">
          <label for="exampleInputEmail1" class="form-label">Número:</label>
          <input type="number" class="form-control form-control-sm" placeholder='Ingrese el numero' onChange={(event)=>{ setNumero(event.target.value)}}/>        
          { 
          errores.numero &&
        <p><small class="text-danger">* {errores.numero}</small></p>
        }
      </div>
      <div class="mt-2">
      <a class="btn btn-info btn-sm mb-3"  onClick={agregarNumero}>Agregar</a>
      {}
      
      <div class="row"> 
      
      
       {contactos.map((contacto,index)=>{
        return(
          <div class="col col-3" key={index}>
            <div class="card">
              <div class="card-body p-3 px-3">
                <h6 class="card-title">{contacto.numero}</h6>
                <h6 class="card-subtitle mb-2 text-muted">{contacto.identificador}</h6>
                <a href="#" class="btn btn-sm btn-danger"  onClick={()=>eliminarNumero(index)}>Retirar</a>             
              </div>
            </div>
          </div>         
        )
      })}
       </div>
      </div>
    </form>
  </div>
  <div class={"tab-pane fade"+ (paso==3? ' active show':'')} id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
  <div class="row px-3 mt-3">
    <div class="bordeLateral"><h6>Contacto de emergencia:</h6></div>
    <div class="col col-6">
          <label for="exampleInputEmail1" class="form-label">Identificador de número:</label>
          <input type="text" class="form-control form-control-sm" placeholder='Ingrese el nombre del contacto' onChange={(event)=>{ setIdentificadorEmergencias(event.target.value)}}/>        
          { 
          errores.identificadorEmergencias &&
        <p><small class="text-danger">* {errores.identificadorEmergencias}</small></p>
        }
      </div>
      <div class="col col-6">
          <label for="exampleInputEmail1" class="form-label">Número de contacto:</label>
          <input type="text" class="form-control form-control-sm" placeholder='Ingrese el número' onChange={(event)=>{ setNumeroEmergencias(event.target.value)}}/>        
          { 
          errores.numeroEmergencias &&
        <p><small class="text-danger">* {errores.numeroEmergencias}</small></p>
        }
      </div>
    </div>
  </div>
</div>
                
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  onClick={cerrarModal}>Cancelar</button>
              {paso==1 &&
              <button type="button" class="btn btn-primary" onClick={()=>setPaso(2)}>Siguiente</button>}
              {paso==2 &&
              <button type="button" class="btn btn-primary" onClick={()=>setPaso(3)}>Siguiente</button>}
              {paso==3 &&
              <button type="button" class="btn btn-primary" onClick={agregarRegistro}>Guardar</button>}
            </div>
            </form>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-4">
        <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Gestión de Pacientes</span>
        
          <button type="button" class="btn btn-primary btn-sm ms-3"  onClick={abrirModal}>
            Nuevo Registro 
          </button>
              
          </h2>
        </div>
         
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
                
                <div class="row">
                    <div class="col col-5">
                    <h5>Busqueda</h5>
                   
                      <input class="form-control form-control-sm"
                              type='text'
                              value={q}
                              onChange={(e) => setQ(e.target.value)}
                            />
                            <small class="text-muted">Puede buscar por {columns && columns.map((column) => (<span>{column}, </span>))}</small>
                    </div>
                    <div class="col col-7">
                      <label><b>Criterios:</b></label>
                        <br/>
                      {columns &&
                              columns.map((column) => (
                                <div class="form-check form-check-inline">
                                <label>
                                  
                                  {column}
                                </label>
                                <input
                                    type='checkbox'
                                    class="form-check-input"
                                    checked={buscarColumnas.includes(column)}
                                    onChange={(e) => {
                                      const checked = buscarColumnas.includes(column);
                                      setBuscarColumnas((prev) =>
                                        checked
                                          ? prev.filter((sc) => sc !== column)
                                          : [...prev, column],
                                      );
                                    }}
                                  />
                                  </div>
                              ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
          <DatatableRoles 
          setContactosA ={setContactosA}
          agregarNumeroActu ={agregarNumeroActu}
          eliminarNumeroActu ={eliminarNumeroActu}
          setNuevoEstadoCivil={setNuevoEstadoCivil}
          setNuevoNumero = {setNuevoNumero}
          setNuevoNumeroEmergencias = {setNuevoNumeroEmergencias}
          setNuevoidentificador= {setNuevoidentificador}
          setNuevoIdentificadorEmergencias={setNuevoIdentificadorEmergencias}
          contactosA={contactosA}
          setPasoA={setPasoA}
          pasoA={pasoA}
          erroresA={erroresA}
          actualizaDetalles={actualizaDetalles}
          estados={estadoCivilLista} 
          setNuevaDireccion={setNuevaDireccion} 
          setNuevoApellido={setNuevoApellido} 
          setNuevaFechaNacimiento={setNuevaFechaNacimiento} 
          setNuevoCorreo={setNuevoCorreo} 
          setNuevoEstado={setNuevoEstado} 
          data={buscar(pacienteLista)} 
          municipios={municipioLista} 
          eliminarRegistro={eliminarRegistro} 
          actualizarRegistro={actualizaRegistro} 
          setNuevoNombre={setNuevoNombre} 
          setNuevoMunicipio={setNuevoMunicipio}
          cerrarModalActualizacion={cerrarModalActualizacion}
          abrirModalActualizacion={abrirModalActualizacion}/>

      </div>    
    </div>
  );
};
export default Pacientes;