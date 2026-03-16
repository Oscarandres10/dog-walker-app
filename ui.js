function eventos() {
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfazUI);
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfazUI);
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotrosUI);
	document.querySelector("#btnEnviarFormularioPaseador").addEventListener("click", serUnPaseadorUI);
	document.querySelector("#btnRegistrarme").addEventListener("click", almacenarUI);
	document.querySelector("#btnLogin").addEventListener("click", loginUI);
	document.querySelector("#btnLogoutCliente").addEventListener("click", logoutUI);

	document.querySelector("#btnVerDisponibles").addEventListener("click", mostrarSelectPaseadoresUI);
	document.querySelector("#btnVerContratacion").addEventListener("click", mostrarContratacionUI);
	document.querySelector("#btnVerActivos").addEventListener("click", armarTablaPaseadoresActivosUI);

	document.querySelector("#selPaseadoresParaCliente").addEventListener("change", mostrarPaseadoreUI);

	document
		.querySelector("#btnVerContratacionesPendientesPaseador")
		.addEventListener("click", mostrarTablaContratacionesPendientesUI);
	document.querySelector("#btnVerEstadoPaseador").addEventListener("click", mostrarEstadoPaseadorUI);
}

let miSistema = new Sistema();
miSistema.precargarTodo();

eventos();
ocultarTodoUI();
mostrarSobreNosotrosUI();

function ocultarTodoUI() {
	let lasSecciones = document.querySelectorAll(".secciones");
	for (let unaSeccion of lasSecciones) {
		unaSeccion.style.display = "none";
	}

	ocultarBotonesClienteUI();
	ocultarBotonesPaseadorUI();
	ocultarTablasUI();
}

function ocultarBotonesClienteUI() {
	let losNavLinks = document.querySelectorAll(".navOculto");
	for (let unNavLink of losNavLinks) {
		unNavLink.style.display = "none";
	}
}

function mostrarNavUI() {
	let losNavLinks = document.querySelectorAll(".navOculto");
	for (let unNavLink of losNavLinks) {
		unNavLink.style.display = "block";
	}
}

function ocultarBotonesPaseadorUI() {
	let losBotonesPaseador = document.querySelectorAll(".paseadorOculto");
	for (let unBoton of losBotonesPaseador) {
		unBoton.style.display = "none";
	}
}

function mostrarBotonesPaseadorUI() {
	let losBotonesPaseador = document.querySelectorAll(".paseadorOculto");
	for (let unBoton of losBotonesPaseador) {
		unBoton.style.display = "block";
	}
}

function ocultarTablasUI() {
	let lasTablas = document.querySelectorAll(".tablas");
	for (let unaTabla of lasTablas) {
		unaTabla.style.display = "none";
	}
}

function eliminoMostrarTablaPaseadorUI() {
	let divMostrarTablaPaseador = document.querySelector("#mostrarTablaPaseador");
	divMostrarTablaPaseador.innerHTML = "";
	divMostrarTablaPaseador.style.display = "none";
}

function mostrarSobreNosotrosUI() {
	ocultarTodoUI();
	document.querySelector("#sectionSobreNosotros").style.display = "block";

	if (miSistema.logueado) {
		document.querySelector("#btnLogoutCliente").style.display = "block";
		document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueadoUI();

		if (miSistema.logueado.tipo === "cliente") {
			mostrarNavUI();
		} else if (miSistema.logueado.tipo === "paseador") {
			mostrarBotonesPaseadorUI();
		}
	}
}

function serUnPaseadorUI() {
	ocultarTodoUI();
	document.querySelector("#sectionFormularioPaseador").style.display = "block";
}

function registroInterfazUI() {
	mostrarNavUI();
	ocultarTodoUI();
	document.querySelector("#sectionRegistrarse").style.display = "block";
}

function loginInterfazUI() {
	ocultarTodoUI();
	document.querySelector("#sectionloginUsuario").style.display = "block";
}

