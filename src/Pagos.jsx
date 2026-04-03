import { useState, useEffect } from "react";

const PagosForm = () => {
    // --- Utilidades ---
    const getLocalDate = (onlyMonth = false) => {
        const ahora = new Date();
        const offset = ahora.getTimezoneOffset() * 60000;
        const localISO = new Date(ahora - offset).toISOString();
        return onlyMonth ? localISO.substring(0, 7) : localISO.substring(0, 10);
    };

    const formatearMoneda = (v) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency', currency: 'COP', minimumFractionDigits: 0
        }).format(v || 0);
    };

    const desformatearMoneda = (valor) => {
        const soloNumeros = valor.replace(/\D/g, "");
        return soloNumeros ? parseInt(soloNumeros, 10) : 0;
    };

    // --- Estados ---
    const [propietarios, setPropietarios] = useState([]);
    const [inmuebles, setInmuebles] = useState([]);
    const [listaBatch, setListaBatch] = useState([]);

    const [idPropietario, setIdPropietario] = useState("");
    const [id, setIdInmueble] = useState(0);
    const [mesPago, setFechaMes] = useState(getLocalDate(true));

    // Estados de Liquidación
    const [valor, setValorArrendamiento] = useState(0);
    const [dias, setDias] = useState(0);
    const [valorDeposito, setValorDeposito] = useState(0);
    const [porcentajeInmo, setPorcentaje] = useState(0);
    const [valorPlus, setValorPlus] = useState(0); // <--- ESTE ES EL QUE RESETEAREMOS

    const [egresos, setEgresos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);

    const [formaPago, setFormaPago] = useState("");
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [observaciones, setObservaciones] = useState(".");
    const [numeroAprobacion, setNumeroAprobacion] = useState("");

    // --- Lógica de Limpieza ---
    const limpiarTodoAlCambiarDuenio = () => {
        setInmuebles([]);
        setListaBatch([]);
        resetLiquidacionSoloInmueble();
    };

    const resetLiquidacionSoloInmueble = () => {
        setValorArrendamiento(0);
        setPorcentaje(0);
        setValorPlus(0); // Reset del Plus
        setFormaPago("");
        setNumeroCuenta("");
        setEgresos([]);
        setSeleccionados([]);
        setObservaciones(".");
        setDias(0);
        setValorDeposito(0);
    };

    // --- Efectos ---
    useEffect(() => {
        fetch("http://localhost:8090/api/terceros/propietarios")
            .then(res => res.json()).then(data => setPropietarios(data));
    }, []);

    useEffect(() => {
        limpiarTodoAlCambiarDuenio();
        if (mesPago && idPropietario) {
            fetch(`http://localhost:8090/api/inmuebles/sin-pago-arrendador?mesPago=${mesPago}&propietarioId=${idPropietario}`)
                .then(res => res.json())
                .then(data => setInmuebles(data));
        }
        setIdInmueble(0);
    }, [idPropietario, mesPago]);

    useEffect(() => {
        const inm = inmuebles.find(i => String(i.id) === String(id));

        if (inm) {
            setValorArrendamiento(inm.canon || 0);
            setPorcentaje(inm.porcentajInmo || 0);
            setFormaPago(inm.tercero?.formaPago || "N/A");
            setNumeroCuenta(inm.tercero?.numeroCuenta || "N/A");
            setValorDeposito(Number(inm.deposito) || 0);

            fetch(`http://localhost:8090/api/egresosclientes/traer-por-id/${id}`)
                .then(res => res.json())
                .then(data => {
                    let lista = Array.isArray(data) ? data : [data].filter(Boolean);
                    let iniciales = [];
                    
                    // Lógica del Seguro Plus
                    if (inm.esPlus) {
                        const vPlus = (inm.canon * 0.02);
                        setValorPlus(vPlus);
                        lista = [{ id: "PLUS-" + id, conceptoPago: "Cobro Inmueble Plus (2%)", valor_concepto: vPlus }, ...lista];
                        iniciales.push("PLUS-" + id);
                    } else {
                        setValorPlus(0); // Si el inmueble NO es plus, nos aseguramos que sea 0
                    }
                    setEgresos(lista);
                    setSeleccionados(iniciales);
                });
        } else {
            resetLiquidacionSoloInmueble();
        }
    }, [id, inmuebles]);

    // --- Cálculos de Liquidación ---
    const vCanon = Number(valor) || 0;
    const vDias = (vCanon / 30) * (Number(dias) || 0);
    const vBruto = vCanon + vDias;
    const vEgresosTabla = egresos
        .filter(e => seleccionados.includes(e.id))
        .reduce((acc, curr) => acc + (Number(curr.valor_concepto) || 0), 0);
    
    const vComision = vBruto * (Number(porcentajeInmo) || 0) / 100;
    
    // El total de deducciones incluye Egresos + Comisión (El plus ya está en los egresos de la tabla)
    const vTotalDeducciones = vEgresosTabla + vComision;
    const vNeto = (vBruto + (Number(valorDeposito) || 0)) - vTotalDeducciones;

    const yaEstaEnLote = listaBatch.some(item => String(item.inmuebleId) === String(id));

    // --- AGREGAR AL LOTE (PASO CRÍTICO) ---
    const añadirALote = () => {
        if (!id || yaEstaEnLote) return;
        const inmuebleActual = inmuebles.find(i => String(i.id) === String(id));

        const desglose = [
            { concepto: `Comisión Administración (${porcentajeInmo}%)`, valor: vComision },
            ...egresos.filter(e => seleccionados.includes(e.id)).map(e => ({ 
                id: e.id, 
                concepto: e.conceptoPago, 
                valor: e.valor_concepto 
            }))
        ];

        setListaBatch([...listaBatch, {
            pago: {
                fechaPago: getLocalDate(), 
                mesPago, 
                valor: vCanon, 
                dias: dias, 
                valorDia: vDias, 
                porcentajeInmo,
                valorInmo: vComision, 
                valorArrendador: vNeto, 
                observaciones, 
                valorDeposito, 
                valorEgresos: vTotalDeducciones,
                formaPago, 
                numeroCuenta, 
                valorPlus, // <--- Guardamos el valor actual
                inmueble: { id }, 
                desgloseEgresos: desglose
            },
            direccion: inmuebleActual?.direccion,
            inmuebleId: id
        }]);

        // RESETEAMOS TODO para el siguiente inmueble
        setIdInmueble(0);
        resetLiquidacionSoloInmueble();
    };

    const finalizarLiquidacion = async () => {
        if (!numeroAprobacion || numeroAprobacion === ".") {
            alert("Por favor ingrese el número de aprobación bancaria.");
            return;
        }

        const datosContrato = {
            propietarioId: idPropietario,
            mesPago: mesPago,
            numeroAprobacion: numeroAprobacion,
            detalleInmuebles: listaBatch.map(item => ({
                inmuebleId: item.inmuebleId,
                // Extraemos solo IDs numéricos de egresos (excluimos el virtual "PLUS-")
                egresosIds: item.pago.desgloseEgresos
                    .filter(d => typeof d.id === 'number')
                    .map(d => d.id),
                pago: item.pago
            }))
        };

        try {
            const response = await fetch('http://localhost:8090/api/pagos-arrendador/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosContrato)
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');

                const idsPagados = listaBatch.map(item => String(item.inmuebleId));
                setInmuebles(prev => prev.filter(inm => !idsPagados.includes(String(inm.id))));
                setListaBatch([]);
                setNumeroAprobacion("");
                alert("Liquidación procesada correctamente");
            } else {
                alert("Error en el servidor");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="card shadow-sm border-0">
            {/* ... Tu JSX de la cabecera ... */}
            <div className="card-header bg-dark text-white py-2">
                 <h5 className="mb-0 small fw-bold text-uppercase">Liquidación a Propietarios</h5>
            </div>

            <div className="card-body p-4">
                {/* SECCIÓN 1: Filtros */}
                <div className="row g-3 mb-4 bg-light p-3 rounded border">
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted">PERIODO</label>
                        <input type="month" className="form-control border-primary" value={mesPago} onChange={e => setFechaMes(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label className="small fw-bold text-muted">PROPIETARIO</label>
                        <select className="form-select border-primary" value={idPropietario} onChange={e => setIdPropietario(e.target.value)}>
                            <option value="">Seleccione...</option>
                            {propietarios.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                        </select>
                    </div>
                    <div className="col-md-5">
                        <label className="small fw-bold text-muted">INMUEBLE</label>
                        <select className="form-select border-primary" value={id} onChange={e => setIdInmueble(e.target.value)}>
                            <option value="0">Seleccione dirección...</option>
                            {inmuebles.map(i => <option key={i.id} value={i.id}>{i.direccion}</option>)}
                        </select>
                    </div>
                </div>

                {/* SECCIÓN 2: Panel Individual */}
                <div className={`p-3 border rounded mb-4 shadow-sm ${id === 0 ? 'bg-light opacity-50' : 'bg-white border-info'}`}>
                    <div className="row g-2 align-items-center mb-3">
                        <div className="col-md-2">
                            <label className="small fw-bold text-muted text-uppercase">Canon</label>
                            <div className="form-control bg-light fw-bold">{formatearMoneda(vCanon)}</div>
                        </div>
                        <div className="col-md-1">
                            <label className="small fw-bold text-muted text-uppercase">Días</label>
                            <input type="number" className="form-control border-info" value={dias} onChange={e => setDias(e.target.value)} disabled={id === 0} />
                        </div>
                        <div className="col-md-3">
                            <label className="small fw-bold text-success">DEPÓSITO (+)</label>
                            <input type="text" className="form-control border-success fw-bold text-success" value={valorDeposito > 0 ? formatearMoneda(valorDeposito) : ""} onChange={e => setValorDeposito(desformatearMoneda(e.target.value))} disabled={id === 0} />
                        </div>
                        <div className="col-md-3">
                            <label className="small fw-bold text-danger text-uppercase">Deducciones</label>
                            <div className="form-control bg-light text-danger fw-bold">-{formatearMoneda(vTotalDeducciones)}</div>
                        </div>
                        <div className="col-md-3 text-end">
                            <label className="small fw-bold text-primary text-uppercase">Neto a Pagar</label>
                            <div className="h4 fw-bold text-primary mb-0">{formatearMoneda(vNeto)}</div>
                        </div>
                    </div>

                    <div className="table-responsive border rounded mb-3 bg-white" style={{ maxHeight: '200px' }}>
                        <table className="table table-sm table-hover mb-0">
                            <thead className="table-secondary small">
                                <tr>
                                    <th width="40" className="text-center">√</th>
                                    <th>Concepto</th>
                                    <th className="text-end pe-3">Valor</th>
                                </tr>
                            </thead>
                            <tbody className="small">
                                {egresos.map(e => (
                                    <tr key={e.id}>
                                        <td className="text-center">
                                            <input type="checkbox" className="form-check-input" checked={seleccionados.includes(e.id)} onChange={() => setSeleccionados(prev => prev.includes(e.id) ? prev.filter(i => i !== e.id) : [...prev, e.id])} />
                                        </td>
                                        <td>{e.conceptoPago}</td>
                                        <td className="text-end pe-3 text-danger fw-bold">{formatearMoneda(e.valor_concepto || e.valor)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row g-2 align-items-end">
                        <div className="col-md-9">
                            <label className="small fw-bold text-muted">OBSERVACIONES</label>
                            <input className="form-control border-info" value={observaciones} onChange={e => setObservaciones(e.target.value)} disabled={id === 0} />
                        </div>
                        <div className="col-md-3">
                            <button className={`btn w-100 fw-bold ${yaEstaEnLote ? 'btn-secondary' : 'btn-info text-white'}`} onClick={añadirALote} disabled={id === 0 || yaEstaEnLote}>
                                {yaEstaEnLote ? "EN COLA" : "+ AGREGAR"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 3: Resumen Batch */}
                <div className="card border-dark shadow-sm">
                    {/* ... Resto de tu tabla de resumen (listaBatch.map) ... */}
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-2">
                        <span className="fw-bold small">RESUMEN DE PAGO</span>
                        {listaBatch.length > 0 && (
                            <div className="badge bg-light text-dark">{listaBatch[0].pago.formaPago}: {listaBatch[0].pago.numeroCuenta}</div>
                        )}
                    </div>
                    <div className="table-responsive">
                         <table className="table table-sm mb-0">
                            <tbody>
                                {listaBatch.map((item, idx) => (
                                    <tr key={idx} className="small">
                                        <td className="ps-3">{item.direccion}</td>
                                        <td className="text-end pe-4 fw-bold">{formatearMoneda(item.pago.valorArrendador)}</td>
                                        <td width="40">
                                            <button className="btn btn-sm text-danger" onClick={() => setListaBatch(listaBatch.filter((_, i) => i !== idx))}><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                         </table>
                    </div>
                    <div className="card-footer bg-white p-3">
                        <div className="row align-items-end g-3">
                            <div className="col-md-4">
                                <label className="small fw-bold text-muted">COMPROBANTE</label>
                                <input className="form-control border-success" placeholder="Aprobación" value={numeroAprobacion} onChange={e => setNumeroAprobacion(e.target.value)} />
                            </div>
                            <div className="col-md-8">
                                <button className="btn btn-success w-100 fw-bold" disabled={listaBatch.length === 0} onClick={finalizarLiquidacion}>
                                    FINALIZAR LIQUIDACIÓN (PDF)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagosForm;