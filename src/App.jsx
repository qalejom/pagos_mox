//import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';
import Header from './Header';
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
      default: return <p>Selecciona un formulario</p>;
    }
  };

  return (
    <div className="container mt-4">
      <Header onChangeForm={setFormToShow} />
      <div className="container mt-5">
        {renderForm()}
      </div>
    </div>
  )

}

export default App;