import React from 'react';
  
const Inicio = () => {
  return (
    <div class="container mt-4">
        <h1>Inicio</h1>
        {/*INICIA */}
        <div class="container mt-3 mb-3">
          <div class="row" id="cardsinicio">
          <div class="col col-6">
                  <div class="card p-3 mb-2">
                      <div class="d-flex justify-content-between">
                          <div class="d-flex flex-row align-items-center">
                              <div class="icon icon-success">  <span>60</span></div>
                              <div class="ms-3 c-details">
                              <h4 class="heading">Laboratorios registrados</h4>
                                  <h6 class="mb-0 fw-normal">En el sistema</h6>
                              </div>
                          </div>
                         
                      </div>
                     
                              
                      <div class="text-end">
                      <div class="badge"> <span class="icon-success">Ver todos</span> </div>
                      </div>
                    
                  </div>
              </div> 
              <div class="col col-6">
                  <div class="card p-3 mb-2">
                      <div class="d-flex justify-content-between">
                          <div class="d-flex flex-row align-items-center">
                              <div class="icon icon-primary"> <span>60</span> </div>
                              <div class="ms-3 c-details">
                              <h4 class="heading">Pacientes registrados</h4>
                                  <h6 class="mb-0 fw-normal">En el sistema</h6>
                              </div>
                          </div>
                         
                      </div>
                     
                              
                      <div class="text-end">
                      <div class="badge"> <span class="icon-primaryx">Ver todos</span> </div>


                      </div>
                  </div>
              </div>      
              <div class="col col-6 mt-3">
                  <div class="card p-3 mb-2">
                      <div class="d-flex justify-content-between">
                          <div class="d-flex flex-row align-items-center">
                              <div class="icon icon-warning">  <span>60</span></div>
                              <div class="ms-3 c-details">
                              <h4 class="heading">Laboratorios registrados</h4>
                                  <h6 class="mb-0 fw-normal">En el sistema</h6>
                              </div>
                          </div>
                         
                      </div>
                     
                              
                      <div class="text-end">
                      <div class="badge"> <span class="icon-warning">Ver todos</span> </div>
                      </div>
                    
                  </div>
              </div> 
              <div class="col col-6 mt-3">
                  <div class="card p-3 mb-2">
                      <div class="d-flex justify-content-between">
                          <div class="d-flex flex-row align-items-center">
                              <div class="icon icon-danger"> <span>60</span> </div>
                              <div class="ms-3 c-details">
                              <h4 class="heading">Pacientes registrados</h4>
                                  <h6 class="mb-0 fw-normal">En el sistema</h6>
                              </div>
                          </div>
                         
                      </div>
                     
                              
                      <div class="text-end">
                      <div class="badge"> <span class="icon-danger">Ver todos</span> </div>


                      </div>
                  </div>
              </div> 
            </div>
        </div>
        {/*fin*/}
    </div>
    
  );
};
  
export default Inicio;