import React from "react";
import { NavLink} from "./elementos";
import Cookies from 'universal-cookie';
const cookies = new Cookies();



const Navbar = () => {
    const cerrarSesion=()=>{    
        cookies.remove('nombre', {path: "/"});
        window.location.href='./login';
    }
  return (
    <>
    <nav class="navbar navbar-expand-lg px-4 fondoAzulOscuro py-1">
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
                    <NavLink to="/departamentos" class="nav-link  text-light" aria-current="page" href="#">Departamentos</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/municipios" class="nav-link  text-light" aria-current="page" href="#">Municipios</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/poblaciones" class="nav-link  text-light" aria-current="page" href="#">Poblaciones</NavLink>
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