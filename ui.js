document.querySelector("#btnLoginCliente").addEventListener("click", loginInterfaz); // MUESTRO INTERFAZ LOGIN
document.querySelector("#btnRegistarCliente").addEventListener("click", registroInterfaz); // LOGIN CLIENTE

function loginInterfaz() {
	// Interfaz Login VISTO
	document.querySelector("#loginUsuario").style.display = `block`;
}

function registroInterfaz() {
	// Interfaz Registro VISTO
	document.querySelector("#formularioRegistroUsuario").style.display = `block`;
}
