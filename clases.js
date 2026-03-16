class Cliente {
	static idClientes = 0;
	constructor() {
		this.id = Cliente.idClientes++;
		this.nombre = "";
		this.usuario = "";
		this.contrasenia = "";
		this.perroNombre = "";
		this.tamanioPerro = "";
		this.tipo = "cliente";
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
		this.tipo = "paseador";
	}
}

class Contrataciones {
	static idContratacion = 0;
	constructor() {
		this.id = Contrataciones.idContratacion++;
		this.Cliente = null;
		this.Paseador = null;
		this.estado = "";
		this.comentario = "";
	}
}
