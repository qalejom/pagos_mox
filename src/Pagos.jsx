const PagosForm = () => (
    <form className="card card-body">
        <h3 className="mb-3">Pagos</h3>
        <div class="row">
            <div class="col">
                <input className="form-control mb-2" placeholder="Inmueble" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Canon" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Fecha" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input className="form-control mb-2" placeholder="Dias" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Valor Dia" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Deposito" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input className="form-control mb-2" placeholder="Admin Conjunto" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="%" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Admin Inmobiliaria" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input className="form-control mb-2" placeholder="Egreso 1" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Concepto" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Egreso 2" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Concepto" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Egreso 3" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Concepto" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input className="form-control mb-2" placeholder="Agua" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Energia" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Gas" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Telefonia/Internet" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input className="form-control mb-2" placeholder="Observaciones" />
            </div>
            <div class="col">
                <input className="form-control mb-2" placeholder="Valor Total" />
            </div>
        </div>
        <button className="btn btn-info text-white">Grabar</button>
    </form>

);

export default PagosForm;