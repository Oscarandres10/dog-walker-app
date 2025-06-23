//UI - linea 161    --> Hay que modificar y Hacer lo comentado
//UI linea 147   --> Hay que modificar y Hacer lo comentado.
//UI Linea 232   -->  Hay que modificar y Hacer lo comentado.
// CLASESISTEMA.JS    linea 332    ---> falta modificar para los estados, y rechazo.
function eventos() {
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfazUI); // Registrarse
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfazUI);
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotrosUI);
	document.querySelector("#btnOtro").addEventListener("click", otroUI);
	document.querySelector("#btnPaseadorRegistro").addEventListener("click", serUnPaseadorUI);
	document.querySelector("#btnRegistrarme").addEventListener("click", almacenarUI);
	document.querySelector("#btnLogin").addEventListener("click", loginUI);
	document.querySelector("#btnLogoutCliente").addEventListener("click", logoutUI);
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
	//console.log("loginUI arrancó con usuario:", usuarioInput.value);
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

/* A efectos meramente informativos el usuario deberá poder visualizar en una interfaz diferente un listado
con todos los paseadores y la cantidad de perros (no cupos) que tiene asignados actualmente. */

function mostrarSeccionClienteUI() {
	if (!miSistema.logueado) {
		return loginUI();
	}

	let clienteId = miSistema.logueado.id;
	let tieneContrato = miSistema.clienteTieneContratacion(clienteId);
	console.log(miSistema.clienteTieneContratacion(20));
	// Muestro la seccion Cliente
	document.querySelector("#sectionUsuarioLogueado").style.display = "block";

	// Ahora voy a controla si tenia contratacion
	if (tieneContrato) {
		let divContratado = document.querySelector("#divMostrarContratado");
		divContratado.style.display = "block";

		// SE NECESITA AGREGAR CONTRATACION VIGENTE. INFO MAS BOTON DE CANCELACION.
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

//#region  ## SECCION PASEADOR

function mostrarSeccionPaseadorUI() {
	if (miSistema.logueado !== null) {
		document.querySelector("#sectionPaseadoresLogueado").style.display = "block";
		mostrarTablaContratacionesPendientesUI(); // Tabla de Contrataciones de Pendientes
		//se debe informar al paseador claramente si la contratación se aprobó o rechazó cuál fue el motivo.
		//y el porcentaje de cupos que tiene actualment asignados.
		//Si el paseador no tiene perros asignados se mostrará un mensaje de que no hay perro asignados actualmente.
		mostrarEstadoPaseadorUI();
	} else {
		loginUI();
	}
}

function mostrarTablaContratacionesPendientesUI() {
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
	let seccionPaseadorSideBar = document.querySelector("#mostrarEstadoPaseador");
	let laTabla = miSistema.armarEstadoPaseador();
	seccionPaseadorSideBar.style.display = "block";
	seccionPaseadorSideBar.innerHTML = laTabla;
}

function gestionContratacionesProcensandoUI() {
	//la primera vez que voy a a procesar los alquileres.
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
