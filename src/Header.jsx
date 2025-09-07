import React from "react";

const Header = ({onChangeForm}) =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">MOX</span>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={() => onChangeForm('terceros')}>Terceros</button>
          <button className="btn btn-outline-success" onClick={() => onChangeForm('inmuebles')}>Inmuebles</button>
          <button className="btn btn-outline-info" onClick={() => onChangeForm('pagos')}>Pagos</button>
        </div>
      </div>
    </nav>

    );
};

export default Header;