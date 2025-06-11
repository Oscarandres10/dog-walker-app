let clientes = new Array();
let paseadores = new Array();
let contrataciones = new Array();
let logueado = null;
/* #### CLIENTES ####*/

/* PRECARGA CLIENTES */

precargaClientes();
precargaPaseador();

function precargaClientes() {
	nombre1 = "JuanPerez";
	usuario1 = "JPerez";
	contrasenia1 = "Jp123!";
	perroNombre1 = "Rocky";
	tamanioPerro1 = "Grande";
	if (validacionRegistroCliente(nombre1, usuario1, contrasenia1, perroNombre1, tamanioPerro1)) {
		cargaUnCliente(nombre1, usuario1, contrasenia1, perroNombre1, tamanioPerro1);
	}

	nombre2 = "MariaLopez";
	usuario2 = "MLopez";
	contrasenia2 = "Ml123!";
	perroNombre2 = "Bella";
	tamanioPerro2 = "Mediano";
	if (validacionRegistroCliente(nombre2, usuario2, contrasenia2, perroNombre2, tamanioPerro2)) {
		cargaUnCliente(nombre2, usuario2, contrasenia2, perroNombre2, tamanioPerro2);
	}

	nombre3 = "CarlosGomez";
	usuario3 = "CGomez";
	contrasenia3 = "Cg123!";
	perroNombre3 = "Thor";
	tamanioPerro3 = "Grande";
	if (validacionRegistroCliente(nombre3, usuario3, contrasenia3, perroNombre3, tamanioPerro3)) {
		cargaUnCliente(nombre3, usuario3, contrasenia3, perroNombre3, tamanioPerro3);
	}

	nombre4 = "AnaMartinez";
	usuario4 = "AMartinez";
	contrasenia4 = "Am123!";
	perroNombre4 = "Lola";
	tamanioPerro4 = "Chico";
	if (validacionRegistroCliente(nombre4, usuario4, contrasenia4, perroNombre4, tamanioPerro4)) {
		cargaUnCliente(nombre4, usuario4, contrasenia4, perroNombre4, tamanioPerro4);
	}

	nombre5 = "PedroCastro";
	usuario5 = "PCastro";
	contrasenia5 = "Pc123!";
	perroNombre5 = "Max";
	tamanioPerro5 = "Mediano";
	if (validacionRegistroCliente(nombre5, usuario5, contrasenia5, perroNombre5, tamanioPerro5)) {
		cargaUnCliente(nombre5, usuario5, contrasenia5, perroNombre5, tamanioPerro5);
	}

	nombre6 = "SofiaRivera";
	usuario6 = "SRivera";
	contrasenia6 = "Sr123!";
	perroNombre6 = "Nala";
	tamanioPerro6 = "Chico";
	if (validacionRegistroCliente(nombre6, usuario6, contrasenia6, perroNombre6, tamanioPerro6)) {
		cargaUnCliente(nombre6, usuario6, contrasenia6, perroNombre6, tamanioPerro6);
	}

	nombre7 = "TomasRuiz";
	usuario7 = "TRuiz";
	contrasenia7 = "Tr123!";
	perroNombre7 = "Zeus";
	tamanioPerro7 = "Grande";
	if (validacionRegistroCliente(nombre7, usuario7, contrasenia7, perroNombre7, tamanioPerro7)) {
		cargaUnCliente(nombre7, usuario7, contrasenia7, perroNombre7, tamanioPerro7);
	}

	nombre8 = "KarenTorres";
	usuario8 = "KTorres";
	contrasenia8 = "Kt123!";
	perroNombre8 = "Maya";
	tamanioPerro8 = "Mediano";
	if (validacionRegistroCliente(nombre8, usuario8, contrasenia8, perroNombre8, tamanioPerro8)) {
		cargaUnCliente(nombre8, usuario8, contrasenia8, perroNombre8, tamanioPerro8);
	}

	nombre9 = "FernandoZapata";
	usuario9 = "FZapata";
	contrasenia9 = "Fz123!";
	perroNombre9 = "Toby";
	tamanioPerro9 = "Chico";
	if (validacionRegistroCliente(nombre9, usuario9, contrasenia9, perroNombre9, tamanioPerro9)) {
		cargaUnCliente(nombre9, usuario9, contrasenia9, perroNombre9, tamanioPerro9);
	}

	nombre10 = "LauraMendoza";
	usuario10 = "LMendoza";
	contrasenia10 = "Lm123!";
	perroNombre10 = "Simba";
	tamanioPerro10 = "Grande";
	if (validacionRegistroCliente(nombre10, usuario10, contrasenia10, perroNombre10, tamanioPerro10)) {
		cargaUnCliente(nombre10, usuario10, contrasenia10, perroNombre10, tamanioPerro10);
	}

	nombre11 = "LuisSanchez";
	usuario11 = "LSanchez";
	contrasenia11 = "Ls123!";
	perroNombre11 = "Rex";
	tamanioPerro11 = "Grande";
	if (validacionRegistroCliente(nombre11, usuario11, contrasenia11, perroNombre11, tamanioPerro11)) {
		cargaUnCliente(nombre11, usuario11, contrasenia11, perroNombre11, tamanioPerro11);
	}

	nombre12 = "CarmenVega";
	usuario12 = "CVega";
	contrasenia12 = "Cv123!";
	perroNombre12 = "Luna";
	tamanioPerro12 = "Mediano";
	if (validacionRegistroCliente(nombre12, usuario12, contrasenia12, perroNombre12, tamanioPerro12)) {
		cargaUnCliente(nombre12, usuario12, contrasenia12, perroNombre12, tamanioPerro12);
	}

	nombre13 = "JorgeRamirez";
	usuario13 = "JRamirez";
	contrasenia13 = "Jr123!";
	perroNombre13 = "Buddy";
	tamanioPerro13 = "Grande";
	if (validacionRegistroCliente(nombre13, usuario13, contrasenia13, perroNombre13, tamanioPerro13)) {
		cargaUnCliente(nombre13, usuario13, contrasenia13, perroNombre13, tamanioPerro13);
	}

	nombre14 = "PatriciaFlores";
	usuario14 = "PFlores";
	contrasenia14 = "Pf123!";
	perroNombre14 = "Daisy";
	tamanioPerro14 = "Chico";
	if (validacionRegistroCliente(nombre14, usuario14, contrasenia14, perroNombre14, tamanioPerro14)) {
		cargaUnCliente(nombre14, usuario14, contrasenia14, perroNombre14, tamanioPerro14);
	}

	nombre15 = "RobertoJimenez";
	usuario15 = "RJimenez";
	contrasenia15 = "Rj123!";
	perroNombre15 = "Duke";
	tamanioPerro15 = "Mediano";
	if (validacionRegistroCliente(nombre15, usuario15, contrasenia15, perroNombre15, tamanioPerro15)) {
		cargaUnCliente(nombre15, usuario15, contrasenia15, perroNombre15, tamanioPerro15);
	}

	nombre16 = "DanielaOrtega";
	usuario16 = "DOrtega";
	contrasenia16 = "Do123!";
	perroNombre16 = "Coco";
	tamanioPerro16 = "Chico";
	if (validacionRegistroCliente(nombre16, usuario16, contrasenia16, perroNombre16, tamanioPerro16)) {
		cargaUnCliente(nombre16, usuario16, contrasenia16, perroNombre16, tamanioPerro16);
	}

	nombre17 = "AndresHerrera";
	usuario17 = "AHerrera";
	contrasenia17 = "Ah123!";
	perroNombre17 = "Bruno";
	tamanioPerro17 = "Grande";
	if (validacionRegistroCliente(nombre17, usuario17, contrasenia17, perroNombre17, tamanioPerro17)) {
		cargaUnCliente(nombre17, usuario17, contrasenia17, perroNombre17, tamanioPerro17);
	}

	nombre18 = "MonicaSilva";
	usuario18 = "MSilva";
	contrasenia18 = "Ms123!";
	perroNombre18 = "Lucy";
	tamanioPerro18 = "Mediano";
	if (validacionRegistroCliente(nombre18, usuario18, contrasenia18, perroNombre18, tamanioPerro18)) {
		cargaUnCliente(nombre18, usuario18, contrasenia18, perroNombre18, tamanioPerro18);
	}

	nombre19 = "GabrielRojas";
	usuario19 = "GRojas";
	contrasenia19 = "Gr123!";
	perroNombre19 = "Oreo";
	tamanioPerro19 = "Chico";
	if (validacionRegistroCliente(nombre19, usuario19, contrasenia19, perroNombre19, tamanioPerro19)) {
		cargaUnCliente(nombre19, usuario19, contrasenia19, perroNombre19, tamanioPerro19);
	}

	nombre20 = "BeatrizMedina";
	usuario20 = "BMedina";
	contrasenia20 = "Bm123!";
	perroNombre20 = "Stella";
	tamanioPerro20 = "Grande";
	if (validacionRegistroCliente(nombre20, usuario20, contrasenia20, perroNombre20, tamanioPerro20)) {
		cargaUnCliente(nombre20, usuario20, contrasenia20, perroNombre20, tamanioPerro20);
	}
}

