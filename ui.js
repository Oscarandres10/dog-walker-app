function eventos() {
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfazUI); // Registrarse
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfazUI);
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotrosUI);
	document.querySelector("#btnOtro").addEventListener("click", otroUI);
	document.querySelector("#btnPaseadorRegistro").addEventListener("click", serUnPaseadorUI);
	document.querySelector("#btnRegistrarme").addEventListener("click", almacenarUI);
	document.querySelector("#btnLogin").addEventListener("click", loginUI);
	document.querySelector("#btnLogoutCliente").addEventListener("click", logoutUI);
	document.querySelector("#bntMostrarTabla").addEventListener("click", mostrarTablaPaseadoresUI);
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
		unaTabla.innerHTML = ``;
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
			/* document.querySelector("#sectionUsuarioLogueado").style.display = "block"; */
			mostrarSeccionClienteUI();
			ocultarNavUI();
			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueadoUI(
				miSistema.logueado.id,
				miSistema.logueado.tipo
			);
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
		if (miSistema.logueado.tipo === "paseador") {
			ocultarTodoUI();
			document.querySelector("#sectionPaseadores").style.display = "block";
			ocultarNavUI();

			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueadoUI(
				miSistema.logueado.id,
				miSistema.logueado.tipo
			);
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
	} else {
		mensaje = "Verifique usuario y contraseña...";
	}
	document.querySelector("#pLogin").innerHTML = mensaje;
}

function mostrarLogueadoUI(id, tipo) {
	let elCliente = `<p>Bienvenido <strong>${miSistema.logueado.nombre}</strong></p>`;
	return elCliente;
}

function mostrarSeccionClienteUI() {
	if (miSistema.logueado !== null) {
		document.querySelector("#sectionUsuarioLogueado").style.display = "block";
	} else {
		loginUI();
	}
}

/* #### LOGOUT ####*/

function logoutUI() {
	let mensaje = "";
	ocultarTodoUI();
	mostrarNavUI();
	ocultarTablasUI();
	document.querySelector("#pMostrarlogueado").innerHTML = ``;
	document.querySelector("#btnLogoutCliente").style.display = `none`;
}

/* #### Tablas #### */

function mostrarTablaPaseadoresUI() {
	let laTabla = miSistema.armarTablaPaseadores();
	document.querySelector("#mostrarTablaPaseadores").innerHTML = laTabla;
	darVidaBotonesTablaPaseadores();
}
function darVidaBotonesTablaPaseadores() {
	let losBotones = document.querySelectorAll(".botonesTablaPaseadores");
	for (let unBoton of losBotones) {
		unBoton.addEventListener("click", clickEnSolicitar);
	}
}

function clickEnSolicitar() {
	let valorData = this.getAttribute("data-id");
	let idPaseadorTxt = valorData.substr(11, valorData.length);
	let paseador = miSistema.obtenerPaseador(idPaseadorTxt);
	if (paseador != null) {
		gestionPaseadores(paseador);
	}
	console.log(valorData);
	return valorData;
}

function obtenerListaPaseadores(pId) {
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
}

/* #### ALMACENADO DE DATOS ####*/

function almacenarUI() {
	let mensaje = "";
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
		mensaje = `Usuario ${nombre} registro correctamente`;
	} else {
		mensaje = `ERROR: Intente nuevamente..<br><br>
		<strong>Nombre</strong> no pude estar vacio.<br>
		<strong>Usuario</strong> ya existe<br>
		<strong>Contraseña</strong> tiene que tener mínimo 5 caracteres, y incluir al menos una mayúscula, una minúscula y un número<br>
		<strong>Nombre</strong> de Perro No puede estar Vacio.<br>
		<strong>Tamaño</strong> no puede estar vacio<br>
		`;
	}

	document.querySelector("#pRegistrarse").innerHTML = mensaje;
}

//#region  ##  PASEADOR INTERFAZ

function mostrarTablaContratacionesPendientesUI() {
	let laTabla = miSistema.armarTablaContrataciones();
	document.querySelector("#mostrarTablaContratacionesPendientes").innerHTML = laTabla;
}

function mostrarTablaContratacionesAceptadasUI() {
	let laTabla = miSistema.armarTablaContratacionesAceptadas();
	document.querySelector("#mostrarTablaContratacionesAceptadas").innerHTML = laTabla;
}

//#endregion
