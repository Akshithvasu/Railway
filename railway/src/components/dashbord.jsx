import React from "react";
import './navbar.css'
// import Admin from 
import {Sidebardata} from './navbardata'



function Navbar(){
return (
  
<div className="main">
  <div className="Sidebar">
    
    <ul className="Sidebarlist">{Sidebardata.map((val,key)=>{
    return <li 
    key={key}
    className="row"
  
    onClick={()=>{
      window.location.pathname=val.link;
    }}
    >
      <div id="icon" >{val.icon}</div>
      <div id="title" >{val.title}</div>
      </li>
    })}
    </ul>
    
    </div>
   </div>
    
    
);
}

export default Navbar ;