function loginUI() {
	let mensaje = "";
	let usuario = document.querySelector("#txtUsuario").value;
	let contrasenia = document.querySelector("#txtContrasenia").value;

	if (miSistema.login(usuario, contrasenia)) {
		ocultarTodoUI();
		if (miSistema.logueado.tipo === "cliente") {
			ocultarTodoUI();
			mostrarSeccionClienteUI();
			mostrarNavUI();
			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueadoUI();
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
		if (miSistema.logueado.tipo === "paseador") {
			ocultarTodoUI();
			mostrarSeccionPaseadorUI();
			mostrarBotonesPaseadorUI();
			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueadoUI();
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
		document.querySelector("#btnRegistarCliente").style.display = "none";
		document.querySelector("#btnLoginCliente").style.display = "none";
		document.querySelector("#btnLogoutCliente").style.display = "inline-block";
	} else {
		mensaje = "Verifique usuario y contraseña...";
	}
	document.querySelector("#pLogin").innerHTML = mensaje;
}

function mostrarLogueadoUI() {
	return `Bienvenido, <strong>${miSistema.logueado.nombre}</strong>`;
}

function logoutUI() {
	miSistema.logueado = null;

	ocultarTodoUI();

	eliminoMostrarTablaPaseadorUI();

	document.querySelector("#pMostrarlogueado").innerHTML = "";
	document.querySelector("#btnRegistarCliente").style.display = "inline-block";
	document.querySelector("#btnLoginCliente").style.display = "inline-block";
	document.querySelector("#btnLogoutCliente").style.display = "none";

	document.querySelector("#sectionUsuarioLogueado").style.display = "none";
	document.querySelector("#sectionPaseadoresLogueado").style.display = "none";
	document.querySelector("#sectionPaseadoresDisponibles").style.display = "none";
	document.querySelector("#sectionSobreNosotros").style.display = "block";
}

//#region   ## SECCION CLIENTE

function mostrarSeccionClienteUI() {
	ocultarTodoUI();
	document.querySelector("#sectionUsuarioLogueado").style.display = "block";
	mostrarNavUI();
	document.querySelector("#btnLogoutCliente").style.display = "block";
}

function mostrarPaseadoreUI() {
	let paseador = document.querySelector("#selPaseadoresParaCliente").value;

	let laTabla = miSistema.armarTablaPaseador(Number(paseador));
	document.querySelector("#mostrarTablaPaseador").innerHTML = laTabla;
	document.querySelector("#mostrarTablaPaseador").style.display = "block";
	darVidaBotonesTablaPaseadoresUI();
}

function darVidaBotonesTablaPaseadoresUI() {
	let losBotones = document.querySelectorAll(".botonesTablaPaseadores");
	for (let unBoton of losBotones) {
		unBoton.addEventListener("click", clickEnSolicitarUI);
	}
}

function clickEnSolicitarUI(id, idtest) {
	if (!miSistema.logueado) {
		return loginUI();
	}
	let valorData = this.getAttribute("data-id");
	let idPaseadorTxt = valorData.substr(11, valorData.length);
	let idPaseadorNum = Number(idPaseadorTxt);

	if (idPaseadorNum !== -1) {
		let paseador = miSistema.obtenerPaseador(idPaseadorNum);
		let cliente = miSistema.logueado.id;
		if (paseador != null) {
			miSistema.cargaUnaContratacion(cliente, idPaseadorNum);
			ocultarTablasUI();
			document.querySelector("#mostrarMensajeContratacion").style.display = "block";
			document.querySelector("#mostrarMensajeContratacion").innerHTML =
				`<p>Su Contratacion fue realizada Correctamente.</p>`;
			setTimeout(() => {
				document.querySelector("#mostrarMensajeContratacion").style.display = "none";
				mostrarSelectPaseadoresUI();
			}, 3000);
		}
	} else {
		document.querySelector("#mostrarMensajeContratacion").innerHTML = "No se ha Elegido un Paseador";
	}
	return valorData;
}

function mostrarSelectPaseadoresUI() {
	if (!miSistema.logueado) {
		return loginUI();
	}
	ocultarTodoUI();
	eliminoMostrarTablaPaseadorUI();
	document.querySelector("#sectionPaseadoresDisponibles").style.display = "block";
	mostrarNavUI();
	let clienteId = miSistema.logueado.id;
	let puedeContratar = miSistema.clienteTieneContratacion(clienteId);
	if (!puedeContratar) {
		let mostrarMensaje = document.querySelector("#mostrarMensajePaseadores");
		mostrarMensaje.style.display = "block";
		mostrarMensaje.innerHTML = `<p><strong><cite>${miSistema.logueado.perroNombre}</cite></strong> ya tiene un contratacion.</p>`;
	} else {
		let selectPaseadores = miSistema.armadoSelectPaseadores();
		document.querySelector("#mostrarSelectPaseadores").style.display = "block";

		let selPaseador = document.querySelector("#selPaseadoresParaCliente");
		selPaseador.innerHTML = selectPaseadores;
		selPaseador.selectedIndex = 0;
	}
}

function armarTablaPaseadoresActivosUI() {
	let laTabla = miSistema.armarTablaPaseadoresActivos();
	ocultarTodoUI();
	mostrarNavUI();
	document.querySelector("#sectionPaseadoresActivos").style.display = "block";
	document.querySelector("#mostraTablaPaseadoresActivos").style.display = "block";
	document.querySelector("#mostraTablaPaseadoresActivos").innerHTML = laTabla;
}

function mostrarContratacionUI() {
	if (!miSistema.logueado) {
		return loginUI();
	}
	ocultarTodoUI();
	eliminoMostrarTablaPaseadorUI();
	let clienteId = miSistema.logueado.id;
	document.querySelector("#sectionPaseadoresContratacion").style.display = "block";
	mostrarNavUI();
	let tieneContrato = miSistema.clienteTieneContratacion(clienteId);

	let miContratacion = miSistema.obtengoClienteContratacion(clienteId);

	if (tieneContrato) {
		let mostrarMensaje = document.querySelector("#mostrarMensajeContratacion");
		mostrarMensaje.style.display = "block";
		mostrarMensaje.innerHTML = `<p><strong><cite>${miSistema.logueado.perroNombre}</cite></strong> no tiene una contratacion pendiente o aceptada.</p>`;
	} else {
		let contratacionTabla = miSistema.armarTablaContratoCliente(miContratacion);
		let mostrarContratacion = document.querySelector("#mostrarContratacion");
		mostrarContratacion.innerHTML = contratacionTabla;
		darVidaBotonesmostrarContratacionUI();
		mostrarContratacion.style.display = `block`;
	}
}

function darVidaBotonesmostrarContratacionUI() {
	let losBotones = document.querySelectorAll(".botonesTablaPaseadoresCancelar");
	for (let unBoton of losBotones) {
		unBoton.addEventListener("click", clickEnCancelarUI);
	}
}

function clickEnCancelarUI() {
	if (!miSistema.logueado) {
		return loginUI();
	}
	let cliente = miSistema.logueado;
	let valorData = this.getAttribute("data-id");
	let idContratacionTxt = valorData.substr(11, valorData.length);
	let idContratacionNum = Number(idContratacionTxt);
	let contratacion = miSistema.obtenerContratacion(idContratacionNum);
	if (idContratacionNum !== -1) {
		if (contratacion.Cliente === cliente && contratacion.estado === "pendiente") {
			contratacion.estado = "denegada";
			contratacion.comentario = `Cancelada por Cliente`;
			ocultarTablasUI();
			let mostrarMensaje = document.querySelector("#mostrarMensajeContratacion");
			mostrarMensaje.style.display = "block";
			mostrarMensaje.innerHTML = `la Contratacion de ${cliente.perroNombre} se ha Cancelado Correctamente.`;
			setTimeout(() => {
				document.querySelector("#mostrarMensajeContratacion").innerHTML = ``;
				document.querySelector("#mostrarMensajeContratacion").style.display = `none`;
				mostrarSelectPaseadoresUI();
			}, 3000);
		}
	} else {
		document.querySelector("#mostrarMensajeContratacion").innerHTML = "No se ha Elegido un Paseador";
	}
	return valorData;
}

//#endregion

//#region  ## SECCION PASEADOR

function mostrarSeccionPaseadorUI() {
	if (miSistema.logueado !== null) {
		ocultarTablasUI();
		document.querySelector("#sectionPaseadoresLogueado").style.display = "block";
	} else {
		loginUI();
	}
}

function mostrarTablaContratacionesPendientesUI() {
	if (!miSistema.logueado || miSistema.logueado.tipo !== "paseador") {
		return;
	}

	ocultarTodoUI();
	mostrarBotonesPaseadorUI();

	document.querySelector("#sectionContratacionesPaseador").style.display = "block";

	let seccionPaseador = document.querySelector("#mostrarTablaContratacionesPendientes");
	let laTabla = miSistema.armarTablaContrataciones();

	seccionPaseador.style.display = "block";
	seccionPaseador.innerHTML = laTabla;

	darVidaBotonesTablaContratacionesPendientesUI();
}

function darVidaBotonesTablaContratacionesPendientesUI() {
	let botonAceptar = document.querySelectorAll(".botonesTablaContratacionesPendiente");
	for (let unBoton of botonAceptar) {
		unBoton.addEventListener("click", clickEnAceptarUI);
	}
}

function clickEnAceptarUI() {
	let valorData = this.getAttribute("data-id");
	let idContratacionTxt = valorData.substr(15, valorData.length);
	let idContratacionNum = Number(idContratacionTxt);
	miSistema.procesarAceptarContratacion(idContratacionNum);
	miSistema.validoContratacionesPendientesDespuesDeAceptar(idContratacionNum);
	gestionContratacionesProcensandoUI();
}

function mostrarEstadoPaseadorUI() {
	if (!miSistema.logueado || miSistema.logueado.tipo !== "paseador") {
		return;
	}

	ocultarTodoUI();
	mostrarBotonesPaseadorUI();

	document.querySelector("#sectionEstadoPaseador").style.display = "block";

	let seccionPaseador = document.querySelector("#mostrarEstadoPaseador");
	let laTabla = miSistema.armarEstadoPaseador();

	seccionPaseador.style.display = "block";
	seccionPaseador.innerHTML = laTabla;
}

function gestionContratacionesProcensandoUI() {
	let laTabla = miSistema.armarTablaContratacionesProcesando();
	document.querySelector("#mostrarTablaContratacionesPendientes").innerHTML = laTabla;
	darVidaBotonesTablaContratacionesPendientesUI();
}

//#endregion

//#region  ## ALMACENADO DE DATOS

function almacenarUI() {
	let nombre = document.querySelector("#txtNombreCliente").value;
	let usuario = document.querySelector("#txtUsuarioCliente").value;
	let contrasenia = document.querySelector("#txtContraseniaCliente").value;
	let nombrePerro = document.querySelector("#txtNombrePerroCliente").value;
	let tamanioPerro = document.querySelector("#selTamanioCliente").value;
	let validaciones = miSistema.validacionRegistroCliente(nombre, usuario, contrasenia, nombrePerro, tamanioPerro);

	if (validaciones) {
		miSistema.cargaUnCliente(nombre, usuario, contrasenia, nombrePerro, tamanioPerro);
		miSistema.mensajeRegistro.push(`Usuario ${nombre} registro correctamente`);
	}

	document.querySelector("#pRegistrarse").innerHTML = miSistema.mensajeRegistro.join("");
	miSistema.mensajeRegistro = [];
}

//#endregion
