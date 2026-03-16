class Sistema {
	constructor() {
		this.clientes = new Array();
		this.paseadores = new Array();
		this.contrataciones = new Array();
		this.logueado = null;
		this.mensajeRegistro = [];
	}

	precargarTodo() {
		precargaClientes();
		precargaPaseador();
		precargaContrataciones();
		precargarProcesarContrataciones();
	}

	//#region   ##  CARGA DE DATOS  ###
	cargaUnCliente(pNom, pUsuario, pPass, pPerro, pTamanio) {
		let unCliente = new Cliente();
		unCliente.nombre = pNom;
		unCliente.usuario = pUsuario;
		unCliente.contrasenia = pPass;
		unCliente.perroNombre = pPerro;
		unCliente.tamanioPerro = pTamanio;
		this.clientes.push(unCliente);
	}

	cargaUnPaseador(pNom, pUsuario, pPass, pCupo) {
		let unPaseador = new Paseador();
		unPaseador.nombre = pNom;
		unPaseador.usuario = pUsuario;
		unPaseador.contrasenia = pPass;
		unPaseador.cupo = pCupo;
		this.paseadores.push(unPaseador);
	}

	cargaUnaContratacion(idCliente, idPaseador) {
		let unaContratacion = new Contrataciones();
		unaContratacion.Cliente = this.obtenerCliente(idCliente);
		unaContratacion.Paseador = this.obtenerPaseador(idPaseador);
		unaContratacion.estado = "pendiente";
		this.contrataciones.push(unaContratacion);
		return unaContratacion.id; // <--- Agrego Linea para que me retorno el id de la contratacion. cuando la precise
	}

	//#endregion

	// #region  ## TABLAS

	armarTablaContrataciones() {
		let hayContrataciones = false;
		let unaTabla = `<div class="table-responsive">`;
		unaTabla += `<table class="table table-bordered table-striped table-hover align-middle text-center tablaContratacionesPendientes">`;
		unaTabla += `<thead class="table-dark">`;
		unaTabla += `<tr>`;
		unaTabla += `<th>Nombre Perro</th>`;
		unaTabla += `<th>Tamaño</th>`;
		unaTabla += `<th>Acción</th>`;
		unaTabla += `<th>Comentario</th>`;
		unaTabla += `</tr>`;
		unaTabla += `</thead>`;

		unaTabla += `<tbody>`;

		for (let i = 0; i < this.contrataciones.length; i++) {
			let unaContratacion = this.contrataciones[i];
			let paseador = this.logueado;

			if (unaContratacion.Paseador === paseador && unaContratacion.estado === "pendiente") {
				unaTabla += `<tr>`;
				unaTabla += `<td>${unaContratacion.Cliente.perroNombre}</td>`;
				unaTabla += `<td>${unaContratacion.Cliente.tamanioPerro}</td>`;
				unaTabla += `<td><input type="button" data-id="contratacionID-${unaContratacion.id}" class="botonesTablaContratacionesPendiente btn btn-success btn-sm" value="Aceptar"></td>`;
				unaTabla += `<td>-</td>`;
				unaTabla += `</tr>`;
				hayContrataciones = true;
			}
		}

		if (!hayContrataciones) {
			unaTabla += `<tr>`;
			unaTabla += `<td colspan="4">No hay contrataciones pendientes</td>`;
			unaTabla += `</tr>`;
		}

		unaTabla += `</tbody>`;
		unaTabla += `</table>`;
		unaTabla += `</div>`;

		return unaTabla;
	}

	armarTablaContratacionesProcesando() {
		let unaTabla = `<div class="table-responsive">`;
		unaTabla += `<table class="table table-bordered table-striped table-hover align-middle text-center tablaContratacionesPendientes">`;
		unaTabla += `<thead class="table-dark">`;
		unaTabla += `<tr>`;
		unaTabla += `<th>Nombre Perro</th>`;
		unaTabla += `<th>Tamaño</th>`;
		unaTabla += `<th>Acción</th>`;
		unaTabla += `<th>Comentario</th>`;
		unaTabla += `</tr>`;
		unaTabla += `</thead>`;

		unaTabla += `<tbody>`;

		for (let i = 0; i < this.contrataciones.length; i++) {
			let unaContratacion = this.contrataciones[i];

			if (this.logueado !== null && unaContratacion.Paseador === this.logueado) {
				unaTabla += `<tr>`;
				unaTabla += `<td>${unaContratacion.Cliente.perroNombre}</td>`;
				unaTabla += `<td>${unaContratacion.Cliente.tamanioPerro}</td>`;

				if (unaContratacion.estado === "pendiente") {
					unaTabla += `<td>
					<input 
						type="button" 
						data-id="contratacionID-${unaContratacion.id}"  
						class="botonesTablaContratacionesPendiente btn btn-success btn-sm" 
						value="Aceptar">
				</td>`;
				} else {
					unaTabla += `<td>-</td>`;
				}

				unaTabla += `<td id="mostrarComentario-${unaContratacion.id}">${unaContratacion.comentario}</td>`;
				unaTabla += `</tr>`;
			}
		}

		unaTabla += `</tbody>`;
		unaTabla += `</table>`;
		unaTabla += `</div>`;

		return unaTabla;
	}

	armarEstadoPaseador() {
		let paseadorCupo = this.logueado.cupo;
		let cupo = paseadorCupo - this.cupoDisponible(this.logueado);
		let porcentaje = Math.round((cupo * 100) / paseadorCupo);
		let noHayContratacion = this.clienteTieneContratacionAceptada(this.logueado.id, "paseador");

		let unaTabla = `<div class="row g-4 mb-4">`;

		unaTabla += `<div class="col-md-4">
		<div class="card border-0 shadow-sm h-100 text-center">
			<div class="card-body">
				<h4 class="card-title">CUPO TOTAL</h4>
				<p class="display-6 mb-0">${this.logueado.cupo}</p>
			</div>
		</div>
	</div>`;

		unaTabla += `<div class="col-md-4">
		<div class="card border-0 shadow-sm h-100 text-center">
			<div class="card-body">
				<h4 class="card-title">CUPOS OCUPADOS</h4>
				<p class="display-6 mb-0">${cupo}</p>
			</div>
		</div>
	</div>`;

		unaTabla += `<div class="col-md-4">
		<div class="card border-0 shadow-sm h-100 text-center">
			<div class="card-body">
				<h4 class="card-title">PORCENTAJE OCUPADO</h4>
				<p class="display-6 mb-0">${porcentaje}%</p>
			</div>
		</div>
	</div>`;

		unaTabla += `</div>`;

		unaTabla += `<h2 class="mb-3">Contrataciones Activas</h2>`;
		unaTabla += `<div class="table-responsive">`;
		unaTabla += `<table class="table table-bordered table-striped table-hover align-middle text-center">`;

		unaTabla += `<thead class="table-dark">
		<tr>
			<th>Nombre</th>
			<th>Tamaño</th>
		</tr>
	</thead>`;

		unaTabla += `<tbody>`;

		if (noHayContratacion) {
			unaTabla += `<tr><td colspan="2">No hay contrataciones actuales</td></tr>`;
		} else {
			for (let i = 0; i < this.contrataciones.length; i++) {
				let unaContratacion = this.contrataciones[i];
				let paseador = this.logueado;

				if (unaContratacion.Paseador === paseador && unaContratacion.estado === "aceptada") {
					unaTabla += `<tr>`;
					unaTabla += `<td>${unaContratacion.Cliente.perroNombre}</td>`;
					unaTabla += `<td>${unaContratacion.Cliente.tamanioPerro}</td>`;
					unaTabla += `</tr>`;
					noHayContratacion = true;
				}
			}
		}

		unaTabla += `</tbody>`;
		unaTabla += `</table>`;
		unaTabla += `</div>`;

		return unaTabla;
	}

	//#endregion

	//#region  ## VALIDACION LOGIN #

	login(pUsuario, pPass) {
		let valido = false;
		let i = 0;
		while (!valido && i < this.clientes.length) {
			let clienteX = this.clientes[i];
			if (clienteX.usuario === pUsuario) {
				if (clienteX.contrasenia === pPass) {
					valido = true;
					this.logueado = clienteX;
				}
			}
			i++;
		}
		let x = 0;
		while (!valido && x < this.paseadores.length) {
			let paseadorX = this.paseadores[x];
			if (paseadorX.usuario === pUsuario) {
				if (paseadorX.contrasenia === pPass) {
					valido = true;
					this.logueado = paseadorX;
				}
			}
			x++;
		}
		//console.log(logueado);
		return valido;
	}

	//#endregion

	//#region   ## VALIDACIONES DE REGISTRO DE CLIENTES ##

	validacionRegistroCliente(nombre, usuario, contrasenia, perro, tamanio) {
		this.mensajeRegistro = []; // Pongo el array de mensajes a vacio.

		let valido = true;

		if (!this.validarNombre(nombre)) valido = false;
		if (!this.validarUsuario(usuario)) valido = false;
		if (!this.validarContrasenia(contrasenia)) valido = false;
		if (!this.validarPerro(perro)) valido = false;

		if (tamanio === "") {
			this.mensajeRegistro.push(`Debe seleccionar un <strong>tamaño</strong> para el perro<br>`);
			valido = false;
		}

		return valido;
	}

	validarNombre(pNombre) {
		let nombre = pNombre.toLowerCase().trim(); //
		let valido = true;

		if (nombre === "") {
			valido = false;
			this.mensajeRegistro.push(`<strong>Nombre:</strong> No puede estar vacio<br>`);
		}
		return valido;
	}

	validarUsuario(pUsuario) {
		let usuario = pUsuario.toLowerCase().trim(); // Convierto texto a lowercase
		let valido = true;
		let i = 0;
		if (usuario !== "") {
			while (i < this.clientes.length && valido) {
				let unicoUsuario = this.clientes[i];
				if (unicoUsuario.usuario.toLowerCase() === usuario) {
					valido = false;
					this.mensajeRegistro.push(
						`<strong>Usuario:</strong> Ya existe<br><br>
						<span class="text-primary" style="cursor:pointer;" onclick="loginInterfazUI()">
    Volver al Login?
</span>
						<br><br>
						`,
					);
				}
				i++;
			}
		} else {
			valido = false;
			this.mensajeRegistro.push(`<strong>Usuario:</strong> No puede estar vacio<br>`);
		}

		return valido;
	}

	///   NO ESTOY SEGURO SI AGREGAR  IDENTIFICAR CUANDO ES SIMBOL
	// PORQUE TOMA LOS SIMBOLOS COMO MINUSCULAS
	validarContrasenia(pass) {
		let verificacion = true;
		let mayus = 0;
		let minus = 0;
		let numero = 0;

		// Verificacion Vacio
		if (verificacion && pass.length < 5) {
			verificacion = false;
			this.mensajeRegistro.push(`<strong>Contraseña</strong> tiene que tener mínimo 5 caracteres<br>`);
		}

		// Verificacion Letras
		if (verificacion) {
			for (let x = 0; x < pass.length; x++) {
				let letra = pass.charAt(x);
				let letraMinus = pass.toLowerCase().charAt(x);
				let letraMayus = pass.toUpperCase().charAt(x);
				let encontreLetra = false;
				if (!isNaN(letra) && !encontreLetra) {
					numero++;
					encontreLetra = true;
				}
				if (letra === letraMayus && !encontreLetra) {
					mayus++;
					encontreLetra = true;
				}
				if (letra === letraMinus && !encontreLetra) {
					minus++;
					encontreLetra = true;
				}
			}
			// Verifico que mayus minus y numero  tengan por lo menos 1 character
			if (minus < 1 || mayus < 1 || numero < 1) {
				verificacion = false;
				this.mensajeRegistro.push(
					`<strong>Contraseña</strong> tiene que incluir al menos una mayúscula, una minúscula y un número<br>`,
				);
			}
		}
		return verificacion;
	}

	// Valido Nombre de Perro que sea Unico y no este vacio.
	validarPerro(nombre) {
		let validar = true;
		let x = 0;
		let perroNombre = nombre.toLowerCase().trim();

		if (nombre !== "") {
			while (x < this.clientes.length && validar) {
				let cliente = this.clientes[x];
				let perroMinus = cliente.perroNombre.toLowerCase();

				if (perroNombre === perroMinus) {
					validar = false;
					this.mensajeRegistro.push(`<strong>Nombre de Perro</strong> ya existe.<br>`);
				}

				x++;
			}
		} else {
			validar = false; // El input esta vacio
			this.mensajeRegistro.push(`<strong>Nombre de Perro</strong> no puede estar Vacio.<br>`);
		}

		return validar;
	}

	//#endregion

	//#region  ## VALIDACIONES PASEADOR ##

	validacionRegistroPaseador(nombre, usuario, contrasenia, cupo) {
		let valido = false;
		if (nombre.length > 0 && this.validarUsuario(usuario) && this.validarContrasenia(contrasenia) && cupo > 0) {
			valido = true;
		}
		return valido;
	}

	//#endregion

	//#region  ## VALIDACIONES CONTRATACIONES ##

	validarPrecargaContratacion(idCliente, idPaseador) {
		let noModificado = false;
		let elCliente = miSistema.obtenerCliente(idCliente);
		let elPaseador = miSistema.obtenerPaseador(idPaseador);

		if (elCliente !== null && elPaseador !== null) {
			let cupo = this.cupoDisponible(elPaseador);
			let noTieneContratacion = this.clienteTieneContratacion(idCliente);

			if (noTieneContratacion) {
				//console.log(`VALIDACION PRECARGA  NO TIENE CONTRATACION`);
				if (cupo >= this.calcularCupoPerro(elCliente.tamanioPerro)) {
					//console.log(`test estoy en el if si el cupo es mayor que el cupo perro`);
					if (this.paseadorComparoTamanio(elPaseador, elCliente.tamanioPerro)) {
						noModificado = true;
					} else {
					}
				} else {
				}
			} else {
			}
			if (!noModificado) {
				// si se modifico
				//laContratacion.estado = "denegada";
			}
		}

		return noModificado;
	}

	procesarAceptarContratacion(id) {
		let laContratacion = this.obtenerContratacion(id);
		let perro = this.calcularCupoPerro(laContratacion.Cliente.tamanioPerro);
		let cupo = this.cupoDisponible(laContratacion.Paseador);
		let noTieneContratacion = this.clienteTieneContratacionAceptada(laContratacion.Cliente.id, "cliente");
		let noHayPerroOpuesto = this.validoPerroOpuestoNoExiste(laContratacion.Cliente.tamanioPerro);
		let noModificado = false;

		if (noTieneContratacion && laContratacion.estado === "pendiente") {
			if (noHayPerroOpuesto) {
				if (cupo >= perro) {
					laContratacion.estado = "aceptada";
					laContratacion.comentario = "aceptada";
					noModificado = true;
				} else {
					laContratacion.comentario = `No hay Cupo disponible.`;
				}
			} else {
				let perroTamanio = laContratacion.Cliente.tamanioPerro;
				let perroOpuesto = ``;
				if (perroTamanio === "Grande") perroOpuesto = "Chico";
				if (perroTamanio === "Chico") perroOpuesto = "Grande";
				laContratacion.comentario = `Ya hay un perro <cite>${perroOpuesto}</cite>`;
			}
		} else {
			laContratacion.comentario = `Ya tiene Contratacion previa.`;
		}

		if (!noModificado) {
			laContratacion.estado = "denegada";
		}

		mostrarTablaContratacionesPendientesUI();
	}

	validoContratacionesPendientesDespuesDeAceptar(id) {
		let contratacion = this.obtenerContratacion(id); // se obtiene la contratacion
		let elPaseador = contratacion.Paseador;
		//console.log(`Paseador ID: ${elPaseador.id}`);
		let contracionesPaseador = this.obtengoPaseadorContrataciones(elPaseador.id);
		//console.log(contracionesPaseador);
		for (let x = 0; x < contracionesPaseador.length; x++) {
			let laContratacion = contracionesPaseador[x]; // se obtiene la contratacion

			let noModificado = false;
			if (laContratacion.estado === "pendiente") {
				// COMIENZO A VALIDAR PARA CADA CONTRATACION PENDIENTE..
				let perro = this.calcularCupoPerro(laContratacion.Cliente.tamanioPerro); // Tamaño

				// Resto del Cupo Total, el Cupo Ocupado.
				let cupo = this.cupoDisponible(this.logueado);

				// Busco si cliente tiene contratacion Previa.
				let noTieneContratacion = this.clienteTieneContratacionAceptada(laContratacion.Cliente.id);
				let noHayPerroOpuesto = this.validoPerroOpuestoNoExiste(laContratacion.Cliente.tamanioPerro);

				// VALIDO QUE No TENGA CONTRATACION PREVIA
				if (noTieneContratacion && laContratacion.estado === "pendiente") {
					//console.log(`No tiene Contratacion Previa.`);

					// VALIDO QUE NO HALLA PERRO OPUESTO
					if (noHayPerroOpuesto && laContratacion.estado === "pendiente") {
						//Confirmo si hay Cupo Disponible
						//console.log(`No hay Perro Opuesto`);

						// VALIDO QUE HALLA SUFICIENTE LUGAR DE CUPO Para El PERRO
						if (cupo >= perro) {
							noModificado = true;
							//console.log(`VALIDO VALIDO EN DESPUES DE PROCESAR`);
						} else {
							laContratacion.comentario = `No hay Cupo disponible.`;
						}
					} else {
						let perroTamanio = laContratacion.Cliente.tamanioPerro;
						//console.log(perroTamanio);
						//console.log(`Perro Opuesto  Existe`);
						let perroOpuesto = ``;
						if (perroTamanio === "Grande") perroOpuesto = "Chico";
						if (perroTamanio === "Chico") perroOpuesto = "Grande";
						laContratacion.comentario = `Ya hay un perro <cite>${perroOpuesto}</cite>`;
					}
				} else {
					laContratacion.comentario = `Ya tiene Contratacion previa.`;
				}
				if (!noModificado) {
					// si se modifico
					laContratacion.estado = "denegada";
				}
			}
		}
	}

	obtenerContratacionesPaseador(pID) {
		let lista = new Array();
		for (let x = 0; x < this.contrataciones.length; x++) {
			if (
				this.contrataciones[x].Paseador.id === pID /*&&
				 (this.contrataciones[x].estado === "aceptada" || this.contrataciones[x].estado === "aceptada") */
			) {
				lista.push(this.contrataciones[x]);
			}
		}
		return lista;
	}

	obtenerContratacionesPaseadorAceptadas(pID) {
		let lista = new Array();
		for (let x = 0; x < this.contrataciones.length; x++) {
			if (this.contrataciones[x].Paseador.id === pID && this.contrataciones[x].estado === "aceptada") {
				lista.push(this.contrataciones[x]);
			}
		}
		return lista;
	}

	validoPerroOpuestoNoExiste(perro) {
		let valido = true;
		let x = 0;

		while (x < this.contrataciones.length && valido) {
			if (this.contrataciones[x].Paseador === this.logueado && this.contrataciones[x].estado === "aceptada") {
				if (perro === "Grande") {
					if (this.contrataciones[x].Cliente.tamanioPerro === `Chico`) {
						valido = false;
					}
				}
				if (perro === "Chico") {
					if (this.contrataciones[x].Cliente.tamanioPerro === `Grande`) {
						valido = false;
					}
				}
			}
			x++;
		}
		return valido;
	}

	//#endregion

	//#region ## PASEADORES FILTRADOS PARA CLIENTES

	paseadoresFiltradosParaCliente() {
		let paseadorArrayfiltrados = new Array();
		let cliente = this.logueado;
		let cupoNecesario = this.calcularCupoPerro(cliente.tamanioPerro);
		//console.log(`ESTOY ADENTRO DE FILTRADOS PARA CLIENTE`);
		//console.log(cupoNecesario);

		for (let i = 0; i < this.paseadores.length; i++) {
			let paseador = this.paseadores[i];
			let cupo = this.cupoDisponible(paseador);
			let cupoValido = cupo >= cupoNecesario;
			//console.log(cupo + ` Cupo Resto`);

			let verificacionTamanio = this.paseadorComparoTamanio(paseador, cliente.tamanioPerro);
			//verificacionTamanio = false;
			//console.log(cupoValido);
			//console.log(verificacionTamanio);
			if (cupoValido && verificacionTamanio) {
				//console.log(`test`);
				//console.log(paseador);
				paseadorArrayfiltrados.push(paseador);
			}
		}
		//console.log(paseadorArrayfiltrados);
		return paseadorArrayfiltrados;
	}

	paseadorComparoTamanio(paseador, tamanio) {
		let tamanioValido = true; // Comienzo variable como verdadero
		let i = 0;
		// Paso por Contrataciones y me salgo en cuanto tamanio sea falso.
		while (i < this.contrataciones.length && tamanioValido) {
			let contratacion = this.contrataciones[i];

			if (contratacion.Paseador === paseador && contratacion.estado === "aceptada") {
				//console.log(`Estoy adentro de if  === Paseador && estado aceptada`);
				`Estoy adentro de if  === Paseador && estado aceptada`;
				let contratacionCliente = contratacion.Cliente;

				// Si la contratacion aceptada, tiene un perro chico o grande,
				// opuesto al actual convierto a false

				if (tamanio === "Grande" && contratacionCliente.tamanioPerro === "Chico") {
					//console.log(`Estoy adentro de if  Grande a Chico`);
					tamanioValido = false;
				}
				if (tamanio === "Chico" && contratacionCliente.tamanioPerro === "Grande") {
					tamanioValido = false;
				}
			}
			i++;
		}
		return tamanioValido;
	}

	//#endregion

	//#region  ## CLIENTES
	armarTablaPaseador(id) {
		let paseador = this.obtenerPaseador(id);

		let unaTabla = `<div class="table-responsive">`;
		unaTabla += `<table class="table table-bordered table-striped align-middle text-center">`;

		unaTabla += `<thead class="table-dark">`;
		unaTabla += `<tr>`;
		unaTabla += `<th>Paseador</th>`;
		unaTabla += `<th>Acción</th>`;
		unaTabla += `<th>Comentarios</th>`;
		unaTabla += `</tr>`;
		unaTabla += `</thead>`;

		unaTabla += `<tbody>`;
		unaTabla += `<tr>`;
		unaTabla += `<td>${paseador.nombre}</td>`;
		unaTabla += `<td><input type="button" data-id="paseadorID-${paseador.id}" class="botonesTablaPaseadores btn btn-dark btn-sm" value="Solicitar"></td>`;
		unaTabla += `<td>-</td>`;
		unaTabla += `</tr>`;
		unaTabla += `</tbody>`;

		unaTabla += `</table>`;
		unaTabla += `</div>`;

		return unaTabla;
	}

	armarTablaContratoCliente(contratacion) {
		let paseador = contratacion.Paseador;

		let unaTabla = `<div class="table-responsive">`;
		unaTabla += `<table class="table table-bordered table-striped align-middle text-center">`;

		unaTabla += `<thead class="table-dark">`;
		unaTabla += `<tr>`;
		unaTabla += `<th colspan="2">Nombre</th>`;
		unaTabla += `<th>Comentarios</th>`;
		unaTabla += `</tr>`;
		unaTabla += `</thead>`;

		unaTabla += `<tbody>`;
		unaTabla += `<tr>`;
		unaTabla += `<td>${paseador.nombre}</td>`;
		unaTabla += `<td>`;

		if (contratacion.estado === "aceptada") {
			unaTabla += ``;
			unaTabla += `</td>`;
			unaTabla += `<td id="contratacionPendientesComentarios">${contratacion.comentario}</td>`;
		} else {
			unaTabla += `<input type="button" data-id="contrataID-${contratacion.id}" class="botonesTablaPaseadoresCancelar btn btn-danger btn-sm" value="Cancelar">`;
			unaTabla += `</td>`;
			unaTabla += `<td id="contratacionPendientesComentarios">Pendiente</td>`;
		}

		unaTabla += `</tr>`;
		unaTabla += `</tbody>`;

		unaTabla += `</table>`;
		unaTabla += `</div>`;

		return unaTabla;
	}

	armadoSelectPaseadores() {
		let listaPaseadores = this.paseadoresFiltradosParaCliente();
		let paseadores = '<option value="-1">Elija un Paseador</option>';
		for (let i = 0; i < listaPaseadores.length; i++) {
			paseadores += `<option value="${listaPaseadores[i].id}">${listaPaseadores[i].nombre}</option>`;
		}
		return paseadores;
	}

	armarTablaPaseadoresActivos() {
		let unaTabla = `<div class="table-responsive">`;
		unaTabla += `<table class="table table-bordered table-striped table-hover align-middle text-center">`;

		unaTabla += `<thead class="table-dark">`;
		unaTabla += `<tr><th></th><th colspan="3">Perros</th></tr>`;
		unaTabla += `<tr>`;
		unaTabla += `<th>Nombre</th><th>Grande</th><th>Mediano</th><th>Chico</th>`;
		unaTabla += `</tr>`;
		unaTabla += `</thead>`;

		unaTabla += `<tbody>`;
		for (let x = 0; x < this.paseadores.length; x++) {
			let paseador = this.paseadores[x];
			let paseadorContrataciones = this.obtenerContratacionesPaseadorAceptadas(paseador.id);
			let cantPerros = this.obtenerCantPerros(paseadorContrataciones);

			unaTabla += `<tr>`;
			unaTabla += `<td>${paseador.nombre}</td>`;
			unaTabla += `<td>${cantPerros.grande}</td>`;
			unaTabla += `<td>${cantPerros.mediano}</td>`;
			unaTabla += `<td>${cantPerros.chico}</td>`;
			unaTabla += `</tr>`;
		}
		unaTabla += `</tbody>`;

		unaTabla += `</table>`;
		unaTabla += `</div>`;

		return unaTabla;
	}

	//#endregion

	//#region  ## UTILIDADES

	// BUSCO POR CONTRATACIONES PENDIENTES O ACEPTADAS.
	clienteTieneContratacion(id) {
		let estado = true;
		let x = 0;
		while (x < miSistema.contrataciones.length && estado) {
			let idClienteContrato = miSistema.contrataciones[x].Cliente.id;
			let estadoContratacion = miSistema.contrataciones[x].estado;
			if (idClienteContrato === id && estadoContratacion !== "denegada") {
				estado = false;
			}
			x++;
		}
		return estado;
	}
	// BUSCO POR CONTRATACIONES ACEPTADAS.
	clienteTieneContratacionAceptada(id, tipo) {
		let estado = true;
		let x = 0;

		if (tipo === "cliente") {
			while (x < miSistema.contrataciones.length && estado) {
				let idClienteContrato = miSistema.contrataciones[x].Cliente.id;
				let estadoContratacion = miSistema.contrataciones[x].estado;
				if (idClienteContrato === id && estadoContratacion === "aceptada") {
					estado = false;
				}
				x++;
			}
		}
		if (tipo === "paseador") {
			while (x < miSistema.contrataciones.length && estado) {
				let idPaseadorContrato = miSistema.contrataciones[x].Paseador.id;
				let estadoContratacion = miSistema.contrataciones[x].estado;
				if (idPaseadorContrato === id && estadoContratacion === "aceptada") {
					estado = false;
				}
				x++;
			}
		}

		return estado;
	}

	// Busco el Cliente por ID
	obtenerCliente(cId) {
		let elCliente = null;
		let i = 0;
		// recorro un while las lista de clientes
		while (elCliente === null && i < this.clientes.length) {
			let cliente = this.clientes[i];
			if (cliente.id === cId) {
				elCliente = cliente;
			}
			i++;
		}
		return elCliente;
	}

	// Busco el Paseador por ID
	obtenerPaseador(pId) {
		let elPaseador = null;
		let i = 0;
		// recorro un while la lista de paseadores para detener en cuanto se encuentre
		while (elPaseador === null && i < this.paseadores.length) {
			let paseadorX = this.paseadores[i];
			if (paseadorX.id === pId) {
				elPaseador = paseadorX;
			}
			i++;
		}
		return elPaseador;
	}

	obtenerContratacion(cId) {
		let laContratacion = null;
		let i = 0;
		// recorro un while la lista de contrataciones para detener en cuanto se encuentre
		while (laContratacion === null && i < this.contrataciones.length) {
			let contratacionX = this.contrataciones[i];
			if (contratacionX.id === cId) {
				laContratacion = contratacionX;
			}
			i++;
		}
		return laContratacion;
	}

	// OBTENGO LA CONTRATACION DEL CLIENTE.
	obtengoClienteContratacion(clienteId) {
		let laContratacion = null;
		let i = 0;

		while (laContratacion === null && i < this.contrataciones.length) {
			let contratacionX = this.contrataciones[i];
			if (contratacionX.Cliente.id === clienteId && contratacionX.estado !== "denegada") {
				laContratacion = contratacionX;
			}
			i++;
		}
		return laContratacion;
	}

	// OBTENGO LA CONTRATACION DEL PASEADOR.
	obtengoPaseadorContrataciones(pId) {
		let lasContrataciones = new Array();
		let i = 0;
		//console.log(this.contrataciones);
		for (let x = 0; x < this.contrataciones.length; x++) {
			let contratacionX = this.contrataciones[x];
			if (contratacionX.Paseador.id === pId) {
				lasContrataciones.push(contratacionX);
			}
		}
		return lasContrataciones;
	}

	cupoDisponible(paseador) {
		let cupoMax = paseador.cupo; // Cupo maximo del Paseador

		// Recorro contrataciones.
		for (let x = 0; x < this.contrataciones.length; x++) {
			if (paseador === this.contrataciones[x].Paseador && this.contrataciones[x].estado === "aceptada") {
				let perroTamanio = this.contrataciones[x].Cliente.tamanioPerro;
				let perroCupo = this.calcularCupoPerro(perroTamanio);
				// Le voy restando al cupo Maximo del Paseador el cupo del perro si la contratacion.estado es Aceptada.
				cupoMax -= perroCupo;
			}
		}

		return cupoMax;
	}

	calcularCupoPerro(tamanio) {
		let cupo = 0;
		if (tamanio === "Grande") cupo = 4;
		if (tamanio === "Mediano") cupo = 2;
		if (tamanio === "Chico") cupo = 1;
		return cupo;
	}

	obtenerCantPerros(contrataciones) {
		let cantPerros = {
			grande: 0,
			mediano: 0,
			chico: 0,
		};
		for (let i = 0; i < contrataciones.length; i++) {
			let tamanio = contrataciones[i].Cliente.tamanioPerro;
			if (tamanio === "Grande") cantPerros.grande++;
			if (tamanio === "Mediano") cantPerros.mediano++;
			if (tamanio === "Chico") cantPerros.chico++;
		}

		return cantPerros;
	}

	//#endregion
	/* FIN de MI SISTEMA */
}