function cargaUnCliente(pNom, pUsuario, pPass, pPerro, pTamanio) {
	let unCliente = new Cliente();
	unCliente.nombre = pNom;
	unCliente.usuario = pUsuario;
	unCliente.contrasenia = pPass;
	unCliente.perroNombre = pPerro;
	unCliente.tamanio = pTamanio;
	this.clientes.push(unCliente);
}

/* #### PASEADORES ####*/

/*PRECARGA PASEADORES*/

function precargaPaseador() {
	nombre1 = "OscarRodriguez";
	usuario1 = "ORodriguez";
	contrasenia1 = "Or123!";
	cupo1 = 5;
	if (validacionRegistroPaseador(nombre1, usuario1, contrasenia1, cupo1)) {
		cargaUnPaseador(nombre1, usuario1, contrasenia1, cupo1);
	}
	nombre2 = "FacundoPerdomo";
	usuario2 = "FPerdomo";
	contrasenia2 = "Fp123!";
	cupo2 = 8;
	if (validacionRegistroPaseador(nombre2, usuario2, contrasenia2, cupo2)) {
		cargaUnPaseador(nombre2, usuario2, contrasenia2, cupo2);
	}
	nombre3 = "GonzaloGentile";
	usuario3 = "GGentile";
	contrasenia3 = "Gg123!";
	cupo3 = 6;
	if (validacionRegistroPaseador(nombre3, usuario3, contrasenia3, cupo3)) {
		cargaUnPaseador(nombre3, usuario3, contrasenia3, cupo3);
	}
	nombre4 = "MatiasFarias";
	usuario4 = "MFarias";
	contrasenia4 = "Mf123!";
	cupo4 = 12;
	if (validacionRegistroPaseador(nombre4, usuario4, contrasenia4, cupo4)) {
		cargaUnPaseador(nombre4, usuario4, contrasenia4, cupo4);
	}
	nombre5 = "MarceloBielsa";
	usuario5 = "MBielsa";
	contrasenia5 = "Mb123!";
	cupo5 = 10;
	if (validacionRegistroPaseador(nombre5, usuario5, contrasenia5, cupo5)) {
		cargaUnPaseador(nombre5, usuario5, contrasenia5, cupo5);
	}
}

