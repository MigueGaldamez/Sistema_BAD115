import React, { useState,useEffect,Component }from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Login = () => { 
  const[correo,setCorreo]=useState("");
  const[contrasenia,setContrasenia]=useState("");

  const iniciarSesion=()=>{
    Axios.post('http://localhost:3001/iniciarSesion', {correo: correo, contrasenia:contrasenia})
    .then(response=>{
 
        if(response.data.length>0){
          var respuesta = response.data[0];
          cookies.set('nombre', respuesta.nombre, {path: "/"});
          window.location.href='./';
          alert('Bienvenido'+respuesta.nombre)
        }
    })
    .catch(error=>{      
      console.log(error);
        alert('El usuario o la contraseña no son correctos');
    })

  }
  return (
    <div class="container mt-4">
    <div class="card card-body col-6 mx-auto p-4">
      <h1 class="mb-0">Sistema BAD115</h1>
      <h5 class="text-muted mt-0 mb-3">Iniciar Sesión</h5>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Correo Electronico</label>
        <input type="email" class="form-control" name="usuario" onChange={(event)=>{ setCorreo(event.target.value)}}/>
        <div id="emailHelp" class="form-text">Nunca compartiremos tu direccion de correo con nadie más.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
        <input type="password" class="form-control"  name="contrasenia" onChange={(event)=>{ setContrasenia(event.target.value)}}/>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
        <label class="form-check-label" for="exampleCheck1">Recordarme</label>
      </div>
      <button type="submit" class="btn btn-primary" onClick={()=> iniciarSesion()}>Iniciar sesión</button>
    </div>
  </div> 
    );
} 
  export default Login;
