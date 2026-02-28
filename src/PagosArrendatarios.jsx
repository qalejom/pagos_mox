

import { useState, useEffect } from "react";

const PagosForm = () => {
    const [inmuebles, setInmuebles] = useState([]);
    const [id, setIdInmueble] = useState(0);
    const [fechaPago, setFechaPago] = useState(new Date().toISOString().substring(0, 10));
    const [mesPago, setFechaMes] = useState(new Date().toISOString().substring(0, 7));
    const [valor, setValorArrendamiento] = useState("");
    const [observaciones, setObservaciones] = useState(".");
    //const pagoArrendador = 'P';

    useEffect(() => {
        if (!mesPago) {
            setInmuebles([]);
            setIdInmueble(0);
            setValorArrendamiento("");
            return;
        }
        console.log(mesPago)
        fetch('http://localhost:8090/api/inmuebles/sin-pago-arrendatario?mesPago=' + mesPago)
            .then(res => res.json())
            .then(data => setInmuebles(data))
            .catch(err => console.error("Error cargando inmuebles:", err));
    }, [mesPago]);

    useEffect(() => {
        const inmuebleSeleccionado = inmuebles.find(
            i => String(i.id) === String(id)
        );

        setValorArrendamiento(
            inmuebleSeleccionado?.canon ?? ""
        );

    }, [id, inmuebles]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inmueble = { id }
        const pagosArrendatarios = { inmueble, mesPago, valor, fechaPago, observaciones}// pagoArrendador }
        console.log(JSON.stringify(pagosArrendatarios))
        const response = await fetch('http://localhost:8090/api/pagosarrendatarios/nuevo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pagosArrendatarios),
        });

        if (response.ok) {
            alert('Pago guardado');
            window.location.reload();
        } else {
            alert('Error al guardar');
        }
    }
    
    return (
        <form className="card card-body" onSubmit={handleSubmit} >
            <h3 className="mb-3">Pagos Arrendatarios</h3>
            <div class="row">

                <div className="col">
                    <label>Mes pago</label>
                    <input
                        type="month"
                        className="form-control mb-2"
                        value={mesPago}
                        onChange={e => setFechaMes(e.target.value)}
                    />
                </div>

                <div class="col">
                    <label>Inmueble</label>
                    <select
                        className="form-select"
                        value={id}
                        onChange={e => setIdInmueble(e.target.value)}
                    >
                        <option value="">Seleccione un inmueble</option>
                        {inmuebles.map(i => (
                            <option key={i.id} value={i.id}>
                                {i.direccion}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="col">
                    <label>Valor Total</label>
                    <input className="form-control mb-2"
                        value={valor}
                        onChange={(e) => setValorArrendamiento(e.target.value)}
                    />
                </div>
                <div className="col">
                    <label>Fecha pago</label>
                    <input
                        type="date"
                        className="form-control mb-2"
                        value={fechaPago}
                        onChange={(e) => setFechaPago(e.target.value)}
                        disabled={true}
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Observaciones</label>
                    <input className="form-control mb-2"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-info text-white">Grabar</button>
        </form>
    )
}

export default PagosForm;