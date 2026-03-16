function eventos() {
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfazUI);
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfazUI);
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotrosUI);
	document.querySelector("#btnPaseadorRegistro").addEventListener("click", serUnPaseadorUI);
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

//primero oculto todo (dejando unicamente el navegador y el footer). Navegador y footer tiene seccionesNavegador y seccionesFooter como class para cuando las querramos ocultar
function ocultarTodoUI() {
	let lasSecciones = document.querySelectorAll(".secciones");
	for (let unaSeccion of lasSecciones) {
		unaSeccion.style.display = "none";
	}

	let losNavLinks = document.querySelectorAll(".navOculto");
	for (let unNavLink of losNavLinks) {
		unNavLink.style.display = "none";
	}

	ocultarTablasUI();

	document.querySelector("#menuPaseador").style.display = "none";
}

function mostrarNavUI() {
	let losNavLinks = document.querySelectorAll(".navOculto");
	for (let unNavLink of losNavLinks) {
		unNavLink.style.display = "block";
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

//luego muestro el sobre nostros y los botones para log in y registrarse
function mostrarSobreNosotrosUI() {
	ocultarTodoUI();
	document.querySelector("#sectionSobreNosotros").style.display = "block";

	if (miSistema.logueado) {
		mostrarNavUI();
		document.querySelector("#btnLogoutCliente").style.display = "block";
	}
}

/* #### BOTONES NAVEGADOR ####*/
function serUnPaseadorUI() {
	ocultarTodoUI();
	document.querySelector("#sectionFormularioPaseador").style.display = "block";
}

/* #### REGISTRO ####*/
function registroInterfazUI() {
	mostrarNavUI();
	ocultarTodoUI();
	document.querySelector("#sectionRegistrarse").style.display = "block";
}

/* #### LOGIN ####*/
function loginInterfazUI() {
	ocultarTodoUI();
	document.querySelector("#sectionloginUsuario").style.display = "block";
}

function loginUI() {
	//console.log("loginUI arrancó con usuario:", usuarioInput.value);
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
			mostrarNavUI();
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
	let elCliente = `<p><strong>${miSistema.logueado.nombre}</strong></p>`;
	return elCliente;
}

/* #### LOGOUT #### */
function logoutUI() {
	miSistema.logueado = null;

	ocultarTodoUI();

	eliminoMostrarTablaPaseadorUI();

	document.querySelector("#pMostrarlogueado").innerHTML = "";
	document.querySelector("#btnRegistarCliente").style.display = "inline-block";
	document.querySelector("#btnLoginCliente").style.display = "inline-block";
	document.querySelector("#btnLogoutCliente").style.display = "none";

	let menuPaseador = document.querySelector("#menuPaseador");
	if (menuPaseador) {
		menuPaseador.style.display = "none";
	}

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
				//console.log(`ME VOY PARA SECCION CLIENTE`);
				mostrarSelectPaseadoresUI();
			}, 3000); // 2 segundos
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
		//console.log("No puede contratar");
	} else {
		let selectPaseadores = miSistema.armadoSelectPaseadores();
		document.querySelector("#mostrarSelectPaseadores").style.display = "block";
		document.querySelector("#mostrarTablaPaseador").style.display = "block";
		let selPaseador = document.querySelector("#selPaseadoresParaCliente");
		selPaseador.innerHTML = selectPaseadores;
		selPaseador.selectedIndex = 0; // Pongo el select en 0 para que no me muestre si ya se habia selecccionado
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
	//console.log("Estoy ACA EN MOSTRARCONTRATACION");
	if (!miSistema.logueado) {
		return loginUI();
	}
	ocultarTodoUI();
	eliminoMostrarTablaPaseadorUI();
	let clienteId = miSistema.logueado.id;
	document.querySelector("#sectionPaseadoresContratacion").style.display = "block";
	mostrarNavUI();
	// TIENECONTRATO ACA VA A FUNCIONAR AL REVEZ   !tienecontrato == Verdadero
	let tieneContrato = miSistema.clienteTieneContratacion(clienteId);

	let miContratacion = miSistema.obtengoClienteContratacion(clienteId);

	if (tieneContrato) {
		//console.log(`Estoy Aca en tiene Contrato :  Mustro Mensaje de que no hay contratacion`);
		let mostrarMensaje = document.querySelector("#mostrarMensajeContratacion");
		mostrarMensaje.style.display = "block";
		mostrarMensaje.innerHTML = `<p><strong><cite>${miSistema.logueado.perroNombre}</cite></strong> no tiene una contratacion pendiente o aceptada.</p>`;
	} else {
		//console.log(`Estoy Aca en tiene Contrato:  Armo Tabla`);
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
			//console.log(`ESTOY CANCELANDO`);
			let mostrarMensaje = document.querySelector("#mostrarMensajeContratacion");
			mostrarMensaje.style.display = "block";
			mostrarMensaje.innerHTML = `la Contratacion de ${cliente.perroNombre} se ha Cancelado Correctamente.`;
			setTimeout(() => {
				//console.log(`ME VOY PARA SECCION CLIENTE`);
				document.querySelector("#mostrarMensajeContratacion").innerHTML = ``;
				document.querySelector("#mostrarMensajeContratacion").style.display = `none`;
				mostrarSelectPaseadoresUI();
			}, 3000); // 2 segundos
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
		document.querySelector("#menuPaseador").style.display = "block";

		// Asigno los eventos a los botones del menú
		document
			.querySelector("#btnVerContratacionesPendientesPaseador")
			.addEventListener("click", mostrarTablaContratacionesPendientesUI);

		/* document
			.querySelector("#btnVerContratacionesPendientesPaseador")
			.addEventListener("click", gestionContratacionesProcensandoUI); */
		document.querySelector("#btnVerEstadoPaseador").addEventListener("click", mostrarEstadoPaseadorUI);
	} else {
		loginUI();
	}
}

