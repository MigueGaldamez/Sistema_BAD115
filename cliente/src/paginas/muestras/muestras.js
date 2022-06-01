import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import Moment from 'moment';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
var SHA256 = require("crypto-js/sha256");

const DetalleChequeo = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  /*const[nombreexamen,setNombreExamen]=useState("");
  const[area,setArea]=useState(0);*/
  
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  /*const[nuevoNombreExamen,setNuevoNombreExamen]=useState("");*/
  
  const[observaciones, setObservaciones]=useState("");
  const[fechaIngreso, setFechaIngreso]=useState(Moment().format('YYYY-MM-DD'));
  const[horaIngreso, setHoraIngreso]=useState(Moment().format('HH:mm'));

  //LA LISTA QUEMOSTRAREMOS
  const[pacientesLista, setPacientesLista] = useState([]);
  const[ordenesLista, setOrdenesLista] = useState([]);

  const columns = pacientesLista[0] && Object.keys(pacientesLista[0]);

  const[modalRegistro, setModalRegistro] = useState([]);
  const[modalVerMuestra, setModalVerMuestra] = useState([]);
  //PARA LA BUSQUEDA
  /*
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'idexamen',
    'nombreexamen',
    'area',
    
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idexamen',
    'nombreexamen',
    'area',
  ]);
  */

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/pacientesPacienteExamenes`).then((response)=>{
      setPacientesLista(response.data);
    });    
  };

  const obtenerTabla=(id)=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/ordenes/${id}`).then((response)=>{
      setOrdenesLista(response.data);
    });
  };
 
  const cerrarModal=()=>{
    //Limpiamos los errores
    setErrores([]);
    //limpiamos los campos
    //setNombre('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalRegistro;
    modal.hide();
  }

  const abrirModalRegistro=()=>{
    var modal = new Modal(document.getElementById('registrarMuestra'));
    setModalRegistro(modal);
    modal.show();
    
  }

  const cerrarModalVerMuestra=()=>{
    //Limpiamos los errores
    setErrores([]);
    //limpiamos los campos
    //setNombre('');
    //cerramos el modal
    var modal = modalVerMuestra;
    modal.hide();
  }

  const abrirModalVerMuestra=()=>{
    var modal = new Modal(document.getElementById('verMuestra'));
    setModalVerMuestra(modal);
    modal.show();
    
  }

  const guardar=(iddetalle, idchequeo)=>{
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/muestras`,{
      observaciones:observaciones, 
      horaIngreso:horaIngreso,
      fechaIngreso:fechaIngreso,
      iddetalle:iddetalle,
    }).then((response)=>{
      if(response.data.errores==null){      
        obtenerTabla(idchequeo);
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
      //obtenerRegistros();
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

  const eliminar=(iddetalle, idchequeo)=>{
    swal({
      title: "Eliminar la muestra del examen",
      text: "¿Esta seguro que desea eliminar la muestra de este examen?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancelar", "Eliminar"],
    })
    .then(willDelete => {
      if (willDelete) {
        Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/muestras/${iddetalle}`).then(()=>{
          swal({
            title: "Exito!",
            text: "Eliminado con exito",
            icon: "success",
            button: `Entendido`, 
          });
          obtenerTabla(idchequeo);
          cerrarModalVerMuestra();
          //ACTUALIZAR DATOS
          //obtenerRegistros();
        }).catch(function (error) {
          if(error.response!=null){
            swal({
              title: "Error!",
              text: error.response.data.detail,
              icon: "error",
              button: "Aww yiss!",
            });
          }if(error.response==null){
            console.log(error);
            swal({
              title: "Error!",
              text: "Error de conexion al servidor",
              icon: "error",
              button: "Aww yiss!",
            });
          }
        });
        
      }
    });

  }

  /*function buscar(rows) {
    return rows.filter((row) =>
      buscarColumnas.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }*/


  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   obtenerRegistros();
  },[]);

  return (
    <div class="container my-4">
      
      
      <div class="mt-4 mb-4">
      <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Registro de Muestras</span></h2>
        </div>
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
               
                <div class="row">
                    <div class="col col-4">
                      <h5>Pacientes</h5>
                      <div class="list-group">
                      {pacientesLista.map((row) =>{  
                        const id = row['idcheq'];  
                      return(
                        <button class="list-group-item d-flex list-group-item-action justify-content-between align-items-start"
                        onClick={()=>{obtenerTabla(id)}}>

                          {columns.map((column) => {
                          if(column=='nombrepaciente')
                          return(
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">{row['nombrepaciente']} {row['apellido']}</div>
                                <p class="text-start mb-0">{Moment().diff(row['fechanacimiento'], 'years')} años</p>
                              </div>
                          )

                          if(column=='cuenta')
                          return (
                            <span class="badge bg-primary rounded-pill">{row[column]}</span>
                          )
                          })}
                            
                        </button>
                      )})}
                      </div>
                    </div>
                    <div class="col col-8">
                      <h5 class="">Examenes</h5>
                      <DatatableRoles  
                      data={ordenesLista} 
                      abrirModalRegistro={abrirModalRegistro}
                      abrirModalVerMuestra={abrirModalVerMuestra}
                      guardar={guardar}
                      eliminar={eliminar}
                      setObservaciones={setObservaciones}
                      errores={errores}
                      />
                    </div>
                </div>
              
              </div>
            </div>
          </div>
          
          
      </div>    
    </div>
  );
};
  
export default DetalleChequeo;