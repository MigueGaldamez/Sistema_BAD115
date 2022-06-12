import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Parametros = () => { 
    //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  const[area,setArea]=useState(0);
  const[tipo,setTipo]=useState(0);
  const[maxval,setMaxval] = useState(0);
  const[minval,setMinval] = useState(0);
  const[unidad,setUnidad] = useState(0);
  const[poblacion,setPoblacion] = useState(0);
  const[mensajePosi,setMensajePosi] = useState("");
  const[mensajeNega,setMensajeNega] = useState("");
  const[intervalosP, setIntervalosP] = useState([]);
  const[opcionesP, setOpcionesP] = useState([]);
  const[opcion,setOpcion] = useState("");
  const[referencia,setReferencia] = useState(true);
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState("");
  const[nuevaArea,setNuevaArea]=useState(0);
  const[nuevoTipo,setNuevoTipo]=useState(0);
  const[nuevaPoblacion,setNuevaPoblacion] = useState(0);
  const[nuevaUnidad,setNuevaUnidad] = useState(0);
  const[nuevoMensajePosi,setNuevoMensajePosi] = useState("");
  const[nuevoMensajeNega,setNuevoMensajeNega] = useState("");
  //LA LISTA QUEMOSTRAREMOSx  
  const[areaLista, setAreaLista] = useState([]);
  const[parametroLista, setParametroLista] = useState([]);
  const[unidadLista, setUnidadLista] = useState([]);
  const[poblacionLista, setPoblacionLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  const[validarLista, setValidarLista] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] = useState([
    'area',
    'parametro',
    'tipo'
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'area',
    'parametro',
    'tipo'
  ]);
 //esto es para validar en el backend y mandar siempre el id usuario
 Axios.interceptors.request.use(function (config) {
  var id = cookies.get('usuario').idusuario;
  config.headers.idusuario =  id;
  return config;
});
  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/areas`).then((response)=>{
      setAreaLista(response.data);  });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/parametros`).then((response)=>{
      setParametroLista(response.data);  });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/unidades`).then((response)=>{
      setUnidadLista(response.data);  });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/poblaciones`).then((response)=>{
        setPoblacionLista(response.data);  });
        var id = cookies.get('usuario').idusuario;
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/validarpermisos/${id}`).then((response)=>{
      setValidarLista(response.data);
    });
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
    setArea(0);
    setTipo(0);
    setNombre('');
    setIntervalosP([]);
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }

  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/parametros`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
      area:area,
      tipo:tipo,
      mensajePosi:mensajePosi,
      mensajeNega:mensajeNega,
      intervalos:intervalosP,
      opciones:opcionesP,
    }).then((response)=>{
      if(response.data.errores==null){      
        cerrarModal();
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
        if(error.response.data.detail){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }else if(error.response.data){
          swal({
            title: "Error!",
            text: error.response.data,
            icon: "error",
            button: "Aww yiss!",
          });
        }
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

  const eliminarRegistro=(idParametro)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/parametros/${idParametro}`).then((res)=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Eliminado con exito",
        icon: "success",
        button: `Entendido`, 
      })  
    }).catch(function (error) {
     if(error.response!=null){
      if(error.response.data.detail){
        swal({
          title: "Error!",
          text: error.response.data.detail,
          icon: "error",
          button: "Aww yiss!",
        });
      }else if(error.response.data){
        swal({
          title: "Error!",
          text: error.response.data,
          icon: "error",
          button: "Aww yiss!",
        });
      }
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

  const actualizaRegistro=(idparametro)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/parametros`,{nombre:nuevoNombre,idparametro:idparametro,area:nuevaArea,tipo:nuevoTipo}).then(()=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Actualizado con exito",
        icon: "success",
        button: `Entendido`, 
      })
    }).catch(function (error) {
      if(error.response!=null){
        if(error.response.data.detail){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }else if(error.response.data){
          swal({
            title: "Error!",
            text: error.response.data,
            icon: "error",
            button: "Aww yiss!",
          });
        }
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
  
  const actualizaRegistroDetalles=(idparametro)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/parametros`,
    { nombre:nuevoNombre,
      idparametro:idparametro,
      area:nuevaArea,
      tipo:nuevoTipo,
      intervalos:intervalosP,
      mensajeNega:nuevoMensajeNega,
      mensajePosi:nuevoMensajePosi,
    }).then(()=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Actualizado con exito",
        icon: "success",
        button: `Entendido`, 
      })
    }).catch(function (error) {
      if(error.response!=null){
        if(error.response.data.detail){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }else if(error.response.data){
          swal({
            title: "Error!",
            text: error.response.data,
            icon: "error",
            button: "Aww yiss!",
          });
        }
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

  function agregarALista() {
    var Intervalo={};
    Intervalo.maxval = maxval;
    Intervalo.minval = minval;
    Intervalo.id = poblacion;
    Intervalo.idunidad = unidad;
    if(poblacion!=0){
    Intervalo.valor = poblacionLista.find(x => x.idpoblacion == poblacion ).poblacion;
    }else{
      Intervalo.valor = "Todas las poblaciones";
    }
    Intervalo.unidad = unidadLista.find(x => x.idunidad == unidad ).simbolo;    
    intervalosP.push(Intervalo);
    setMaxval(0);
    setMinval(0);
    setUnidad(0);
    setPoblacion(0);
    document.getElementById("intervalos").reset();
    console.log(  intervalosP);
  }
  function eliminardeLista(id){
    if (id > -1) {
      intervalosP.splice(id, 1);
    }
    setMaxval("");
  }
 
  
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

  const agregarOpcion=()=>{
    var opcionv={};
    opcionv.opcion = opcion;
    opcionv.referencia = referencia;
    var registros = opcionesP;
    registros.push(opcionv);
    setOpcionesP(registros);
    setOpcion(0);   
    document.getElementById("opcionesM").reset()
  }
  function eliminardeListaOpcion(id){
    if (id > -1) {
      opcionesP.splice(id, 1);
    }
    setOpcion(0);
  }

  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   obtenerRegistros();
 
  },[]);
  return (
    <>{/*asi validamos cada permiso*/}
    {(!validarLista.includes(61)) && 
    <div class="col container mx-auto my-auto text-center">
      <h1 class="text-primary">Ups...</h1>
       <h4>No tiene permisos para ver estos registros</h4>
   </div>}
    {validarLista.includes(61) &&
    <div class="col container my-4">
      <div class="modal fade" id="nuevoRegistro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
              <button type="button" class="btn-close"  onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <div class="modal-body px-4">
            <form id="formulario" onSubmit={agregarRegistro}>
                  {/*Aqui*/}
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><span class="badge bg-info py-1 px-2">1</span> Datos de parametro</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><span class="badge bg-info py-1 px-2">2</span> Detalles</button>
                    </li>
                  
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active mt-2" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                      <div class="row">
                        <div class="col col-6">
                      
                          <label for="exampleInputEmail1" class="form-label">Nombre Parametro:</label>
                          <input type="email" class="form-control form-control-sm" placeholder='Ingrese un nuevo parametro' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                            { 
                            errores.nombre &&
                          <p><small class="text-danger">* {errores.nombre}</small></p>
                          }
                        </div>
                        <div class="col col-6">
                          <label for="" class="form-label">Area:</label>
                          <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                            setArea(event.target.value)}}>
                              <option selected>Seleccione un Area</option>
                                {areaLista.map((area) => {
                                
                                
                                return(  <option  value={area.idarea}>{area.nombrearea}</option>)
                                })}
                              </select>        
                            { 
                            errores.area &&
                          <p><small class="text-danger">* {errores.area}</small></p>
                            }
                        </div>
                        <div class="col col-6 mt-3">
                          <label for="exampleInputEmail1" class="form-label">Mensaje positivo:</label>
                          <input type="email" class="form-control form-control-sm" placeholder='Ingrese un mensaje positivo' onChange={(event)=>{ setMensajePosi(event.target.value)}}/>        
                            { 
                            errores.positivo &&
                          <p><small class="text-danger">* {errores.positivo}</small></p>
                          }
                        </div>
                        <div class="col col-6 mt-3">
                          <label for="exampleInputEmail1" class="form-label">Mensaje negativo:</label>
                          <input type="email" class="form-control form-control-sm" placeholder='Ingrese un mensaje negativo' onChange={(event)=>{ setMensajeNega(event.target.value)}}/>        
                            { 
                            errores.positivo &&
                          <p><small class="text-danger">* {errores.positivo}</small></p>
                          }
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                    <div class="row">
                 
                    

                 

                 <div class="col col-6 mx-auto">
                     <label class="form-label mt-3">Tipo Parametro:</label>
                   <select class="form-select form-select-sm" onChange={(event)=>{setTipo(event.target.value)}}> 
                       <option selected value="0">Seleccione un tipo</option>
                       <option value="1">Intervalo</option>
                       <option value="2">Por opción</option>
                       <option value="3">Especificación</option>
                   </select>
                 
                   { 
                     errores.tipo &&
                   <p><small class="text-danger">* {errores.tipo}</small></p>
                   }
                 </div>
               </div>
               {tipo ==1 &&
               
               
               <div >
                  
                
                  <form id="intervalos" class="row">
                  <hr class="mt-3 px-4"/>
                 <div class="col col-6">
                   <label for="exampleInputEmail1" class="form-label">Valor minimo:</label>
                   <input type="number" class="form-control form-control-sm" placeholder='Ingrese el valor minimo' onChange={(event)=>{ setMinval(event.target.value)}}/>        
                     { 
                     errores.minimo &&
                   <p><small class="text-danger">* {errores.minimo}</small></p>
                   }
                 </div>
                 <div class="col col-6">
                   <label for="exampleInputEmail1" class="form-label">Valor maximo :</label>
                   <input type="number" class="form-control form-control-sm" placeholder='Ingrese el valor maximo' onChange={(event)=>{ setMaxval(event.target.value)}}/>        
                     { 
                     errores.maximo &&
                   <p><small class="text-danger">* {errores.maximo}</small></p>
                   }
                 </div>

                 <div class="col col-6 ">
                   <label for="" class="form-label">unidad de medida:</label>
                   <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                     setUnidad(event.target.value)}}>
                       <option selected>Seleccione la unidad de medida</option>
                         {unidadLista.map((unidad) => {
                         
                         
                         return(  <option  value={unidad.idunidad}>{unidad.nombreunidad}</option>)
                         })}
                       </select>        
                     { 
                     errores.unidad &&
                   <p><small class="text-danger">* {errores.unidad}</small></p>
                     }
                 </div>
                 <div class="col col-6 ">
                   <label for="" class="form-label">población:</label>
                   <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                     setPoblacion(event.target.value)}}>
                       <option selected value="0" >Todas las poblaciones</option>
                         {poblacionLista.map((registro) => {
                         
                         
                         return(  <option  value={registro.idpoblacion}>{registro.poblacion}</option>)
                         })}
                       </select>        
                     { 
                     errores.poblacion &&
                   <p><small class="text-danger">* {errores.poblacion}</small></p>
                     }
                 </div>
                 </form>
                <div>
                <a class="btn btn-success mt-2 btn-sm" onClick={agregarALista}> Agregar</a>
                </div>
                <div class="row">
                  {intervalosP.length>0 && <span class="mt-3"><b>Intervalos ingresados</b></span>}
                  {intervalosP.map((registro,index) => {
                    return(
                    <div class="col-6 px-2">
                      <div class="border border-success p-2 mb-2 border-opacity-50 rounded ">
                       <small><span><b>{registro.valor}</b> desde <b>{registro.minval} ({registro.unidad})</b> hasta  <b>{registro.maxval} ({registro.unidad})</b></span></small> 
                        <button type="button" class="btn-close end-0" aria-label="Close" onClick={()=>{eliminardeLista(index)}}></button>
                      </div>
                    </div>)
                  })}
                </div>
               </div>
               
               }
               {tipo ==2 &&
                <form id="opcionesM" class="">
                  <hr class="mt-3 px-4"/>
                  <div class="mt-2 row">
                    <div class="col col-6">
                    <label>Agregar opción:</label>
                    <input type="text" placeholder="Agregar Opcion" class="form-control form-control-sm" onChange={(event)=>{
                     setOpcion(event.target.value)}}/>
                    <a class="btn btn-success btn-sm mt-2" onClick={agregarOpcion}>Agregar</a>
                    </div>
                    <div class="col col-6">
                    <label>Referencia opción:</label>
                    <div class="form-check form-switch ms-4">
                      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked
                      onChange={(event)=>{
                        event.target.checked && setReferencia(true);
                        !event.target.checked && setReferencia(false);}}/>
                      <label class="form-check-label" for="flexSwitchCheckChecked">Es referencia</label>
                    </div>
                    
                    
                    </div>
                    {opcionesP.length>0 && <h6>Opciones agregadas:</h6>}
                    {opcionesP.map((opcione,index)=>{
                      return(
                        <div class="col-4 px-2 container-fluid">
                          <div class="border border-success p-2 mb-2 border-opacity-50 rounded px-2">
                            
                            <small class="ms-2"> <b>Opcion: </b>{opcione.opcion} <b>Referencia:</b> {opcione.referencia==false&& <>No</>}{opcione.referencia==true&& <>Si</>}</small> 

                            <button type="button" class="btn-close float-end" aria-label="Close" onClick={()=>{eliminardeListaOpcion(index)}}></button>

                            
                          </div>
                        </div>
                      )
                       
                      })
                    }
                   
                    {opcionesP.length<=0 && <><span class="text-danger">* Debe de agregar al menos dos opciones</span></>}
                  </div>
                </form>
               }
              {tipo ==3 &&
              <div class="mx-auto fw-bold text-center"><span>Permite ingresar un valor textual</span></div>
              }
                    </div>
                  </div>
                  {/*hasta aqui*/}
               
                </form> 
            </div>  
            
            <div>
                
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  onClick={cerrarModal}>Cancelar</button>
              <button type="button" class="btn btn-primary" onClick={agregarRegistro}>Guardar</button>
            </div>
          
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="row bordeLateral mb-3 sticky-top sticky bg-white">
        <h2 class="m-0"><span>Gestión de Parametros</span>
        {validarLista.includes(62) &&
          <button type="button" class="btn btn-primary btn-sm ms-3"  onClick={abrirModal}>
            Nuevo Registro
          </button>}
              
          </h2>
        </div>
         
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
              
                <div class="row">
                    <div class="col col-6">
                      <h5>Busqueda</h5>
                      <input class="form-control form-control-sm"
                              type='text'
                              value={q}
                              onChange={(e) => setQ(e.target.value)}
                            />
                            <small class="text-muted">Puede buscar por {columns && columns.map((column) => (<span>{column}, </span>))}</small>
                    </div>
                    <div class="col col-6">
                      <label><b>Criterios</b></label>
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
          <DatatableRoles  data={buscar(parametroLista)} 
          errores={errores} 
          areas={areaLista} 
          eliminarRegistro={eliminarRegistro} 
          actualizarRegistro={actualizaRegistroDetalles} 
          setNuevoNombre={setNuevoNombre} 
          setNuevaArea={setNuevaArea} 
          setNuevoTipo={setNuevoTipo}
          setPoblacion={setPoblacion}
          setUnidad={setUnidad}
          setMinval={setMinval}
          setMaxval={setMaxval}
          unidadLista={unidadLista}
          poblacionLista={poblacionLista}
          areaLista={areaLista}
          nuevoTipo={nuevoTipo}
          setNuevoMensajeNega={setNuevoMensajeNega}
          setNuevoMensajePosi={setNuevoMensajePosi}
          agregarALista={agregarALista}
          intervalosP={intervalosP}
          nuevoMensajePosi={nuevoMensajePosi}
          nuevoMensajeNega ={nuevoMensajeNega}
          eliminardeLista={eliminardeLista}
          setIntervalosP = {setIntervalosP}
          setOpcion={setOpcion}
          setReferencia={setReferencia}
          agregarOpcion={agregarOpcion}
          eliminardeListaOpcion={eliminardeListaOpcion}
          opcionesP={opcionesP}
          setOpcionesP={setOpcionesP}
          validarLista={validarLista}
          />

      </div>    
    </div>}</>
  );
};
export default Parametros;