class Cliente {
	static idClientes = 0;
	constructor() {
		this.id = Cliente.idClientes++;
		this.nombre = "";
		this.usuario = ""; //le agregue esto y se que se nos va a complicar, cualquier cosa lo sacamos
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
		this.cupoActual = 0;
	}
}

class Contrataciones {
	static idContratacion = 0;
	constructor() {
		this.id = Contrataciones.idContratacion++;
		this.Cliente = Cliente.id;
		this.Paseador = Paseador.id;
		this.estado = ""; // opciones  pendiente, acceptado, denegado
	}
}

/* 

PRECARGA DE CLIENTES
PRECARGA DE PASEADORES

REGISTRO DE CLIENTE

LOGIN 

DISPLAY


clases

sistema

UI

*/
