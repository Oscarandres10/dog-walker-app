function eventos (){
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfaz); // Registrarse
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfaz); 
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotros); 
	document.querySelector("#btnOtro").addEventListener("click", otro); 
	document.querySelector("#btnPaseadorRegistro").addEventListener("click", serUnPaseador); 
	document.querySelector("#btnRegistrarme").addEventListener("click", almacenar); 


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

//luego muestro el sobre nostros y los botones para log in y registrarse 

function mostrarSobreNosotros(){
	ocultarTodo()
	document.querySelector("#sectionSobreNosotros").style.display = "block";
}

/* #### BOTONES NAVEGADOR ####*/ 

function serUnPaseador(){
	ocultarTodo()
	document.querySelector("#sectionFormularioPaseador").style.display = "block";

}
function otro(){
	ocultarTodo()
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

function loginUI(){
	let mensaje = ""
	let usuario = document.querySelector("#txtUsuario").value;
	let contrasenia = document.querySelector("#txtContrasenia").value;

	if(login(usuario, contrasenia)){
		ocultarTodo()
		if(logueado.tipo === "cliente"){
			ocultarTodo()
			document.querySelector("#sectionUsuarioLogeado").style.display = "block";
		
		}
		if(logueado.tipo === "paseador"){
			ocultarTodo()
			document.querySelector("#sectionPaseadores").style.display = "block";

		}
	}else{
		mensaje = "Verifique usuario y contraseña...";
	}
	document.querySelector("#pLogin").innerHTML = mensaje;

}



/* #### ALMACENADO DE DATOS ####*/

function almacenar (){
	let mensaje = ""
	let nombre = document.querySelector("#txtUsuarioCliente").value;
	let contrasenia = document.querySelector("#txtContraseniaCliente").value;
	let nombrePerro = document.querySelector("#txtNombrePerroCliente").value;
	let tamanio = document.querySelector("#selTamanioCliente").value;
	let validaciones = true
	//agregar validaciones 
	if(validaciones){
		let nuevoCliente = new Cliente();
		nuevoCliente.nombre = nombre;
		nuevoCliente.contrasenia = contrasenia;
		nuevoCliente.perro = nombrePerro;
		nuevoCliente.tamanio = tamanio;
		
		clientes.push(nuevoCliente);
		mensaje = `Usuario ${nombre} registro correctamente `
	}

	document.querySelector("#pRegistrarse").innerHTML = mensaje
	
}



