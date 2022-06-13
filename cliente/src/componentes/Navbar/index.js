import React from "react";
import { NavLink,NavLinkDrop} from "./elementos";
import Cookies from 'universal-cookie';
import { Link as Link } from "react-router-dom";
const cookies = new Cookies();

const Navbar = () => {
    const cerrarSesion=()=>{    
        cookies.remove('nombre', {path: "/"});
        window.location.href='./login';
    }
  return (
    <>
        
        {cookies.get('nombre')!=null &&
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div class="flex-nowrap">
      
        <nav class="navbar navbar-expand-md navbar-dark bd-dark flex-md-column flex-row  py-2 sticky-top" id="sidebar">

            <button type="button" class="navbar-toggler border-0 order-1" data-toggle="collapse" data-bs-toggle="collapse" data-bs-target="#nav" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse order-last  flex-column p-3 pt-2 text-white min-vh-100 nav-mod" id="nav">

                <a href="/" class="d-flex mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-4">Sistema BAD115</span>
                </a>
                <hr class="w-100"/>
                
                <ul class="nav">


                <li  class="nav-item w-100">
                    <NavLink to="/" class="nav-link text-light" href="#">Inicio</NavLink>
                </li>
                <li  class="nav-item w-100">
                    <NavLink to="/laboratorios" class="nav-link text-light" aria-current="page" href="#">Laboratorios</NavLink>
                </li>
                <li class="nav-item dropdown ">
                    <a class="nav-link dropdown-toggle text-light" href="#submenu2" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="collapse" aria-expanded="false">
                        Catalogos
                    </a>
                    <ul class="collapse nav flex-column ms-1" id="submenu2" aria-labelledby="dropdownMenuButton1">
                        <li class="nav-item w-100">
                            <NavLinkDrop to="/departamentos" class="dropdown-item" aria-current="page" href="#">Departamentos</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100">
                            <NavLinkDrop to="/municipios" class="dropdown-item" aria-current="page" href="#">Municipios</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100">
                            <NavLinkDrop to="/poblaciones" class="dropdown-item" aria-current="page" href="#">Poblaciones</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100">
                            <NavLinkDrop to="/profesiones" class="dropdown-item" aria-current="page" href="#">Profesiones</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100">
                            <NavLinkDrop to="/areas" class="dropdown-item" aria-current="page" href="#">Areas</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100">
                            <NavLinkDrop to="/unidades" class="dropdown-item" aria-current="page" href="#">Unidades</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100">
                            <NavLinkDrop to="/estadosciviles" class="dropdown-item" aria-current="page" href="#">Estados Civil</NavLinkDrop>
                        </li>
                        
                    </ul>
                </li>
                <li class="nav-item w-100">
                    <NavLink to="/laboratoristas" class="nav-link text-light" aria-current="page" href="#">Laboratoristas</NavLink>
                </li>
                <li class="nav-item w-100">
                    <NavLink to="/pacientes" class="nav-link  text-light" aria-current="page" href="#">Pacientes</NavLink>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-light" href="#submenu3" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="collapse" aria-expanded="false">
                        Usuarios y permisos
                    </a>
                    <ul class="collapse nav flex-column ms-1" id="submenu3" aria-labelledby="dropdownMenuButton1">

                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/roles" class="dropdown-item" aria-current="page" href="#">Roles</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/usuarios" class="dropdown-item" aria-current="page" href="#">Usuarios</NavLinkDrop>
                        </li>  
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/opcionespermisos" class="dropdown-item" aria-current="page" href="#">Opciones Permisos</NavLinkDrop>
                        </li> 
                    </ul>
                </li>
                <li class="nav-item w-100">
                    <NavLink to="/chequeos" class="nav-link  text-light" aria-current="page" href="#">Chequeos</NavLink>
                </li>
                <li class="nav-item w-100">
                    <NavLink to="/parametros" class="nav-link  text-light" aria-current="page" href="#">Parametros</NavLink>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-light mr-4" href="#submenu7" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="collapse" aria-expanded="false">
                    Resultados
                    </a>
                    <ul class="collapse nav flex-column ms-1" id="submenu7" aria-labelledby="dropdownMenuButton1">
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/resultados" class="dropdown-item" aria-current="page" href="#">Registrar resultados</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/resultados" class="dropdown-item" aria-current="page" href="#">Ver resultados</NavLinkDrop>
                        </li>
                       
                    </ul>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-light mr-4" href="#submenu6" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="collapse" aria-expanded="false">
                        Muestras
                    </a>
                    <ul class="collapse nav flex-column ms-1" id="submenu6" aria-labelledby="dropdownMenuButton1">
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/muestras" class="dropdown-item" aria-current="page" href="#">Registrar muestra</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/listadomuestras" class="dropdown-item" aria-current="page" href="#">Ver muestras</NavLinkDrop>
                        </li>
                       
                    </ul>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-light mr-4" href="#submenu4" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="collapse" aria-expanded="false">
                        Reportes
                    </a>
                    <ul class="collapse nav flex-column ms-1" id="submenu4" aria-labelledby="dropdownMenuButton1">
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/reporteexamenes" class="dropdown-item" aria-current="page" href="#">Examenes realizados</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/reporteepidemiologico" class="dropdown-item" aria-current="page" href="#">Epidemiologico</NavLinkDrop>
                        </li>
                        <li class="nav-item w-100 text-light">
                            <NavLinkDrop to="/reportetipeo" class="dropdown-item" aria-current="page" href="#">Tipeo de sangre</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/reporteportipo" class="dropdown-item" aria-current="page" href="#"> Reporte Examenes Por Tipo</NavLinkDrop>
                        </li>
                       
                    </ul>
                </li>


          </ul>
          
          <hr class="w-100 mb-1"/>
          <span class="navbar-text">
                
                {cookies.get('nombre')!=null &&
                      <div>                        
                        <div class="dropdown dropup" id="navbarNavDarkDropdown">

                        <ul class="navbar-nav">

                          <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-light mr-4" href="#submenu5" id="navbarDarkDropdownMenuLink" role="button" data-toggle="collapse" data-bs-toggle="collapse" aria-expanded="false">
                            {cookies.get('nombre')}
                            </a>

                            <ul class="dropdown-menu pos" id="submenu5"  aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><h6 class="dropdown-header text-black">Opciones:</h6></li>
                                <li><a class="dropdown-item text-black" href="#">Perfil</a></li>
                                <li><hr class="dropdown-divider text-black"/></li>
                                <li><a class="dropdown-item text-black" href="#" onClick={()=>cerrarSesion()}>Cerrar Sesión</a></li>
                            </ul>
                            <br></br>

                          </li>

                        </ul>

                      </div>
                    </div>
                    
                       

                }
                {cookies.get('nombre')==null &&
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                 
                  <li class="nav-item">
                      <NavLink to="/login" class="nav-link text-light" aria-current="page" href="#">Iniciar Sesión</NavLink>
                  </li>
                        
              </ul>
                }
              
            </span>


          </div>

        </nav> 
        
      </div>
        </div>
    }
    {cookies.get('nombre')==null &&
    <nav class="navbar navbar-expand-lg px-4 fondoAzulOscuro py-1 sticky-top ">
    <div class="container-fluid">
        <a class="navbar-brand text-light">Sistema BAD115</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                
        </ul>
        <span class="navbar-text">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                 
                 <li class="nav-item">
                     <NavLink to="/login" class="nav-link text-light" aria-current="page" href="#">Iniciar Sesión</NavLink>
                 </li>
                 </ul>
        </span>
            </div>
        </div>
    </nav> 
        }  
        
    </>
  );
};
  
export default Navbar;