import React, { useState,useEffect,Component }from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
var SHA256 = require("crypto-js/sha256");

const cookies = new Cookies();

const Login = () => { 
  const[correo,setCorreo]=useState("");
  const[contrasenia,setContrasenia]=useState("");

  const iniciarSesion=()=>{
    var contraseniaEncriptada = (SHA256(contrasenia)).toString();
    console.log(contraseniaEncriptada);
    Axios.post('http://localhost:3001/iniciarSesion', {correo: correo, contrasenia:contraseniaEncriptada})
    .then(response=>{
 
        if(response.data.length>0){
          var respuesta = response.data[0];
          cookies.set('nombre', respuesta.nombre + " | " +respuesta.correo, {path: "/"});
          swal({
            title: "Exito!",
            text: "Bienvenido "+respuesta.nombre +"!",
            icon: "success",
            button: `Entendido`, 
          }).then((result) => { 
            window.location.href='./';
           });
        }
    })
    .catch(error=>{      
      console.log(error);
      swal({
        title: "Error!",
        text: "Usuario o contraseña incorrecto!",
        icon: "error",
        button: "Aww yiss!",
      });
        
    })

  }
  return (
    <div class="container mt-4">
      <div class="card card-body col-6 mx-auto p-4 loginCard">   
        <div class="col-8 mx-auto">
          <img class="" src={"./imgs/logo2.svg"} />
        </div>
         
      <div class="mb-3 mt-4">
        <div class="row">
        <div class="col-3">
          <label for="exampleInputEmail1" class="form-label">Correo Electronico </label>          
        </div>
        <div class="col">
          <input type="email" class="form-control form" name="usuario" onChange={(event)=>{ setCorreo(event.target.value)}}/>
          <div id="emailHelp" class="form-text">Nunca compartiremos tu direccion de correo con nadie más.</div>
        </div>
        </div>
        

      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          </div>
          <div class="col">
            <input type="password" class="form-control form"  name="contrasenia" onChange={(event)=>{ setContrasenia(event.target.value)}}/>
          </div>
        </div>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
        <label class="form-check-label" for="exampleCheck1">Recordarme</label>
      </div>
      <div class="col text-center">
      <button type="submit" class="btn btn-primary" onClick={()=> iniciarSesion()}>Iniciar sesión</button>
      </div>
    </div>
  </div> 
    );
} 
  export default Login;
