import { useState, useEffect } from "react";

const PagosForm = () => {
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
    const [mesPago, setFechaMes] = useState(getLocalDate(true));
    const [valor, setValorArrendamiento] = useState(0);
    const [observaciones, setObservaciones] = useState(".");
    const pagoArrendador = 'P';

    // Efecto 1: Cargar inmuebles pendientes de pago según el mes
    useEffect(() => {
        if (!mesPago) {
            setInmuebles([]);
            setIdInmueble(0);
            setValorArrendamiento("");
            return;
        }
        fetch('http://localhost:8090/api/inmuebles/sin-pago-arrendatario?mesPago=' + mesPago)
            .then(res => res.json())
            .then(data => setInmuebles(data))
            .catch(err => console.error("Error cargando inmuebles:", err));
    }, [mesPago]);

    // Efecto 2: Cargar el canon del inmueble seleccionado
    useEffect(() => {
        const inmuebleSeleccionado = inmuebles.find(
            i => String(i.id) === String(id)
        );
        setValorArrendamiento(inmuebleSeleccionado?.canon ?? "");
    }, [id, inmuebles]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inmueble = { id };
        const pagosArrendatarios = { inmueble, mesPago, valor, fechaPago, observaciones, pagoArrendador };
        
        const response = await fetch('http://localhost:8090/api/pagosarrendatarios/nuevo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pagosArrendatarios),
        });

        if (response.ok) {
            alert('Pago registrado correctamente');
            window.location.reload();
        } else {
            alert('Error al guardar el pago');
        }
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white py-2">
                <h5 className="mb-0 small fw-bold text-uppercase">Recaudo de Arrendamientos</h5>
            </div>

            <form className="card-body p-4" onSubmit={handleSubmit}>
                
                <h6 className="text-info border-bottom pb-2 mb-3 fw-bold">Detalles del Recaudo</h6>
                
                <div className="row g-3 mb-4">
                    {/* Mes de Pago - Importante para el filtro */}
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted">PERIODO A PAGAR</label>
                        <input
                            type="month"
                            className="form-control border-primary"
                            value={mesPago}
                            onChange={e => setFechaMes(e.target.value)}
                        />
                    </div>

                    {/* Selección de Inmueble */}
                    <div className="col-md-5">
                        <label className="small fw-bold text-muted">INMUEBLE (PENDIENTES)</label>
                        <select
                            className="form-select border-primary"
                            value={id}
                            onChange={e => setIdInmueble(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un inmueble...</option>
                            {inmuebles.map(i => (
                                <option key={i.id} value={i.id}>
                                    {i.direccion}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Valor Arrendamiento */}
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">VALOR TOTAL RECIBIDO</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light text-success fw-bold">$</span>
                            <input 
                                className="form-control fw-bold text-success fs-5"
                                value={valor}
                                onChange={(e) => setValorArrendamiento(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="row g-3 mb-4">
                    {/* Fecha de registro (hoy) */}
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted">FECHA DE REGISTRO</label>
                        <input
                            type="date"
                            className="form-control bg-light"
                            value={fechaPago}
                            disabled={true}
                        />
                    </div>

                    {/* Observaciones */}
                    <div className="col-md-9">
                        <label className="small fw-bold text-muted">OBSERVACIONES DEL PAGO</label>
                        <input 
                            className="form-control"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            placeholder="Ej: Pago por transferencia, abono parcial, etc."
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end border-top pt-3">
                    <button type="submit" className="btn btn-success btn-lg px-5 fw-bold shadow-sm">
                        <i className="bi bi-check-circle me-2"></i>GRABAR PAGO
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PagosForm;

