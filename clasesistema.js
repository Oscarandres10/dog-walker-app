class Sistema {
	constructor() {
		this.listaGeneros = new Array();
		this.clientes = new Array();
		this.paseadores = new Array();
		this.contrataciones = new Array();
		this.logueado = null;
	}

	/* #### CLIENTES ####*/
	/* PRECARGA CLIENTES */

	precargarTodo() {
		this.precargaClientes();
		this.precargaPaseador();
	}

	precargaClientes() {
		let nombre1 = "JuanPerez";
		let usuario1 = "JPerez";
		let contrasenia1 = "Jp123!";
		let perroNombre1 = "Rocky";
		let tamanioPerro1 = "Grande";
		if (this.validacionRegistroCliente(nombre1, usuario1, contrasenia1, perroNombre1, tamanioPerro1)) {
			this.cargaUnCliente(nombre1, usuario1, contrasenia1, perroNombre1, tamanioPerro1);
		}

		let nombre2 = "MariaLopez";
		let usuario2 = "MLopez";
		let contrasenia2 = "Ml123!";
		let perroNombre2 = "Bella";
		let tamanioPerro2 = "Mediano";
		if (this.validacionRegistroCliente(nombre2, usuario2, contrasenia2, perroNombre2, tamanioPerro2)) {
			this.cargaUnCliente(nombre2, usuario2, contrasenia2, perroNombre2, tamanioPerro2);
		}

		let nombre3 = "CarlosGomez";
		let usuario3 = "CGomez";
		let contrasenia3 = "Cg123!";
		let perroNombre3 = "Thor";
		let tamanioPerro3 = "Grande";
		if (this.validacionRegistroCliente(nombre3, usuario3, contrasenia3, perroNombre3, tamanioPerro3)) {
			this.cargaUnCliente(nombre3, usuario3, contrasenia3, perroNombre3, tamanioPerro3);
		}

		let nombre4 = "AnaMartinez";
		let usuario4 = "AMartinez";
		let contrasenia4 = "Am123!";
		let perroNombre4 = "Lola";
		let tamanioPerro4 = "Chico";
		if (this.validacionRegistroCliente(nombre4, usuario4, contrasenia4, perroNombre4, tamanioPerro4)) {
			this.cargaUnCliente(nombre4, usuario4, contrasenia4, perroNombre4, tamanioPerro4);
		}

		let nombre5 = "PedroCastro";
		let usuario5 = "PCastro";
		let contrasenia5 = "Pc123!";
		let perroNombre5 = "Max";
		let tamanioPerro5 = "Mediano";
		if (this.validacionRegistroCliente(nombre5, usuario5, contrasenia5, perroNombre5, tamanioPerro5)) {
			this.cargaUnCliente(nombre5, usuario5, contrasenia5, perroNombre5, tamanioPerro5);
		}

		let nombre6 = "SofiaRivera";
		let usuario6 = "SRivera";
		let contrasenia6 = "Sr123!";
		let perroNombre6 = "Nala";
		let tamanioPerro6 = "Chico";
		if (this.validacionRegistroCliente(nombre6, usuario6, contrasenia6, perroNombre6, tamanioPerro6)) {
			this.cargaUnCliente(nombre6, usuario6, contrasenia6, perroNombre6, tamanioPerro6);
		}

		let nombre7 = "TomasRuiz";
		let usuario7 = "TRuiz";
		let contrasenia7 = "Tr123!";
		let perroNombre7 = "Zeus";
		let tamanioPerro7 = "Grande";
		if (this.validacionRegistroCliente(nombre7, usuario7, contrasenia7, perroNombre7, tamanioPerro7)) {
			this.cargaUnCliente(nombre7, usuario7, contrasenia7, perroNombre7, tamanioPerro7);
		}

		let nombre8 = "KarenTorres";
		let usuario8 = "KTorres";
		let contrasenia8 = "Kt123!";
		let perroNombre8 = "Maya";
		let tamanioPerro8 = "Mediano";
		if (this.validacionRegistroCliente(nombre8, usuario8, contrasenia8, perroNombre8, tamanioPerro8)) {
			this.cargaUnCliente(nombre8, usuario8, contrasenia8, perroNombre8, tamanioPerro8);
		}

		let nombre9 = "FernandoZapata";
		let usuario9 = "FZapata";
		let contrasenia9 = "Fz123!";
		let perroNombre9 = "Toby";
		let tamanioPerro9 = "Chico";
		if (this.validacionRegistroCliente(nombre9, usuario9, contrasenia9, perroNombre9, tamanioPerro9)) {
			this.cargaUnCliente(nombre9, usuario9, contrasenia9, perroNombre9, tamanioPerro9);
		}

		let nombre10 = "LauraMendoza";
		let usuario10 = "LMendoza";
		let contrasenia10 = "Lm123!";
		let perroNombre10 = "Simba";
		let tamanioPerro10 = "Grande";
		if (this.validacionRegistroCliente(nombre10, usuario10, contrasenia10, perroNombre10, tamanioPerro10)) {
			this.cargaUnCliente(nombre10, usuario10, contrasenia10, perroNombre10, tamanioPerro10);
		}

		let nombre11 = "LuisSanchez";
		let usuario11 = "LSanchez";
		let contrasenia11 = "Ls123!";
		let perroNombre11 = "Rex";
		let tamanioPerro11 = "Grande";
		if (this.validacionRegistroCliente(nombre11, usuario11, contrasenia11, perroNombre11, tamanioPerro11)) {
			this.cargaUnCliente(nombre11, usuario11, contrasenia11, perroNombre11, tamanioPerro11);
		}

		let nombre12 = "CarmenVega";
		let usuario12 = "CVega";
		let contrasenia12 = "Cv123!";
		let perroNombre12 = "Luna";
		let tamanioPerro12 = "Mediano";
		if (this.validacionRegistroCliente(nombre12, usuario12, contrasenia12, perroNombre12, tamanioPerro12)) {
			this.cargaUnCliente(nombre12, usuario12, contrasenia12, perroNombre12, tamanioPerro12);
		}

		let nombre13 = "JorgeRamirez";
		let usuario13 = "JRamirez";
		let contrasenia13 = "Jr123!";
		let perroNombre13 = "Buddy";
		let tamanioPerro13 = "Grande";
		if (this.validacionRegistroCliente(nombre13, usuario13, contrasenia13, perroNombre13, tamanioPerro13)) {
			this.cargaUnCliente(nombre13, usuario13, contrasenia13, perroNombre13, tamanioPerro13);
		}

		let nombre14 = "PatriciaFlores";
		let usuario14 = "PFlores";
		let contrasenia14 = "Pf123!";
		let perroNombre14 = "Daisy";
		let tamanioPerro14 = "Chico";
		if (this.validacionRegistroCliente(nombre14, usuario14, contrasenia14, perroNombre14, tamanioPerro14)) {
			this.cargaUnCliente(nombre14, usuario14, contrasenia14, perroNombre14, tamanioPerro14);
		}

		let nombre15 = "RobertoJimenez";
		let usuario15 = "RJimenez";
		let contrasenia15 = "Rj123!";
		let perroNombre15 = "Duke";
		let tamanioPerro15 = "Mediano";
		if (this.validacionRegistroCliente(nombre15, usuario15, contrasenia15, perroNombre15, tamanioPerro15)) {
			this.cargaUnCliente(nombre15, usuario15, contrasenia15, perroNombre15, tamanioPerro15);
		}

		let nombre16 = "DanielaOrtega";
		let usuario16 = "DOrtega";
		let contrasenia16 = "Do123!";
		let perroNombre16 = "Coco";
		let tamanioPerro16 = "Chico";
		if (this.validacionRegistroCliente(nombre16, usuario16, contrasenia16, perroNombre16, tamanioPerro16)) {
			this.cargaUnCliente(nombre16, usuario16, contrasenia16, perroNombre16, tamanioPerro16);
		}

		let nombre17 = "AndresHerrera";
		let usuario17 = "AHerrera";
		let contrasenia17 = "Ah123!";
		let perroNombre17 = "Bruno";
		let tamanioPerro17 = "Grande";
		if (this.validacionRegistroCliente(nombre17, usuario17, contrasenia17, perroNombre17, tamanioPerro17)) {
			this.cargaUnCliente(nombre17, usuario17, contrasenia17, perroNombre17, tamanioPerro17);
		}

		let nombre18 = "MonicaSilva";
		let usuario18 = "MSilva";
		let contrasenia18 = "Ms123!";
		let perroNombre18 = "Lucy";
		let tamanioPerro18 = "Mediano";
		if (this.validacionRegistroCliente(nombre18, usuario18, contrasenia18, perroNombre18, tamanioPerro18)) {
			this.cargaUnCliente(nombre18, usuario18, contrasenia18, perroNombre18, tamanioPerro18);
		}

		let nombre19 = "GabrielRojas";
		let usuario19 = "GRojas";
		let contrasenia19 = "Gr123!";
		let perroNombre19 = "Oreo";
		let tamanioPerro19 = "Chico";
		if (this.validacionRegistroCliente(nombre19, usuario19, contrasenia19, perroNombre19, tamanioPerro19)) {
			this.cargaUnCliente(nombre19, usuario19, contrasenia19, perroNombre19, tamanioPerro19);
		}

		let nombre20 = "BeatrizMedina";
		let usuario20 = "BMedina";
		let contrasenia20 = "Bm123!";
		let perroNombre20 = "Stella";
		let tamanioPerro20 = "Grande";
		if (this.validacionRegistroCliente(nombre20, usuario20, contrasenia20, perroNombre20, tamanioPerro20)) {
			this.cargaUnCliente(nombre20, usuario20, contrasenia20, perroNombre20, tamanioPerro20);
		}
	}

	cargaUnCliente(pNom, pUsuario, pPass, pPerro, pTamanio) {
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

	precargaPaseador() {
		let nombre1 = "OscarRodriguez";
		let usuario1 = "ORodriguez";
		let contrasenia1 = "Or123!";
		let cupo1 = 5;
		if (this.validacionRegistroPaseador(nombre1, usuario1, contrasenia1, cupo1)) {
			this.cargaUnPaseador(nombre1, usuario1, contrasenia1, cupo1);
		}
		let nombre2 = "FacundoPerdomo";
		let usuario2 = "FPerdomo";
		let contrasenia2 = "Fp123!";
		let cupo2 = 8;
		if (this.validacionRegistroPaseador(nombre2, usuario2, contrasenia2, cupo2)) {
			this.cargaUnPaseador(nombre2, usuario2, contrasenia2, cupo2);
		}
		let nombre3 = "GonzaloGentile";
		let usuario3 = "GGentile";
		let contrasenia3 = "Gg123!";
		let cupo3 = 6;
		if (this.validacionRegistroPaseador(nombre3, usuario3, contrasenia3, cupo3)) {
			this.cargaUnPaseador(nombre3, usuario3, contrasenia3, cupo3);
		}
		let nombre4 = "MatiasFarias";
		let usuario4 = "MFarias";
		let contrasenia4 = "Mf123!";
		let cupo4 = 12;
		if (this.validacionRegistroPaseador(nombre4, usuario4, contrasenia4, cupo4)) {
			this.cargaUnPaseador(nombre4, usuario4, contrasenia4, cupo4);
		}
		let nombre5 = "MarceloBielsa";
		let usuario5 = "MBielsa";
		let contrasenia5 = "Mb123!";
		let cupo5 = 10;
		if (this.validacionRegistroPaseador(nombre5, usuario5, contrasenia5, cupo5)) {
			this.cargaUnPaseador(nombre5, usuario5, contrasenia5, cupo5);
		}
	}

	cargaUnPaseador(pNom, pUsuario, pPass, pCupo) {
		let unPaseador = new Paseador();
		unPaseador.nombre = pNom;
		unPaseador.usuario = pUsuario;
		unPaseador.contrasenia = pPass;
		unPaseador.cupo = pCupo;
		this.paseadores.push(unPaseador);
	}

	/* =============== */
	/* #### TABLAS ####*/

	armarTablaPaseadores() {
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
		for (let i = 0; i < this.paseadores.length; i++) {
			let unPaseador = this.paseadores[i];
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

	validacionRegistroCliente(nombre, usuario, contrasenia, perro, tamanio) {
		let valido = false;
		if (
			nombre.length > 0 &&
			this.validarUsuario(usuario) &&
			this.validarContrasenia(contrasenia) &&
			perro.length > 0 &&
			tamanio !== ""
		) {
			valido = true;
		}
		return valido;
	}

	validarUsuario(pUsuario) {
		let usuario = pUsuario.toLowerCase().trim(); // Convierto texto a lowercase
		let valido = true;
		let i = 0;
		while (i < this.clientes.length && valido) {
			let unicoUsuario = this.clientes[i];
			if (unicoUsuario.usuario.toLowerCase() === usuario) {
				valido = false;
			}
			i++;
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

	validacionRegistroPaseador(nombre, usuario, contrasenia, cupo) {
		let valido = false;
		if (nombre.length > 0 && this.validarUsuario(usuario) && this.validarContrasenia(contrasenia) && cupo > 0) {
			valido = true;
		}
		return valido;
	}
}
