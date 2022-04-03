import React from "react";
import { NavLink} from "./elementos";
  
const Navbar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Sistema BAD115</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <NavLink to="/" class="nav-link active" href="#">Inicio</NavLink>
                </li>       
                <li class="nav-item">
                    <NavLink to="/roles" class="nav-link " aria-current="page" href="#">Roles</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/departamentos" class="nav-link " aria-current="page" href="#">Departamentos</NavLink>
                </li>
                      
            </ul>
            <span class="navbar-text">
               Usuario/ cerrar sesion
            </span>
            </div>
        </div>
    </nav>   
        
    </>
  );
};
  
export default Navbar;