function cargaUnPaseador(pNom, pUsuario, pPass, pCupo) {
	let unPaseador = new Paseador();
	unPaseador.nombre = pNom;
	unPaseador.usuario = pUsuario;
	unPaseador.contrasenia = pPass;
	unPaseador.cupo = pCupo;
	this.paseadores.push(unPaseador);
}

/* =============== */
/* #### TABLAS ####*/

function armarTablaPaseadores() {
	let unaTabla = `<table border="1px">
	<tr>
		<th>id</th>
		<th>Nombre</th>
		<th>Usuario</th>
		<th>Contraseñia</th>
		<th>Cupo</th>
		<th>Tipo</th>
		<th></th>

	</tr>`;
	for (let i = 0; i < paseadores.length; i++) {
		let unPaseador = paseadores[i];
		//agregar validaciones. Falta agregar el "data" del boton
		unaTabla += `<tr>
			<td>${unPaseador.id}</td>
			<td>${unPaseador.nombre}</td>
			<td>${unPaseador.usuario}</td>
			<td>${unPaseador.contrasenia}</td>
			<td>${unPaseador.cupo}</td>
			<td>${unPaseador.tipo}</td>
			<td><input type=button value="Solicitar"></td>
		</tr>`;
	}
	unaTabla += `</table>`;
	return unaTabla;
}

/* 
}
function mostrarTabla() {
    let laTabla = armarTablaPromedios();
    document.querySelector("#divParaTabla").innerHTML = laTabla;
}


	*/

/* ======================== */
/* ####  VALIDACIONES  #### */

function login(pUsuario, pPass) {
	let valido = false;
	let i = 0;
	while (!valido && i < clientes.length) {
		let clienteX = clientes[i];
		if (clienteX.usuario === pUsuario) {
			if (clienteX.contrasenia === pPass) {
				valido = true;
				logueado = clienteX;
			}
		}
		i++;
	}
	let x = 0;
	while (!valido && x < paseadores.length) {
		let paseadorX = paseadores[x];
		if (paseadorX.usuario === pUsuario) {
			if (paseadorX.contrasenia === pPass) {
				valido = true;
				logueado = paseadorX;
			}
		}
		x++;
	}
	//console.log(logueado);
	return valido;
}

function validacionRegistroCliente(nombre, usuario, contrasenia, perro, tamanio) {
	let valido = false;
	if (
		nombre.length > 0 &&
		validarUsuario(usuario) &&
		validarContrasenia(contrasenia) &&
		perro.length > 0 &&
		tamanio !== ""
	) {
		valido = true;
	}
	return valido;
}

function validarUsuario(pUsuario) {
	let usuario = pUsuario.toLowerCase().trim(); // Convierto texto a lowercase
	let valido = true;
	let i = 0;
	while (i < clientes.length && valido) {
		let unicoUsuario = clientes[i];
		if (unicoUsuario.usuario.toLowerCase() === usuario) {
			valido = false;
		}
		i++;
	}
	return valido;
}

///   NO ESTOY SEGURO SI AGREGAR  IDENTIFICAR CUANDO ES SIMBOL
// PORQUE TOMA LOS SIMBOLOS COMO MINUSCULAS
function validarContrasenia(pass) {
	let verificacion = true;
	let mayus = 0;
	let minus = 0;
	let numero = 0;

	// Verificacion Vacio
	if (verificacion && pass.length < 5) {
		verificacion = false;
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
		}
	}
	return verificacion;
}

function validacionRegistroPaseador(nombre, usuario, contrasenia, cupo) {
	let valido = false;
	if (nombre.length > 0 && validarUsuario(usuario) && validarContrasenia(contrasenia) && cupo > 0) {
		valido = true;
	}
	return valido;
}
