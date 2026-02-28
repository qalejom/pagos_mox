
import { useState, useEffect } from "react";


const EgresosClientesForm = () => {
    const [inmuebles, setInmuebles] = useState([]);
    const [id, setIdInmueble] = useState(0);
    const [fechaPago, setFechaPago] = useState(new Date().toISOString().substring(0, 10));
    const [conceptoPago, setConcepto] = useState('');
    const [valorConcepto, setValorConcepto] = useState(0);
    const [numeroFactura, setNumeroFactura] = useState('.');
    const [numeroPago, setNumeroPago] = useState('.');
    const [observaciones, setObservaciones] = useState('.');

    useEffect(() => {
        fetch('http://localhost:8090/api/inmuebles/traerinmuebles')
            .then(res => res.json())
            .then(data => setInmuebles(data))
            .catch(err => console.error("Error cargando inmuebles:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inmueble = { id }
        const egresoCliente = {inmueble, conceptoPago, valorConcepto, numeroFactura, numeroPago, fechaPago
             , observaciones }
             console.log(JSON.stringify(egresoCliente))
        const response = await fetch('http://localhost:8090/api/egresosclientes/nuevo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(egresoCliente),
        });

        if (response.ok) {
            alert('Egreso guardado');
            window.location.reload();
        } else {
            alert('Error al guardar');
        }
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <h3 className="mb-3">Egresos Clientes</h3>
            <div className="row">
                <div className="col">
                    <label>Inmueble</label>
                    <select className="form-select mb-2" value={id} onChange={e => setIdInmueble(e.target.value)}>
                        <option value="">Seleccione un inmueble</option>
                        {inmuebles.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.direccion} 
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label>Concepto</label>
                    <select className="form-select mb-2" value={conceptoPago} onChange={e => setConcepto(e.target.value)}>
                        <option value="">Seleccione un Concepto</option>
                        <option value="Pago Energia">Pago Energia</option>
                        <option value="Pago Acueducto">Pago Acueducto</option>
                        <option value="Pago Gas">Pago Gas</option>
                        <option value="Pago Administracion">Pago Administracion</option>
                        <option value="Reparacion">Reparacion</option>
                    </select>
                </div>
                <div className="col">
                    <label>valor</label>
                    <input value={valorConcepto} onChange={e => setValorConcepto(e.target.value)} className="form-control mb-2" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Numero Factura</label>
                    <input value={numeroFactura} onChange={e => setNumeroFactura(e.target.value)} className="form-control mb-2" />
                </div>
                <div className="col">
                    <label>Numero pago</label>
                    <input value={numeroPago} onChange={e => setNumeroPago(e.target.value)} className="form-control mb-2" />
                </div>
                <div className="col">
                    <label>Fecha pago</label>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={fechaPago}
                        onChange={(e) => setFechaPago(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Observaciones</label>
                    <input value={observaciones} onChange={e => setObservaciones(e.target.value)} className="form-control mb-2" />
                </div>
            </div>
            <button className="btn btn-info text-white">Grabar</button>
        </form>
    );
}
export default EgresosClientesForm;