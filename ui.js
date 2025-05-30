document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfaz); // MUESTRO INTERFAZ LOGIN
document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfaz); // LOGIN CLIENTE

function loginInterfaz() {
	// Interfaz Login VISTO

	//   CAMBIAR PARA USAR CON CLASES

	document.querySelector("#loginUsuario").style.display = `block`;
}

function registroInterfaz() {
	// Interfaz Registro VISTO

	//   CAMBIAR PARA USAR CON CLASES

	document.querySelector("#formularioRegistroUsuario").style.display = `block`;
}
