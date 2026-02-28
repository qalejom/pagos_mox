
import React, { useState } from 'react';


const InmueblesForm = () => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('0');
    const [habilitarInput, setHabilitarInput] = useState(false);
    const [buscar, setBuscar] = useState('');
    const [tercero, setTercero] = useState({
        nombre: ""
    });
    //const [nombreTercero, setNombreTercero] = useState('');
    const [canon, setCanon] = useState('');
    const [diaPago, setDiaPago] = useState('1');
    const [direccion, setDireccion] = useState('');
    const [porcentajeInmo, setPorcentaje] = useState('');
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

    const buscarTercero = async () => {
        try {
            const response = await fetch(`http://localhost:8090/api/terceros/buscar?valor=${buscar}`);
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            console.log(data);
            setTercero(data);
            setIdTercero(tercero.id);
        } catch (err) {
            setTercero(null);
            alert(err.message);
        }
    };

    // Detectar ENTER
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita que se envíe el formulario si está dentro de uno
            buscarTercero();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tercero = { id }
        const inmueble = {canon, diaPago, direccion, refPagoAdmin, valorPagoAdmin
             , plataformaPagoAdmin, refEnergia, porcentajeInmo, tercero, deposito,valorDeposito, plataformaPagoEnergia
            , refAgua, plataformaPagoAgua, refGas, plataformaPagoGas,estado}
        console.log(inmueble)
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
    }

    const handleSelectChange = (e) => {
        const valor = e.target.value;
        setOpcionSeleccionada(valor);
        setDeposito(valor);
        setHabilitarInput(valor !== '1' && valor !== '0');
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <h3 className="mb-3">Inmuebles</h3>
            <div className="row">
                <div className="col">
                    <label>N° Documento Propietario</label>
                    <input className="form-control mb-2" onChange={(e) => setBuscar(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
                <div className="col">
                    <label>Nombre Propietario</label>
                    <input className="form-control mb-2" value={tercero?.nombre ?? ""} disabled={true} />
                </div>
                <div className="col">
                    <label>Dirección Inmueble</label>
                    <input className="form-control mb-2" value={direccion} onChange={e => setDireccion(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Dia de pago</label>
                    <select className="form-select mb-2" value ={diaPago} onChange={e => setDiaPago(e.target.value)} >
                        {Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label>Porcentaje Inmobiliaria</label>
                    <input value={porcentajeInmo} onChange={e => setPorcentaje(e.target.value)} className="form-control mb-2" />
                </div>
                <div className="col">
                    <label>Canon</label>
                    <input value={canon} onChange={e => setCanon(e.target.value)} className="form-control mb-2" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Depósito</label>
                    <select className="form-select mb-2" placeholder="Estado" value={deposito} onChange={handleSelectChange}>
                        <option value="Sin depósito">Sin depósito</option>
                        <option value="Con depósito">Con depósito</option>
                    </select>
                </div>
                <div className="col">
                    <label>Valor Depósito</label>
                    <input className="form-control mb-2" value={valorDeposito} onChange={e => setValorDeposito(e.target.value)} disabled={!habilitarInput} />
                </div>
                <div className="col">
                    <label>Estado</label>
                        <select className="form-select mb-2" placeholder="Estado" value={estado} onChange={e => setEstado(e.target.value)}>
                        <option value="A">A</option>
                        <option value="I">I</option>
                    </select>               
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Referencia Admon Conjunto</label>
                    <input className="form-control mb-2" value={refPagoAdmin} onChange={e => setRefPagoAdmin(e.target.value)} />
                </div>
                <div className="col">
                    <label>Valor</label>
                    <input className="form-control mb-2" value={valorPagoAdmin} onChange={e => setValorPagoAdmin(e.target.value)}/>
                </div>
                <div className="col">
                    <label>Plataforma de pago</label>
                    <input className="form-control mb-2" value={plataformaPagoAdmin} onChange={e => setPlataformaPagoAdmin(e.target.value)}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Referencia Energia</label>
                    <input className="form-control mb-2" value={refEnergia} onChange={e => setRefEnergia(e.target.value)} />
                </div>
                <div className="col">
                    <label>Plataforma de pago</label>
                    <input className="form-control mb-2" value={plataformaPagoEnergia} onChange={e => setPlataformaEnergia(e.target.value)}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Referencia Agua</label>
                    <input className="form-control mb-2" value={refAgua} onChange={e => setRefAgua(e.target.value)}/>
                </div>
                <div className="col">
                    <label>Plataforma de pago</label>
                    <input className="form-control mb-2" value={plataformaPagoAgua} onChange={e => setPlataformaPagoAgua(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Referencia gas</label>
                    <input className="form-control mb-2" value={refGas} onChange={e => setRefPGas(e.target.value)}/>
                </div>
                <div className="col">
                    <label>Plataforma de pago</label>
                    <input className="form-control mb-2" value={plataformaPagoGas} onChange={e => setPlataformaPagoGas(e.target.value)}/>
                </div>
            </div>
            <button className="btn btn-info text-white">Grabar</button>
        </form>

    );
}

export default InmueblesForm;