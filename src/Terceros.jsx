import { useState } from "react";

const TercerosForm = () => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [habilitarInput, setHabilitarInput] = useState(false);
    const [tipoDocumento, setTipoDocumento] = useState('CC');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [formaPago, setFormaPago] = useState('Efectivo');
    const [numeroCuenta, setNumeroCuenta] = useState('.');


    const handleSelectChange = (e) => {
        var valor = e.target.value;
        if(valor === 'Efectivo'){
           setNumeroCuenta('.');
        }
        setOpcionSeleccionada(valor);
        setFormaPago(valor);
        setHabilitarInput(valor !== 'Efectivo'); 
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
            window.location.reload();
          } else {
            alert('Error al guardar');
          }
    }


    return (

        <form className="card card-body" onSubmit={handleSubmit}>
            <h3 className="mb-3">Terceros</h3>
            <div className="row">

                <div className="col">
                    <label>Tipo Documento</label>
                    <select value={tipoDocumento} onChange={e => setTipoDocumento(e.target.value)} className="form-select mb-2">
                        <option value="CC">CC</option>
                    </select>
                </div>
                <div className="col">
                    <label>Numero</label>
                    <input value={numeroIdentificacion} onChange={e => setNumeroIdentificacion(e.target.value)} className="form-control mb-2" />
                </div>
                <div className="col">
                    <label>Nombre</label>
                    <input value={nombre} onChange={e => setNombre(e.target.value)} className="form-control mb-2"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Dirección</label>
                    <input value={direccion} onChange={e => setDireccion(e.target.value)} className="form-control mb-2" />
                </div>
                <div className="col">
                    <label>Teléfono</label>
                    <input value={telefono} onChange={e => setTelefono(e.target.value)} type="number" className="form-control mb-2"/>
                </div>
                <div className="col">
                    <label>email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-2" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Forma de Pago</label>
                    <select className="form-select mb-2" value={opcionSeleccionada} onChange={handleSelectChange}>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Banco Davivienda Ahorros">Banco Davivienda Ahorros</option>
                        <option value="Bancolombia Ahorros">Bancolombia Ahorros</option>
                        <option value="Nequi">Nequi</option>
                        <option value="Llave">Llave</option>
                        <option value="Daviplata">Daviplata</option>
                    </select>
                </div>
                <div className="col">
                    <label>Número de cuenta</label>
                    <input className="form-control mb-2" value={numeroCuenta} onChange={e => setNumeroCuenta(e.target.value)} disabled={!habilitarInput} />
                </div>
            </div>
            <button type="submit" className="btn btn-info text-white">Grabar</button>
        </form>

    );
}


export default TercerosForm;