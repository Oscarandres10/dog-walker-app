function eventos() {
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfazUI); // Registrarse
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfazUI);
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotrosUI);
	document.querySelector("#btnOtro").addEventListener("click", otroUI);
	document.querySelector("#btnPaseadorRegistro").addEventListener("click", serUnPaseadorUI);
	document.querySelector("#btnRegistrarme").addEventListener("click", almacenarUI);
	document.querySelector("#btnLogin").addEventListener("click", loginUI);
	document.querySelector("#btnLogoutCliente").addEventListener("click", logoutUI);
	//document.querySelector("#btnMostrarTabla").addEventListener("click", mostrarTablaPaseadoresUI);
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
}

function ocultarNavUI() {
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

function ocultarTablasUI() {
	let lasTablas = document.querySelectorAll(".tablas");
	for (let unaTabla of lasTablas) {
		unaTabla.style.display = "none";
	}
}

//luego muestro el sobre nostros y los botones para log in y registrarse

function mostrarSobreNosotrosUI() {
	ocultarTodoUI();
	document.querySelector("#sectionSobreNosotros").style.display = "block";
}

/* #### BOTONES NAVEGADOR ####*/

function serUnPaseadorUI() {
	ocultarTodoUI();
	document.querySelector("#sectionFormularioPaseador").style.display = "block";
}
function otroUI() {
	ocultarTodoUI();
	//si quisieramos mostrar algo mas....
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
	document.querySelector("#btnLoginCliente").style.display = "none";
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
			ocultarNavUI();
			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueadoUI();
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
		if (miSistema.logueado.tipo === "paseador") {
			ocultarTodoUI();
			mostrarSeccionPaseadorUI();
			ocultarNavUI();
			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueadoUI();
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
	} else {
		mensaje = "Verifique usuario y contraseña...";
	}
	document.querySelector("#pLogin").innerHTML = mensaje;
}

function mostrarLogueadoUI() {
	let elCliente = `<p>Bienvenido <strong>${miSistema.logueado.nombre}</strong></p>`;
	return elCliente;
}

/* #### LOGOUT ####*/

function logoutUI() {
	let mensaje = "";
	ocultarTodoUI();
	mostrarNavUI();
	ocultarTablasUI();
	document.querySelector("#pMostrarlogueado").innerHTML = ``;
	document.querySelector("#btnLogoutCliente").style.display = `none`;
	miSistema.logueado = null;

	document.querySelector("#sectionUsuarioLogueado").style.display = "none";

	document.querySelector("#sectionSobreNosotros").style.display = "block";
}

//#region   ## SECCION CLIENTE

function mostrarSeccionClienteUI() {
	if (!miSistema.logueado) {
		return loginUI();
	}

	let clienteId = miSistema.logueado.id;
	let tieneContrato = miSistema.clienteTieneContratacion(clienteId);

	// Muestro la seccion Cliente
	document.querySelector("#sectionUsuarioLogueado").style.display = "block";

	// Ahora voy a controla si tenia contratacion
	if (tieneContrato) {
		let divContratado = document.querySelector("#divMostrarContratado");
		divContratado.style.display = "block";

		divContratado.innerHTML = `<p><strong>${miSistema.logueado.perroNombre}</strong> tiene una contratación pendiente o aceptada actualmente.</p>`;

		// Como tiene contratacion y aviso, oculto el div de elegir paseador
		document.querySelector("#mostrarTablaPaseador").style.display = "none";
	} else {
		// No tiene contratación…
		//
		// por las dudas limpio mensajes anteriores.
		let divContratado = document.querySelector("#divMostrarContratado");
		divContratado.innerHTML = "";
		divContratado.style.display = "none";

		// Y Mustro paseadores
		document.querySelector("#mostrarTablaPaseador").style.display = "block";
		mostrarSelectPaseadoresUI();

		//Lo siguiente le doy Vida a los select para mostrar la info.
		document.querySelector("#selPaseadoresParaCliente").addEventListener("change", mostrarPaseadoreUI);
	}
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

function clickEnSolicitarUI() {
	let valorData = this.getAttribute("data-id");
	let idPaseadorTxt = valorData.substr(11, valorData.length);
	let idPaseadorNum;
	if (!isNaN(idPaseadorTxt)) idPaseadorNum = Number(idPaseadorTxt);
	//console.log(idPaseadorNum);
	if (idPaseadorNum !== -1) {
		let paseador = miSistema.obtenerPaseador(idPaseadorNum);
		let cliente = miSistema.logueado.id;
		if (paseador != null) {
			miSistema.cargaUnaContratacion(cliente, idPaseadorNum);
			ocultarTablasUI();
			document.querySelector("#mostrarMensajeContratacion").style.display = "block";
			document.querySelector(
				"#mostrarMensajeContratacion"
			).innerHTML = `<p>Su Contratacion fue realizada Correctamente.</p>`;
			setTimeout(() => {
				document.querySelector("#mostrarMensajeContratacion").style.display = "none";
				mostrarSeccionClienteUI();
			}, 2000); // 2 segundos
		}
	} else {
		document.querySelector("#mostrarMensajeContratacion").innerHTML = "No se ha Elegido un Paseador";
	}
	return valorData;
}

function mostrarSelectPaseadoresUI() {
	let selectPaseadores = miSistema.armadoSelectPaseadores();
	document.querySelector("#selPaseadoresParaCliente").innerHTML = selectPaseadores;
}

//#endregion

//
//

function mostrarSeccionPaseadorUI() {
	if (miSistema.logueado !== null) {
		document.querySelector("#sectionPaseadoresLogueado").style.display = "block";
		mostrarTablaContratacionesPendientesUI(); // Tabla de Contrataciones de Pendientes
		mostrarEstadoPaseadorUI();
	} else {
		loginUI();
	}
}

/* function obtenerListaPaseadores(pId) {
	let lista = new Array();
	for (let i = 0; i < paseadores.length; i++) {
		let unPaseador = paseadores[i];
		//aca se puede filtar con un if
		lista.push(unPaseador);
	}
	return lista;
}

function paseadoresFiltradosParaCliente() {
	let listaFiltrada = new Array();
	for (let i = 0; i < paseadores.length; i++) {
		let unPaseador = paseadores[i];
		if (unPaseador.cupoActual > 0) {
			lista.push(unPaseador);
		}
	}
	return listaFiltrada;
} */

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

//#region  ##  PASEADOR INTERFAZ

function mostrarTablaContratacionesPendientesUI() {
	let laTabla = miSistema.armarTablaContrataciones();
	document.querySelector("#mostrarTablaContratacionesPendientes").innerHTML = laTabla;
	darVidaBotonesTablaContratacionesPendientesUI();
}
function darVidaBotonesTablaContratacionesPendientesUI() {
	let botonAceptar = document.querySelectorAll(".botonesTablaContratacionesAceptada");
	for (let unBoton of botonAceptar) {
		unBoton.addEventListener("click", clickEnAceptarUI);
	}
	let botonRechazar = document.querySelectorAll(".botonesTablaContratacionesRechazada");
	for (let unBoton of botonRechazar) {
		unBoton.addEventListener("click", clickEnRechazarUI);
	}
}

function clickEnAceptarUI() {
	let valorData = this.getAttribute("data-id");
	let idContratacionTxt = valorData.substr(15, valorData.length);
	let idContratacionNum = -1;
	//console.log(idContratacionTxt);
	if (isNaN) idContratacionNum = Number(idContratacionTxt);
	let contratacion = miSistema.procesarAceptarContratacion(idContratacionNum);
	if (this.logueado != null) {
		contratacion.estado = "aceptada";
		//console.log(contratacion.estado);
		contratacion.comentario = "Se acepto correctamente.";
		validacionContratacion(contratacion.Cliente, contratacion.Paseador);
		/*  ocultarTablasUI();
    document.querySelector("#mostrarMensajeContratacion").style.display =
      "block";
    document.querySelector(
      "#mostrarMensajeContratacion"
    ).innerHTML = `<p>Su Contratacion fue realizada Correctamente.</p>`;
    setTimeout(() => {
      document.querySelector("#mostrarMensajeContratacion").style.display =
        "none";
      mostrarSeccionClienteUI();
    }, 5000); // 5 segundos */
	}
	return valorData;
}

function clickEnRechazarUI() {
	let valorData = this.getAttribute("data-id");
	let idPaseadorTxt = valorData.substr(11, valorData.length);
	let idPaseadorNum = -1;

	if (isNaN) idPaseadorNum = Number(idPaseadorTxt);
	let paseador = miSistema.obtenerPaseador(idPaseadorNum);
	let cliente = miSistema.logueado;
	//console.log(`Paseador ${paseador}`);
	//console.log(cliente);
	if (paseador != null) {
		miSistema.cargaUnaContratacion(cliente, paseador, "pendiente");
		ocultarTablasUI();
		document.querySelector("#mostrarMensajeContratacion").style.display = "block";
		document.querySelector(
			"#mostrarMensajeContratacion"
		).innerHTML = `<p>Su Contratacion fue realizada Correctamente.</p>`;
		setTimeout(() => {
			document.querySelector("#mostrarMensajeContratacion").style.display = "none";
			mostrarSeccionClienteUI();
		}, 5000); // 5 segundos
	}
	return valorData;
}

//
//   NO SE ESTO  TALVEZ BORREMOS
//
//
function mostrarTablaContratacionesAceptadasUI() {
	let laTabla = miSistema.armarTablaContratacionesAceptadas();
	document.querySelector("#mostrarTablaContratacionesAceptadas").innerHTML = laTabla;
}

//
//
//

function mostrarEstadoPaseadorUI() {
	let laTabla = miSistema.armarEstadoPaseador();
	document.querySelector("#mostrarEstadoPaseador").innerHTML = laTabla;
}
//#endregion
