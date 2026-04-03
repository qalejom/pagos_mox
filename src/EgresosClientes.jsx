
import { useState, useEffect } from "react";

const EgresosClientesForm = () => {
    const getLocalDate = (onlyMonth = false) => {
        const ahora = new Date();
        const offset = ahora.getTimezoneOffset() * 60000;
        const localISO = new Date(ahora - offset).toISOString();
        return onlyMonth ? localISO.substring(0, 7) : localISO.substring(0, 10);
    };

    // --- ESTADOS ORIGINALES ---
    const [inmuebles, setInmuebles] = useState([]);
    const [id, setIdInmueble] = useState(0);
    const [fechaPago, setFechaPago] = useState(getLocalDate());
    const [conceptoPago, setConcepto] = useState('');
    const [valorConcepto, setValorConcepto] = useState(0);
    const [numeroFactura, setNumeroFactura] = useState('.');
    const [numeroPago, setNumeroPago] = useState('.');
    const [observaciones, setObservaciones] = useState('.');
    const descontadoCliente = 'N';

    useEffect(() => {
        fetch('http://localhost:8090/api/inmuebles/traerinmuebles')
            .then(res => res.json())
            .then(data => setInmuebles(data))
            .catch(err => console.error("Error cargando inmuebles:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inmueble = { id };
        const egresoCliente = {
            inmueble, conceptoPago, valorConcepto, numeroFactura, numeroPago, fechaPago,
            observaciones, descontadoCliente
        };

        const response = await fetch('http://localhost:8090/api/egresosclientes/nuevo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(egresoCliente),
        });

        if (response.ok) {
            alert('Egreso guardado con éxito');
            window.location.reload();
        } else {
            alert('Error al guardar el egreso');
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white py-2">
                <h5 className="mb-0 small fw-bold text-uppercase">Registro de Gastos y Egresos</h5>
            </div>

            <form className="card-body p-4" onSubmit={handleSubmit}>
                
                {/* SECCIÓN 1: Identificación del Gasto */}
                <h6 className="text-info border-bottom pb-2 mb-3 fw-bold">Información General</h6>
                <div className="row g-3 mb-4">
                    <div className="col-md-5">
                        <label className="small fw-bold text-muted">INMUEBLE AFECTADO</label>
                        <select className="form-select border-info" value={id} onChange={e => setIdInmueble(e.target.value)} required>
                            <option value="">Seleccione dirección...</option>
                            {inmuebles.map((i) => (
                                <option key={i.id} value={i.id}>{i.direccion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">CONCEPTO DE PAGO</label>
                        <select className="form-select" value={conceptoPago} onChange={e => setConcepto(e.target.value)} required>
                            <option value="">Seleccione...</option>
                            <option value="Pago Energia">Pago Energia</option>
                            <option value="Pago Acueducto">Pago Acueducto</option>
                            <option value="Pago Gas">Pago Gas</option>
                            <option value="Pago Administracion">Pago Administración</option>
                            <option value="Reparacion">Reparacion</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted">VALOR PAGADO</label>
                        <input 
                            type="number" 
                            className="form-control fw-bold border-danger text-danger" 
                            value={valorConcepto} 
                            onChange={e => setValorConcepto(e.target.value)} 
                            required 
                        />
                    </div>
                </div>

                {/* SECCIÓN 2: Soporte de Pago */}
                <h6 className="text-info border-bottom pb-2 mb-3 fw-bold">Soportes y Referencias</h6>
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">NÚMERO DE FACTURA</label>
                        <input className="form-control" value={numeroFactura} onChange={e => setNumeroFactura(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">NRO. COMPROBANTE / PAGO</label>
                        <input className="form-control" value={numeroPago} onChange={e => setNumeroPago(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">FECHA DE EJECUCIÓN</label>
                        <input
                            type="date"
                            className="form-control"
                            value={fechaPago}
                            onChange={(e) => setFechaPago(e.target.value)}
                        />
                    </div>
                </div>

                {/* SECCIÓN 3: Detalles Adicionales */}
                <div className="row g-3 mb-4">
                    <div className="col-md-12">
                        <label className="small fw-bold text-muted">OBSERVACIONES INTERNAS</label>
                        <textarea 
                            className="form-control" 
                            rows="2"
                            value={observaciones} 
                            onChange={e => setObservaciones(e.target.value)}
                            placeholder="..."
                        ></textarea>
                    </div>
                </div>

                <div className="d-flex justify-content-end pt-3 border-top">
                    <button type="submit" className="btn btn-danger btn-lg px-5 fw-bold shadow-sm">
                        <i className="bi bi-cash-stack me-2"></i>REGISTRAR EGRESO
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EgresosClientesForm;