function mostrarTablaContratacionesPendientesUI() {
	ocultarTablasUI();
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
	//console.log(idContratacionNum);
	miSistema.procesarAceptarContratacion(idContratacionNum);

	miSistema.validoContratacionesPendientesDespuesDeAceptar(idContratacionNum);

	gestionContratacionesProcensandoUI();
}

function mostrarEstadoPaseadorUI() {
	ocultarTablasUI();
	let seccionPaseadorSideBar = document.querySelector("#mostrarEstadoPaseador");
	let laTabla = miSistema.armarEstadoPaseador();
	seccionPaseadorSideBar.style.display = "block";
	seccionPaseadorSideBar.innerHTML = laTabla;
}

function gestionContratacionesProcensandoUI() {
	//la primera vez que voy a a procesar las Contrataciones
	let laTabla = miSistema.armarTablaContratacionesProcesando();
	document.querySelector("#mostrarTablaContratacionesPendientes").innerHTML = laTabla;
	//tengo que darle vida a los botones
	darVidaBotonesTablaContratacionesPendientesUI();
}

//#endregion

/* #### ALMACENADO DE DATOS ####*/

function almacenarUI() {
	//let mensaje = ``;
	let nombre = document.querySelector("#txtNombreCliente").value;
	let usuario = document.querySelector("#txtUsuarioCliente").value;
	let contrasenia = document.querySelector("#txtContraseniaCliente").value;
	let nombrePerro = document.querySelector("#txtNombrePerroCliente").value;
	let tamanioPerro = document.querySelector("#selTamanioCliente").value;
	let validaciones = miSistema.validacionRegistroCliente(nombre, usuario, contrasenia, nombrePerro, tamanioPerro);

	if (validaciones) {
		let nuevoCliente = new Cliente();
		nuevoCliente.nombre = nombre;
		nuevoCliente.usuario = usuario;
		nuevoCliente.contrasenia = contrasenia;
		nuevoCliente.perroNombre = nombrePerro;
		nuevoCliente.tamanioPerro = tamanioPerro;

		miSistema.clientes.push(nuevoCliente);
		miSistema.mensajeRegistro.push(`Usuario ${nombre} registro correctamente`);
	}

	document.querySelector("#pRegistrarse").innerHTML = miSistema.mensajeRegistro.join("");
	miSistema.mensajeRegistro = [];
}
