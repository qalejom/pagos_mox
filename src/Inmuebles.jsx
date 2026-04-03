
import React, { useState } from 'react';

const InmueblesForm = () => {
    // --- ESTADOS ORIGINALES (Manteniendo tus nombres exactos) ---
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('0');
    const [habilitarInput, setHabilitarInput] = useState(false);
    const [buscar, setBuscar] = useState('');
    const [tercero, setTercero] = useState({ nombre: "" });
    const [canon, setCanon] = useState('');
    const [diaPago, setDiaPago] = useState('1');
    const [direccion, setDireccion] = useState('');
    const [porcentajeInmo, setPorcentaje] = useState(10);
    const [id, setIdTercero] = useState('');
    const [deposito, setDeposito] = useState('Sin depósito');
    const [valorDeposito, setValorDeposito] = useState('0');
    const [refPagoAdmin, setRefPagoAdmin] = useState('.');
    const [valorPagoAdmin, setValorPagoAdmin] = useState('0');
    const [plataformaPagoAdmin, setPlataformaPagoAdmin] = useState('.');
    const [refEnergia, setRefEnergia] = useState('.');
    const [plataformaPagoEnergia, setPlataformaEnergia] = useState('.');
    const [refAgua, setRefAgua] = useState('.');
    const [plataformaPagoAgua, setPlataformaPagoAgua] = useState('.');
    const [refGas, setRefPGas] = useState('.');
    const [plataformaPagoGas, setPlataformaPagoGas] = useState('.');
    const [estado, setEstado] = useState('A');
    const [fechaContratoActual, setFechaContrato] = useState("");
    const [duracion, setduracionContrato] = useState(6);
    const [esPlus, setInmueblePlus] = useState(false);

    // --- LÓGICA ORIGINAL ---
    const buscarTercero = async () => {
        try {
            const response = await fetch(`http://localhost:8090/api/terceros/buscar?valor=${buscar}`);
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            setTercero(data);
            setIdTercero(data.id); // Corregido para usar data.id directamente
        } catch (err) {
            setTercero(null);
            alert(err.message);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarTercero();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const terceroObj = { id }; // Mantenemos el nombre de la constante interna para no chocar
        const inmueble = {
            canon, diaPago, direccion, refPagoAdmin, valorPagoAdmin,
            plataformaPagoAdmin, refEnergia, porcentajeInmo, tercero: terceroObj,
            deposito, valorDeposito, plataformaPagoEnergia, esPlus,
            refAgua, plataformaPagoAgua, refGas, plataformaPagoGas,
            estado, fechaContratoActual, duracion
        };

        const response = await fetch('http://localhost:8090/api/inmuebles/nuevo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inmueble),
        });

        if (response.ok) {
            alert('Inmueble guardado');
        } else {
            alert('Error al guardar');
        }
    };

    const handleSelectChange = (e) => {
        const valor = e.target.value;
        setOpcionSeleccionada(valor);
        setDeposito(valor);
        setHabilitarInput(valor === 'Con depósito');
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white py-2">
                <h5 className="mb-0 small fw-bold text-uppercase">Registro de Nuevo Inmueble</h5>
            </div>

            <form className="card-body p-4" onSubmit={handleSubmit}>
                
                {/* SECCIÓN 1: Propietario */}
                <div className="row g-3 mb-4 align-items-end">
                    <div className="col-md-4">
                        <label className="small fw-bold text-primary">BUSCAR PROPIETARIO (NIT/CC)</label>
                        <div className="input-group">
                            <input className="form-control border-primary" placeholder="Presione Enter..." onChange={(e) => setBuscar(e.target.value)} onKeyDown={handleKeyDown} />
                            <button className="btn btn-primary" type="button" onClick={buscarTercero}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <label className="small fw-bold text-muted">NOMBRE DEL DUEÑO</label>
                        <input className="form-control bg-light fw-bold text-dark" value={tercero?.nombre ?? ""} disabled={true} />
                    </div>
                </div>

                {/* SECCIÓN 2: Información del Contrato e Inmueble */}
                <h6 className="text-info border-bottom pb-2 mb-3 fw-bold">Detalles del Inmueble y Contrato</h6>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted text-uppercase">Dirección</label>
                        <input className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} required />
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted text-uppercase">Canon</label>
                        <input className="form-control fw-bold border-success" type="number" value={canon} onChange={e => setCanon(e.target.value)} required />
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted text-uppercase">% Comisión</label>
                        <input className="form-control border-info" type="number" value={porcentajeInmo} onChange={e => setPorcentaje(e.target.value)} />
                    </div>
                </div>

                <div className="row g-3 mb-4">
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted text-uppercase">Fecha Inicio</label>
                        <input type="date" className="form-control" value={fechaContratoActual} onChange={(e) => setFechaContrato(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted text-uppercase">Duración (Meses)</label>
                        <select className="form-select" value={duracion} onChange={e => setduracionContrato(e.target.value)}>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted text-uppercase">Día de Pago</label>
                        <select className="form-select" value={diaPago} onChange={e => setDiaPago(e.target.value)}>
                            {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-muted text-uppercase">Estado</label>
                        <select className="form-select fw-bold" value={estado} onChange={e => setEstado(e.target.value)}>
                            <option value="A">ACTIVO (A)</option>
                            <option value="I">INACTIVO (I)</option>
                        </select>
                    </div>
                </div>

                {/* SECCIÓN 3: Depósitos y Plus */}
                <div className="row g-3 mb-4 p-3 bg-light rounded border border-info">
                    <div className="col-md-3">
                        <label className="small fw-bold text-dark">DEPÓSITO</label>
                        <select className="form-select" value={deposito} onChange={handleSelectChange}>
                            <option value="Sin depósito">Sin depósito</option>
                            <option value="Con depósito">Con depósito</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="small fw-bold text-dark">VALOR DEPÓSITO</label>
                        <input className="form-control" value={valorDeposito} onChange={e => setValorDeposito(e.target.value)} disabled={!habilitarInput} />
                    </div>
                    <div className="col-md-6 d-flex align-items-end ps-4">
                        <div className="form-check form-switch mb-2">
                            <input className="form-check-input" type="checkbox" id="checkPlus" checked={esPlus} onChange={e => setInmueblePlus(e.target.checked)} />
                            <label className="form-check-label fw-bold text-primary" htmlFor="checkPlus">¿ES INMUEBLE PLUS? (Aplica 2% extra)</label>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 4: Servicios Públicos y Administración */}
                <h6 className="text-secondary border-bottom pb-2 mb-3 fw-bold">Referencias de Pago y Servicios</h6>
                
                {/* Administración */}
                <div className="row g-3 mb-2">
                    <div className="col-md-4"><label className="small text-muted fw-bold">REF. ADMINISTRACIÓN</label><input className="form-control form-control-sm" value={refPagoAdmin} onChange={e => setRefPagoAdmin(e.target.value)} /></div>
                    <div className="col-md-4"><label className="small text-muted fw-bold">VALOR ADMIN</label><input className="form-control form-control-sm" value={valorPagoAdmin} onChange={e => setValorPagoAdmin(e.target.value)} /></div>
                    <div className="col-md-4"><label className="small text-muted fw-bold">PLATAFORMA</label><input className="form-control form-control-sm" value={plataformaPagoAdmin} onChange={e => setPlataformaPagoAdmin(e.target.value)} /></div>
                </div>

                {/* Otros Servicios */}
                <div className="row g-3 mb-2">
                    <div className="col-md-6"><label className="small text-muted fw-bold">REF. ENERGÍA</label><input className="form-control form-control-sm" value={refEnergia} onChange={e => setRefEnergia(e.target.value)} /></div>
                    <div className="col-md-6"><label className="small text-muted fw-bold">PLATAFORMA ENERGÍA</label><input className="form-control form-control-sm" value={plataformaPagoEnergia} onChange={e => setPlataformaEnergia(e.target.value)} /></div>
                </div>

                <div className="row g-3 mb-2">
                    <div className="col-md-6"><label className="small text-muted fw-bold">REF. AGUA</label><input className="form-control form-control-sm" value={refAgua} onChange={e => setRefAgua(e.target.value)} /></div>
                    <div className="col-md-6"><label className="small text-muted fw-bold">PLATAFORMA AGUA</label><input className="form-control form-control-sm" value={plataformaPagoAgua} onChange={e => setPlataformaPagoAgua(e.target.value)} /></div>
                </div>

                <div className="row g-3 mb-4">
                    <div className="col-md-6"><label className="small text-muted fw-bold">REF. GAS</label><input className="form-control form-control-sm" value={refGas} onChange={e => setRefPGas(e.target.value)} /></div>
                    <div className="col-md-6"><label className="small text-muted fw-bold">PLATAFORMA GAS</label><input className="form-control form-control-sm" value={plataformaPagoGas} onChange={e => setPlataformaPagoGas(e.target.value)} /></div>
                </div>

                <div className="d-flex justify-content-end border-top pt-3">
                    <button type="submit" className="btn btn-info btn-lg text-white fw-bold px-5 shadow-sm">
                        GRABAR INMUEBLE
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InmueblesForm;