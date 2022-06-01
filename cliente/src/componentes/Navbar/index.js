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
 
    <nav class="navbar navbar-expand-lg px-4 fondoAzulOscuro py-1 sticky-top navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand text-light">Sistema BAD115</a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            {cookies.get('nombre')!=null &&
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <NavLink to="/" class="nav-link active text-light" href="#">Inicio</NavLink>
                </li>       
                <li class="nav-item">
                    <NavLink to="/roles" class="nav-link  text-light" aria-current="page" href="#">Roles</NavLink>
                </li>
                
                <li class="nav-item">
                    <NavLink to="/laboratorios" class="nav-link  text-light" aria-current="page" href="#">Laboratorios</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/usuarios" class="nav-link  text-light" aria-current="page" href="#">Usuarios</NavLink>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Catalogos
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <NavLinkDrop to="/departamentos" class="dropdown-item" aria-current="page" href="#">Departamentos</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/municipios" class="dropdown-item" aria-current="page" href="#">Municipios</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/poblaciones" class="dropdown-item" aria-current="page" href="#">Poblaciones</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/profesiones" class="dropdown-item" aria-current="page" href="#">Profesiones</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/areas" class="dropdown-item" aria-current="page" href="#">Areas</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/unidades" class="dropdown-item" aria-current="page" href="#">Unidades</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/estadosciviles" class="dropdown-item" aria-current="page" href="#">Estados Civil</NavLinkDrop>
                        </li>
                        
                    </ul>
                </li>
                <li class="nav-item">
                    <NavLink to="/opcionespermisos" class="nav-link  text-light" aria-current="page" href="#">Opciones Permisos</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/laboratoristas" class="nav-link  text-light" aria-current="page" href="#">Laboratoristas</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/pacientes" class="nav-link  text-light" aria-current="page" href="#">Pacientes</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/resultados" class="nav-link  text-light" aria-current="page" href="#">Resultados</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/muestras" class="nav-link  text-light" aria-current="page" href="#">Muestras</NavLink>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Reportes
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <NavLinkDrop to="/" class="dropdown-item" aria-current="page" href="#">Examenes realizados</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/" class="dropdown-item" aria-current="page" href="#">Epidemiologico</NavLinkDrop>
                        </li>
                        <li>
                            <NavLinkDrop to="/reportetipeo" class="dropdown-item" aria-current="page" href="#">Tipeo de sangre</NavLinkDrop>
                        </li>
                        
                    </ul>
                </li>
             
            </ul>
            }
             {cookies.get('nombre')==null &&
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      
            </ul>
            }
            <span class="navbar-text">
                
                {cookies.get('nombre')!=null &&
                      <div>                        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul class="navbar-nav">
                          <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {cookies.get('nombre')}
                            </a>
                            <ul class="dropdown-menu dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><h6 class="dropdown-header">Opciones:</h6></li>
                              <li><a class="dropdown-item" href="#">Perfil</a></li>
                              <li><hr class="dropdown-divider"/></li>
                              <li><a class="dropdown-item" href="#" onClick={()=>cerrarSesion()}>Cerrar Sesión</a></li>
                            </ul>
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
        </div>
    </nav>   
        
    </>
  );
};
  
export default Navbar;