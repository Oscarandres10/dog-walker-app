// Variables Globales
///---------------------------------///
let login = false;

//-----------------------------------//

// VERIFICO CONTRASEÑA MAYOR A 5, Al menos una mayuscula, una minuscula, y un numero
function verificarContrasenia(pass) {
	let verificacion = true;
	let mayus = 0;
	let minus = 0;
	let numero = 0;

	// Verificacion Vacio
	if (pass.length <= 5) {
		verificacion = false;
	}

	// Verificacion Letras
	if (verificacion) {
		for (let x = 0; x < pass.length; x++) {
			let letra = pass.charAt(x);
			let letraMinus = pass.toLowerCase().charAt(x);
			let letraMayus = pass.toUpperCase().charAt(x);
			if (letra === letraMayus) mayus++;
			if (letra === letraMinus) minus++;
			if (!isNaN(letra)) numero++;
		}
		// Verifico que mayus minus y numero  tengan por lo menos 1 character
		if (minus < 1 || mayus < 1 || numero < 1) {
			verificacion = false;
		}
	}
	return verificacion;
}

function inicioSesion(user, pass) {
	login = true;
}
function cerrarSession() {
	login = false;
}
