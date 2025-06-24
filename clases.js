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
	}
}

class Contrataciones {
	static idContratacion = 0;
	constructor() {
		this.id = Contrataciones.idContratacion++;
		this.Cliente = null;
		this.Paseador = null;
		this.estado = ""; // opciones  pendiente, aceptada, denegado
		this.comentario = "";
	}
}

class PerrosCantidad {
	constructor() {
		this.grande = 0;
		this.mediano = 0;
		this.chico = 0;
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
