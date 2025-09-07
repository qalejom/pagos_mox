import { useState } from "react";

const TercerosForm = () => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('0');
    const [habilitarInput, setHabilitarInput] = useState(false);
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [formaPago, setFormaPago] = useState('');
    const [numeroCuenta, setNumeroCuenta] = useState('');


    const handleSelectChange = (e) => {
        const valor = e.target.value;
        setOpcionSeleccionada(valor);
        setFormaPago(valor);
        setHabilitarInput(valor !== '1' && valor !== '0' ); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cliente = {tipoDocumento, numeroIdentificacion, nombre, direccion, telefono, email, formaPago, numeroCuenta}
        const response = await fetch('http://localhost:8090/api/terceros/nuevo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(cliente),
          });

          if (response.ok) {
            alert('Cliente guardado');
          } else {
            alert('Error al guardar');
          }
    }


    return (

        <form className="card card-body" onSubmit={handleSubmit}>
            <h3 className="mb-3">Terceros</h3>
            <div className="row">

                <div className="col">
                    <select value={tipoDocumento} onChange={e => setTipoDocumento(e.target.value)} className="form-select mb-2">
                        <option selected>Tipo Documento</option>
                        <option value="1">CC</option>
                    </select>
                </div>
                <div className="col">
                    <input value={numeroIdentificacion} onChange={e => setNumeroIdentificacion(e.target.value)} className="form-control mb-2" placeholder="Número documento" />
                </div>
                <div className="col">
                    <input value={nombre} onChange={e => setNombre(e.target.value)} className="form-control mb-2" placeholder="Nombre" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input value={direccion} onChange={e => setDireccion(e.target.value)} className="form-control mb-2" placeholder="Dirección" />
                </div>
                <div className="col">
                    <input value={telefono} onChange={e => setTelefono(e.target.value)} type="number" className="form-control mb-2" placeholder="Telefono" />
                </div>
                <div className="col">
                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <select className="form-select mb-2" value={opcionSeleccionada} onChange={handleSelectChange}>
                        <option value="0" selected>Forma de Pago</option>
                        <option value="1">Efectivo</option>
                        <option value="2">Banco Davivienda Ahorros</option>
                        <option value="3">Bancolombia Ahorros</option>
                        <option value="4">Nequi</option>
                        <option value="5">Daviplata</option>
                    </select>
                </div>
                <div className="col">
                    <input className="form-control mb-2" value={numeroCuenta} onChange={e => setNumeroCuenta(e.target.value)} placeholder="Numero" disabled={!habilitarInput} />
                </div>
            </div>
            <button type="submit" className="btn btn-info text-white">Grabar</button>
        </form>

    );
}


export default TercerosForm;