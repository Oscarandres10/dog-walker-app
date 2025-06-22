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
	}

	//#endregion

	// #region  ## TABLAS

	armarTablaContrataciones() {
		//let listaPaseadores = this.contratacionesFiltradas(); //estoy probando
		let unaTabla = `<table border="1px" class="tablaContratacionesPendientes">
    <caption>Contrataciones Pendientes</caption>
	<tr>
		
		<th>Nombre Perro</th>
		<th>Tamaño</th>
		<th></th>
    <th></th>
    <th>Comentario:</th>
	</tr>`;

		for (let i = 0; i < this.contrataciones.length; i++) {
			let unaContratacion = this.contrataciones[i];
			let paseador = this.logueado;
			if (unaContratacion.Paseador === paseador && unaContratacion.estado === "pendiente") {
				unaTabla += `<tr>
			
						<td>${unaContratacion.Cliente.perroNombre}</td>
            <td>${unaContratacion.Cliente.tamanioPerro}</td>
						<td><input id="btn" type=button data-id="contratacionID-${unaContratacion.id}"  class="botonesTablaContratacionesAceptada" value="Aceptar"></td>
						<td><input type=button data-id="contratacionID-${unaContratacion.id}"  class="botonesTablaContratacionesRechazada" value="Rechazar"></td>
						<td></td>
            </tr>`;
			}
		}
		unaTabla += `</table>`;

		return unaTabla;
	}

	armarTablaContratacionesAceptadas() {
		let unaTabla = `<table border="1px">
	<tr>
		
		<th>Nombre Perro</th>
		<th></th>
		<th></th>

	</tr>`;

		for (let i = 0; i < this.contrataciones.length; i++) {
			let unaContratacion = this.contrataciones[i];
			let paseador = this.logueado;
			if (unaContratacion.Paseador === paseador && unaContratacion.estado === "aceptada") {
				unaTabla += `<tr>
			
						<td>${unaContratacion.Cliente.perroNombre}</td>
						</tr>`;
			}
		}
		unaTabla += `</table>`;
		return unaTabla;
	}

	armarEstadoPaseador() {
		let unaTabla = `<table border="1px" class="tablaEstadoPaseador">
    <tr>
    <td><h4>CUPO TOTAL</h4></td>
    </tr>
    <tr>
    <td><div class="cupoPrincipal">
    ${this.logueado.cupo}
    </div>
    </td>
    </tr>
    <tr><td><br></td></tr>
    </table>
    <table border="1px" class="tablaEstadoPaseador">
    <tr>
    <td><h4>CUPOS OCUPADOS</h4></td>
    </tr>
    <tr>
    <td><div class="cupoPrincipal">
    ${this.calcularCupoDisponible(this.logueado)}
    </div>
    </td>
    </tr>
    <tr><td><br></td></tr>
    </table>

     <table border="1px" class="tablaEstadolistaPerros">
     `;
		let estado = true;
		if (estado) {
			for (let i = 0; i < this.contrataciones.length; i++) {
				let unaContratacion = this.contrataciones[i];
				let paseador = this.logueado;
				if (unaContratacion.Paseador === paseador && unaContratacion.estado === "aceptada") {
					unaTabla += `
          <caption>Contrataciones</caption>
          <tr>
          <th>Nombre</th>
          <th>Tamaño</th>
          </tr>
          <tr>
          <td>${unaContratacion.Cliente.perroNombre}</td><td>${unaContratacion.Cliente.tamanioPerro}</td>
          </tr>`;
				}
			}
		} else {
			unaTabla += `<tr><td>No Hay Contrataciones Actuales</td></tr>`;
		}
		unaTabla += `</table>`;
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
					this.mensajeRegistro.push(`<strong>Usuario:</strong> Ya existe<br>`);
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
					`<strong>Contraseña</strong> tiene que incluir al menos una mayúscula, una minúscula y un número<br>`
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
					this.mensajeRegistro.push(`Nombre de Perro ya existe.<br>`);
				}

				x++;
			}
		} else {
			validar = false; // El input esta vacio
			this.mensajeRegistro.push(`Nombre de Perro no puede estar Vacio.<br>`);
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
		let mensaje = ``;
		let valido = false;
		let elCliente = miSistema.obtenerCliente(idCliente);
		let elPaseador = miSistema.obtenerPaseador(idPaseador);

		if (elCliente !== null && elPaseador !== null) {
			let cupo = this.cupoDisponible(elPaseador);

			// Me aseguro que hay cupo sufficiente para el cupo del perro.
			if (cupo >= this.calcularCupoPerro(elCliente.tamanioPerro)) {
				//console.log(`test estoy en el if si el cupo es mayor que el cupo perro`);
				if (this.paseadorComparoTamanio(elPaseador, elCliente.tamanioPerro)) {
					//console.log(`Test Se compara los tamanio de perro`);
					valido = true;
				} else {
					mensaje = `Perro Opuesto ya Exite.`;
				}
			} else {
				mensaje = `No tiene cupo Sufficiente.`;
			}
		}
		return valido;
	}

	//#endregion

	//#region  ## CONTRATACIONES ##

	procesarAceptarContratacion(id) {
		let mensaje = ``;
		let valido = false;
		let laContratacion = this.obtenerContratacion(id); // se obtiene la contratacion
		let perro = this.calcularTamanioPerro(laContratacion.Cliente.tamanioPerro); // Tamaño
		//console.log("Estoy en procesarAceptar");

		// Calculo Tamanio de Perro
		let tamanioPerro = perro;
		//console.log(`Tamanio: ${tamanioPerro}`);

		// Resto del Cupo Total, el Cupo Ocupado.
		let cupoResto = this.logueado.cupo - this.calcularCupoDisponible(this.logueado);
		//console.log(`CupoRestante = ${cupoResto}`);
		//console.log(!this.validoPerroOpuestoExiste(laContratacion.Cliente.tamanioPerro));
		if (!this.validoPerroOpuestoExiste(laContratacion.Cliente.tamanioPerro)) {
			// Confirmo si hay Cupo Disponible
			//console.log(`Perro Opuesto No Existe`);
			if (cupoResto >= tamanioPerro) {
				laContratacion.estado = "aceptada";
				laContratacion.CupoActual += tamanioPerro;
				//console.log(`Contratacion Aceptada`);
				mensaje = `Contratacion Aceptada`;
			} else {
				mensaje = `No hay Cupo disponible.`;
			}
		} else {
			let perroOpuesto = ``;
			if (perro === "Grande") perroOpuesto = "Chico";
			if (perro === "Chico") perroOpuesto = "Grande";
			mensaje = `Ya hay un Perro ${perroOpuesto}`;
			//console.log(perroOpuesto);
			//console.log(`Perro Opuesto  Existe`);
		}
		console.log(mensaje);
		mostrarTablaContratacionesPendientesUI();
		this.armarEstadoPaseador();
	}

	validoPerroOpuestoExiste(perro) {
		let valido = false;
		let x = 0;
		//console.log(`QUE PERRO ES ESTO  para VALIDAR OPUESTO`);
		//console.log(perro);
		while (x < this.contrataciones.length && !valido) {
			if (perro === "Grande") {
				//console.log(`perro Grande`);
				if (this.contrataciones[x].Cliente.tamanioPerro === `Chico` && this.contrataciones[x].estado === "aceptada") {
					valido = true;
				}
			}
			if (perro === "Chico") {
				//console.log(`perro Chico`);
				if (this.contrataciones[x].Cliente.tamanioPerro === `Grande` && this.contrataciones[x].estado === "aceptada") {
					valido = true;
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

	//
	//

	//#region  ## PASEADORES
	armarTablaPaseador(id) {
		let paseador = this.obtenerPaseador(id);
		//console.log(paseador);
		let unaTabla = `<br><br><table class="tablaPaseador" border="1px">
					<tr>
						<th colspan="2">Nombre</th>
						
						<th>Comentarios</th>
					</tr>
					<tr>
				   		<td>${paseador.nombre}</td>
						<td>
							<input type="button" data-id="paseadorID-${paseador.id}" class="botonesTablaPaseadores" value="Solicitar">
						</td>
						<td></td>
				    </tr></table>`;

		return unaTabla;
	}

	armadoSelectPaseadores() {
		let listaPaseadores = this.paseadoresFiltradosParaCliente();
		let paseadores = '<option value="-1">elija opción</option>`;';
		for (let i = 0; i < listaPaseadores.length; i++) {
			paseadores += `<option value="${listaPaseadores[i].id}">${listaPaseadores[i].nombre}</option>`;
		}
		return paseadores;
	}

	//#endregion

	//
	//

	//#region  ## UTILIDADES

	// BUSCO POR CONTRATACIONES PENDIENTES O ACEPTADAS.

	clienteTieneContratacion(id) {
		let estado = false;
		let x = 0;
		//console.log(`Abajo: numeros cliente ID  adentro de clienteTieneContratacion`);
		//console.log(miSistema.contrataciones[x].Cliente.id);
		while (x < miSistema.contrataciones.length && !estado) {
			let idClienteContrato = miSistema.contrataciones[x].Cliente.id;
			let estadoContratacion = miSistema.contrataciones[x].estado;
			if (idClienteContrato === id && estadoContratacion !== "denegada") {
				estado = true;
			}
			x++;
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
			//console.log(paseadorX);
			if (cliente.id === cId) {
				elCliente = cliente;
				//console.log(`El cliente:  -->  ${elCliente.nombre}`);
			}
			i++;
		}
		return elCliente;
	}

	// Busco el Paseador por ID
	obtenerPaseador(pId) {
		let elPaseador = null;
		let i = 0;
		// recorro un while las lista de paseadores
		while (elPaseador === null && i < this.paseadores.length) {
			let paseadorX = this.paseadores[i];
			//console.log(paseadorX);
			if (paseadorX.id === pId) {
				elPaseador = paseadorX;
				//console.log(`El Paseador:  -->  ${elPaseador.nombre}`);
			}
			i++;
		}
		return elPaseador;
	}

	obtenerContratacion(cId) {
		let laContratacion = null;
		let i = 0;

		while (laContratacion === null && i < this.contrataciones.length) {
			let contratacionX = this.contrataciones[i];
			//console.log(contratacionX);
			if (contratacionX.id === cId) {
				laContratacion = contratacionX;
				//console.log(`La Contratacion:  -->  ${laContratacion.Cliente.nombre}`);
			}
			i++;
		}
		return laContratacion;
	}

	validarNroPositivo(pNum) {
		let valido = false;
		if (!isNaN(pNum)) {
			let elNum = Number(pNum);
			if (elNum >= 0) {
				valido = true;
			}
		}
		return valido;
	}

	cupoDisponible(paseador) {
		//console.log(`Estoy Adentro de Calcular Cupo Disonible`);
		//let cupo = false;
		let cupoMax = paseador.cupo; // Cupo maximo del Paseador

		// Recorro contrataciones.
		for (let x = 0; x < this.contrataciones.length; x++) {
			if (paseador === this.contrataciones[x].Paseador && this.contrataciones[x].estado === "aceptada") {
				let perroTamanio = this.contrataciones[x].Cliente.tamanioPerro;
				let perroCupo = this.calcularCupoPerro(perroTamanio);
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

	//#endregion
	/* FIN de MI SISTEMA */
}
