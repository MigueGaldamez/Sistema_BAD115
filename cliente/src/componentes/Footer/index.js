import React from "react";
import { NavLink} from "../Navbar/elementos";
import { useState,useEffect } from 'react';
import Moment from 'moment';
  
const Footer = () => {

  function showTime(){
    document.getElementById('HoraActual').innerHTML = Moment().format('DD MMM YYYY, h:mm:ss a');
  }

  useEffect(()=>{
    //showTime();
    setInterval(showTime, 1000);    
  },[]);

  return (
    <>
    <nav class="navbar fixed-bottom  py-0 fondoAzulOscuro">
        <div class="container-fluid">
            <a class="navbar-brand text-light" href="#">Copyright 2022</a>
            <h5 class="text-white" id="HoraActual"> </h5>
        </div>
    </nav>      
    </>
  );
};
  
export default Footer;