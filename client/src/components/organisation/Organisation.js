
import Header from "../Headers/Header";
import React from "react";
import Grades from "./Grade/Grades";
import SLs from "./SL/SLS";

// reactstrap components
import {
  Container,
} from "reactstrap";
// core components
;


function Organisation() {
    return (
      <>
       <Header /> 
        
        <Container className="mt--7" fluid>
         
           <SLs/> 
          <Grades/>

          
        </Container>

        
      </>
    );
  
}

export default Organisation;
