function eventos (){
	document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfaz); // Registrarse
	document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfaz); // MUESTRO INTERFAZ LOGIN
	document.querySelector("#btnNosotros").addEventListener("click", mostrarSobreNosotros); // MUESTRO INTERFAZ LOGIN
	document.querySelector("#btnOtro").addEventListener("click", otro); // MUESTRO INTERFAZ LOGIN
	document.querySelector("#btnPaseadorRegistro").addEventListener("click", serUnPaseador); // MUESTRO INTERFAZ LOGIN


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
			//mostrar seccion cliente
		}
		if(logueado.tipo === "paseador"){
			//mostrar seccion paseador
		}
	}else{
		mensaje = "Verifique usuario y contraseña...";
	}
	document.querySelector("#pLogin").innerHTML = mensaje;




}