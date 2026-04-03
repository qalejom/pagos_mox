import { useState } from "react";

const TercerosForm = () => {
    // Mantenemos tus estados originales exactamente igual
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('Efectivo');
    const [habilitarInput, setHabilitarInput] = useState(false);
    const [tipoDocumento, setTipoDocumento] = useState('CC');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [formaPago, setFormaPago] = useState('Efectivo');
    const [numeroCuenta, setNumeroCuenta] = useState('.');

    // Tu lógica original de manejo de select
    const handleSelectChange = (e) => {
        var valor = e.target.value;
        if(valor === 'Efectivo'){
           setNumeroCuenta('.');
        }
        setOpcionSeleccionada(valor);
        setFormaPago(valor);
        setHabilitarInput(valor !== 'Efectivo'); 
    }

    // Tu lógica de envío original (sin cambiar nombres de variables)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // El objeto 'cliente' mantiene tus nombres exactos de variables
        const cliente = {
            tipoDocumento, 
            numeroIdentificacion, 
            nombre, 
            direccion, 
            telefono, 
            email, 
            formaPago, 
            numeroCuenta
        };

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
        <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white py-2">
                <h5 className="mb-0 small fw-bold text-uppercase">Registro de Terceros</h5>
            </div>
            
            <form className="card-body p-4" onSubmit={handleSubmit}>
                {/* Bloque 1: Identificación */}
                <div className="row g-3 mb-3">
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted">TIPO DOCUMENTO</label>
                        <select value={tipoDocumento} onChange={e => setTipoDocumento(e.target.value)} className="form-select border-info">
                            <option value="CC">CC</option>
                            <option value="NIT">NIT</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted">NÚMERO</label>
                        <input value={numeroIdentificacion} onChange={e => setNumeroIdentificacion(e.target.value)} className="form-control" required />
                    </div>
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted">NOMBRE COMPLETO</label>
                        <input value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" required />
                    </div>
                </div>

                {/* Bloque 2: Contacto */}
                <div className="row g-3 mb-3">
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">DIRECCIÓN</label>
                        <input value={direccion} onChange={e => setDireccion(e.target.value)} className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">TELÉFONO</label>
                        <input value={telefono} onChange={e => setTelefono(e.target.value)} type="number" className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">EMAIL</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                    </div>
                </div>

                {/* Bloque 3: Forma de Pago */}
                <div className="row g-3 mb-4 p-3 bg-light rounded border">
                    <div className="col-md-6">
                        <label className="small fw-bold text-primary">FORMA DE PAGO</label>
                        <select className="form-select border-primary" value={opcionSeleccionada} onChange={handleSelectChange}>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Banco Davivienda Ahorros">Banco Davivienda Ahorros</option>
                            <option value="Bancolombia Ahorros">Bancolombia Ahorros</option>
                            <option value="Nequi">Nequi</option>
                            <option value="Llave">Llave</option>
                            <option value="Daviplata">Daviplata</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="small fw-bold text-primary">NÚMERO DE CUENTA</label>
                        <input 
                            className={`form-control ${habilitarInput ? 'border-primary' : ''}`} 
                            value={numeroCuenta} 
                            onChange={e => setNumeroCuenta(e.target.value)} 
                            disabled={!habilitarInput} 
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success btn-lg px-5 fw-bold shadow-sm">
                        GRABAR TERCERO
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TercerosForm;