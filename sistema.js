let clientes = new Array();
let paseadores = new Array();
let contrataciones = new Array();
let logueado = null 
/* #### CLIENTES ####*/

/* PRECARGA CLIENTES */
precargaClientes()
function precargaClientes() {
	let cliente1 = new Cliente();
	cliente1.nombre = "JuanPerez";
	cliente1.usuario = "JPerez"
	cliente1.contrasenia = "JP123!";
	cliente1.perro = "Rocky";
	cliente1.tamanio = "Grande";
	clientes.push(cliente1);

	let cliente2 = new Cliente();
	cliente2.nombre = "MariaLopez";
	cliente2.usuario = "MLopez";
	cliente2.contrasenia = "ML123!";
	cliente2.perro = "Bella";
	cliente2.tamanio = "Mediano";
	clientes.push(cliente2);

	let cliente3 = new Cliente();
	cliente3.nombre = "CarlosGomez";
	cliente3.usuario = "CGomez";
	cliente3.contrasenia = "CG123!";
	cliente3.perro = "Thor";
	cliente3.tamanio = "Grande";
	clientes.push(cliente3);

	let cliente4 = new Cliente();
	cliente4.nombre = "AnaMartinez";
	cliente4.usuario = "AMartinez";
	cliente4.contrasenia = "AM123!";
	cliente4.perro = "Lola";
	cliente4.tamanio = "Chico";
	clientes.push(cliente4);

	let cliente5 = new Cliente();
	cliente5.nombre = "PedroCastro";
	cliente5.usuario = "PCastro";
	cliente5.contrasenia = "PC123!";
	cliente5.perro = "Max";
	cliente5.tamanio = "Mediano";
	clientes.push(cliente5);

	let cliente6 = new Cliente();
	cliente6.nombre = "SofiaRivera";
	cliente6.usuario = "SRivera";
	cliente6.contrasenia = "SR123!";
	cliente6.perro = "Nala";
	cliente6.tamanio = "Chico";
	clientes.push(cliente6);

	let cliente7 = new Cliente();
	cliente7.nombre = "TomasRuiz";
	cliente7.usuario = "TRuiz";
	cliente7.contrasenia = "TR123!";
	cliente7.perro = "Zeus";
	cliente7.tamanio = "Grande";
	clientes.push(cliente7);
	
	let cliente8 = new Cliente();
	cliente8.nombre = "KarenTorres";
	cliente8.usuario = "KTorres";
	cliente8.contrasenia = "KT123!";
	cliente8.perro = "Maya";
	cliente8.tamanio = "Mediano";
	clientes.push(cliente8);

	let cliente9 = new Cliente();
	cliente9.nombre = "FernandoZapata";
	cliente9.usuario = "FZapata";
	cliente9.contrasenia = "FZ123!";
	cliente9.perro = "Toby";
	cliente9.tamanio = "Chico";
	clientes.push(cliente9);

	let cliente10 = new Cliente();
	cliente10.nombre = "LauraMendoza";
	cliente10.usuario = "LMendoza";
	cliente10.contrasenia = "LM123!";
	cliente10.perro = "Simba";
	cliente10.tamanio = "Grande";
	clientes.push(cliente10);


}


function precargaUnCliente(pNom, pUsuario, pPass, pPerro, pTamanio){
	let unCliente = new Cliente ();
		unCliente.nombre = pNom;
		unCliente.usuario = pUsuario;
		unCliente.contrasenia = pPass;
		unCliente.perro = pPerro;
		unCliente.tamanio = pTamanio;
		clientes.push(unCliente);
	
}

function login(pUsuario, pPass){
	let valido = false
	let i = 0
	while (!valido && i < clientes.length){
		let clienteX = clientes[i];
		if(clienteX.usuario === pUsuario){
			if(clienteX.contrasenia === pPass){
				valido = true;
				logueado = clienteX;
			}
		}
		i++
	}
	let x = 0;
	while (!valido && x < paseadores.length){
		let paseadorX = paseadores[x];
		if(paseadorX.usuario === pUsuario){
			
			if(paseadorX.contrasenia === pPass){
				valido = true;
				logueado = paseadorX;
			}
		}
		x++;
		
		
	}
	console.log(logueado)
	return valido;
}



/* #### PASEADORES ####*/

/*PRECARGA PASEADORES*/

precargaPaseador()
function precargaPaseador() {
	let paseador1 = new Paseador();
	paseador1.nombre = "OscarRodriguez";
	paseador1.usuario = "ORodriguez";
	paseador1.contrasenia = "OR123!";
	paseador1.cupo = 6;
	paseadores.push(paseador1);

	let paseador2 = new Paseador();
	paseador2.nombre = "FacundoPerdomo";
	paseador2.usuario = "FPerdomo";
	paseador2.contrasenia = "FP123!";
	paseador2.cupo = 6;
	paseadores.push(paseador2);

}

function armarTablaPaseadores(){
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
	for (let i = 0; i< paseadores.length; i++){
		let unPaseador = paseadores[i];
		//agregar validaciones. Falta agregar el "data" del boton
		unaTabla += 
		`<tr>
			<td>${unPaseador.id}</td>
			<td>${unPaseador.nombre}</td>
			<td>${unPaseador.usuario}</td>
			<td>${unPaseador.contrasenia}</td>
			<td>${unPaseador.cupo}</td>
			<td>${unPaseador.tipo}</td>
			<td><input type=button value="Solicitar"></td>
		</tr>`
		
	}
	unaTabla+= `</table>`;
	return unaTabla

}


/* 
}
function mostrarTabla() {
    let laTabla = armarTablaPromedios();
    document.querySelector("#divParaTabla").innerHTML = laTabla;
}


	*/
