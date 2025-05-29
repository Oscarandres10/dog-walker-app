class Cliente {
	static idClientes = 0;
	constructor() {
		this.id = Cliente.idClientes++;
		this.nombre = "";
		this.contrasenia = "";
		this.perro = "";
		this.tamanio = "";
	}
}

class Paseador {
	static idPaseador = 0;
	constructor() {
		this.id = Paseador.idPaseador++;
		this.nombre = "";
		this.usuario = "";
		this.contrasenia = "";
		this.cupo = -1;
	}
}

/* 

clases

sistema

UI

*/
