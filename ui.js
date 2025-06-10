function eventos() {
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfaz); // Registrarse
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfaz);
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotros);
	document.querySelector("#btnOtro").addEventListener("click", otro);
	document.querySelector("#btnPaseadorRegistro").addEventListener("click", serUnPaseador);
	document.querySelector("#btnRegistrarme").addEventListener("click", almacenar);
	document.querySelector("#btnLogin").addEventListener("click", loginUI);
	document.querySelector("#btnLogoutCliente").addEventListener("click", logoutUI);
	document.querySelector("#bntMostrarTabla").addEventListener("click", mostrarTablaPaseadores);
}
eventos();
ocultarTodo();
mostrarSobreNosotros();

//primero oculto todo (dejando unicamente el navegador y el footer). Navegador y footer tiene seccionesNavegador y seccionesFooter como class para cuando las querramos ocultar
function ocultarTodo() {
	let lasSecciones = document.querySelectorAll(".secciones");
	for (let unaSeccion of lasSecciones) {
		unaSeccion.style.display = "none";
	}
}

function ocultarNav() {
	let losNavLinks = document.querySelectorAll(".navOculto");
	for (let unNavLink of losNavLinks) {
		unNavLink.style.display = "none";
	}
}

function mostrarNav() {
	let losNavLinks = document.querySelectorAll(".navOculto");
	for (let unNavLink of losNavLinks) {
		unNavLink.style.display = "block";
	}
}

//luego muestro el sobre nostros y los botones para log in y registrarse

function mostrarSobreNosotros() {
	ocultarTodo();
	document.querySelector("#sectionSobreNosotros").style.display = "block";
}

/* #### BOTONES NAVEGADOR ####*/

function serUnPaseador() {
	ocultarTodo();
	document.querySelector("#sectionFormularioPaseador").style.display = "block";
}
function otro() {
	ocultarTodo();
	//si quisieramos mostrar algo mas....
}

/* #### REGISTRO ####*/
function registroInterfaz() {
	ocultarTodo();
	document.querySelector("#sectionRegistrarse").style.display = "block";
}

/* #### LOGIN ####*/

function loginInterfaz() {
	ocultarTodo();
	document.querySelector("#sectionloginUsuario").style.display = "block";
}

function loginUI() {
	let mensaje = "";
	let usuario = document.querySelector("#txtUsuario").value;
	let contrasenia = document.querySelector("#txtContrasenia").value;

	if (login(usuario, contrasenia)) {
		ocultarTodo();
		if (logueado.tipo === "cliente") {
			ocultarTodo();
			document.querySelector("#sectionUsuarioLogueado").style.display = "block";
			ocultarNav();
			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueado(logueado.id, logueado.tipo);
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
		if (logueado.tipo === "paseador") {
			ocultarTodo();
			document.querySelector("#sectionPaseadores").style.display = "block";
			ocultarNav();
			document.querySelector("#pMostrarlogueado").innerHTML = mostrarLogueado(logueado.id, logueado.tipo);
			document.querySelector("#btnLogoutCliente").style.display = `block`;
		}
	} else {
		mensaje = "Verifique usuario y contraseña...";
	}
	document.querySelector("#pLogin").innerHTML = mensaje;
}

function mostrarLogueado(id, tipo) {
	let elCliente = `<p>Bienvenido <strong>${logueado.nombre}</strong></p>`;
	return elCliente;
}

/* #### LOGOUT ####*/

function logoutUI() {
	let mensaje = "";
	ocultarTodo();
	mostrarNav();
	document.querySelector("#pMostrarlogueado").innerHTML = ``;
	document.querySelector("#btnLogoutCliente").style.display = `none`;
}

/* #### Tablas #### */
function mostrarTablaPaseadores() {
	let laTabla = armarTablaPaseadores();
	document.querySelector("#mostrarTablaPaseadores").innerHTML = laTabla;
}

/* #### ALMACENADO DE DATOS ####*/

function almacenar() {
	let mensaje = "";
	let nombre = document.querySelector("#txtNombreCliente").value;
	let usuario = document.querySelector("#txtUsuarioCliente").value;
	let contrasenia = document.querySelector("#txtContraseniaCliente").value;
	let nombrePerro = document.querySelector("#txtNombrePerroCliente").value;
	let tamanioPerro = document.querySelector("#selTamanioCliente").value;
	let validaciones = validacionRegistroCliente(nombre, usuario, contrasenia, nombrePerro, tamanioPerro);
	/* ####################################################### */
	//validaciones = true; // BORRAR ESTO PARA USAR VALIDACIONES
	//agregar validaciones
	if (validaciones) {
		let nuevoCliente = new Cliente();
		nuevoCliente.nombre = nombre;
		nuevoCliente.usuario = usuario;
		nuevoCliente.contrasenia = contrasenia;
		nuevoCliente.perroNombre = nombrePerro;
		nuevoCliente.tamanioPerro = tamanioPerro;

		clientes.push(nuevoCliente);
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
