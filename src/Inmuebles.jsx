
import React, { useState } from 'react';


const InmueblesForm = () => {

    const [buscar, setBuscar] = useState('');
    const [tercero, setTercero] = useState('');
    const [canon, setCanon] = useState('');
    const [diaPago, setDiaPago] = useState('');
    const [direccion, setDireccion] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
    const [id, setIdTercero] = useState('');


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
        const inmueble = { canon, diaPago, direccion, porcentaje, tercero }
        console.log(inmueble)
        const response = await fetch('http://localhost:8090/api/inmuebles/crear', {
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

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <h3 className="mb-3">Inmuebles</h3>
            <div className="row">
                <div className="col">
                    <input className="form-control mb-2" placeholder="ID Propietario" onChange={(e) => setBuscar(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
                <div className="col">
                    <input className="form-control mb-2" placeholder="Nombre" value={tercero.nombre} />
                </div>
                <div className="col">
                    <input value={direccion} onChange={e => setDireccion(e.target.value)} className="form-control mb-2" placeholder="Direccion Inmueble" />
                </div>

            </div>
            <div className="row">
                <div className="col">
                    <input value={diaPago} onChange={e => setDiaPago(e.target.value)} className="form-control mb-2" placeholder="Dia de pago" />
                </div>
                <div className="col">
                    <input value={porcentaje} onChange={e => setPorcentaje(e.target.value)} className="form-control mb-2" placeholder="%" />
                </div>
                <div className="col">
                    <input value={canon} onChange={e => setCanon(e.target.value)} className="form-control mb-2" placeholder="Canon" />
                </div>
            </div>
            <button className="btn btn-info text-white">Grabar</button>
        </form>

    );
}

export default InmueblesForm;