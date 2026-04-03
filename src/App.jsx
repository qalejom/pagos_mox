//import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';
import Header from './Header'; // Tu nuevo Sidebar
import HomeForm from './Home';
import TercerosForm from './Terceros';
import InmueblesForm from './Inmuebles';
import PagosForm from './Pagos';
import EgresosClientes from './EgresosClientes';
import PagosArrendatarios from './PagosArrendatarios';

function App() {
  const [formToShow, setFormToShow] = useState('terceros');

  const renderForm = () => {
    switch (formToShow) {
      case 'home': return <HomeForm />;
      case 'terceros': return <TercerosForm />;
      case 'inmuebles': return <InmueblesForm />;
      case 'pagos': return <PagosForm />;
      case 'egresosCliente': return <EgresosClientes />;
      case 'pagosArrendatarios': return <PagosArrendatarios />;
      default: return <p className="text-center mt-5">Selecciona un formulario en el menú lateral</p>;
    }
  };

  return (
    <div className="d-flex">
      {/* 1. El Sidebar (Header) se queda fijo a la izquierda */}
      <Header onChangeForm={setFormToShow} />

      {/* 2. El contenido principal se desplaza a la derecha */}
      <main style={{ 
        marginLeft: "250px", 
        width: "100%", 
        minHeight: "100vh", 
        backgroundColor: "#f8f9fa",
        padding: "40px" 
      }}>
        <div className="container-fluid">
          {renderForm()}
        </div>
      </main>
    </div>
  );
}

export default App;