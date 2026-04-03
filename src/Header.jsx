import React, { useState } from "react";
import logoImg from "./assets/mox.jpeg";

const Header = ({ onChangeForm }) => {
  const [openSub, setOpenSub] = useState(null);

  const toggleSub = (menu) => {
    setOpenSub(openSub === menu ? null : menu);
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 pt-2 bg-white border-end shadow-sm"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1050 // Corregido de z-index a zIndex
      }}>
      <div className="d-flex justify-content-center align-items-center mt-0 mb-1 px-2"
        style={{ height: "110px" }}>
        <img src={logoImg} alt="Logo" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
      </div>

      <hr className="my-2" />
      <div className="nav nav-pills flex-column mb-auto gap-1">

        {/* HOME */}
        <button className="nav-link text-start d-flex align-items-center gap-1" onClick={() => onChangeForm('home')}>
          <i className="bi bi-speedometer2"></i> Dashboard
        </button>

        <div>
          <button
            className={`nav-link w-100 text-start d-flex justify-content-between align-items-center gap-1 ${openSub === 'maestros' ? 'bg-light text-dark fw-bold' : ''}`}
            onClick={() => toggleSub('maestros')}
          >
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-calculator"></i> Maestros
            </span>
            <i className={`bi bi-chevron-${openSub === 'maestros' ? 'down' : 'right'} small`}></i>
          </button>

          {openSub === 'maestros' && (
            <div className="bg-light rounded-3 mt-1 py-1 ms-3">
              <button className="nav-link small text-start w-100 ps-4 py-1" onClick={() => onChangeForm('terceros')}>TERCEROS</button>
              <button className="nav-link small text-start w-100 ps-4 py-1" onClick={() => onChangeForm('inmuebles')}>INMUEBLES</button>

            </div>
          )}
        </div>

        {/* SUBMENÚ: EGRESOS CLIENTES */}
        <div>
          <button
            className={`nav-link w-100 text-start d-flex justify-content-between align-items-center gap-1 ${openSub === 'egresos' ? 'bg-light text-dark fw-bold' : ''}`}
            onClick={() => toggleSub('egresos')}
          >
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-calculator"></i> Egresos
            </span>
            <i className={`bi bi-chevron-${openSub === 'egresos' ? 'down' : 'right'} small`}></i>
          </button>

          {openSub === 'egresos' && (
            <div className="bg-light rounded-3 mt-1 py-1 ms-3">
              <button className="nav-link small text-start w-100 ps-4 py-1" onClick={() => onChangeForm('egresosCliente')}>CLIENTES</button>
            </div>
          )}
        </div>

        {/* SUBMENÚ: PAGOS ARRENDATARIOS */}
        <div>
          <button
            className={`nav-link w-100 text-start d-flex justify-content-between align-items-center gap-1 ${openSub === 'pagos' ? 'bg-light text-dark fw-bold' : ''}`}
            onClick={() => toggleSub('pagos')}
          >
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-wallet2"></i> Pagos
            </span>
            <i className={`bi bi-chevron-${openSub === 'pagos' ? 'down' : 'right'} small`}></i>
          </button>

          {openSub === 'pagos' && (
            <div className="bg-light rounded-3 mt-1 py-1 ms-3">
              <button className="nav-link small text-start w-100 ps-4 py-1" onClick={() => onChangeForm('pagosArrendatarios')}>Arrendatarios</button>
              <button className="nav-link small text-start w-100 ps-4 py-1" onClick={() => onChangeForm('pagos')}>Arrendadores</button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;