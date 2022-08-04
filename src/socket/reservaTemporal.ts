import { Server, Socket } from 'socket.io';

const segundosReserva = 20;
const reservas: Map<string, any>[] = [];
let reservasEliminadas = false;

export function enviarDatainicio(io: Server) {
	io.emit('reservas', reservas);
	console.log('Enviando reservas inicio');
}

// ELIMINAR RESERVAS QUE HAYAN PASADO LOS SEGUNDOS DE RESERVA EN SEGUNDOSRESERVA
export function eliminarReservasVencidas(io: Server) {
	reservas.forEach(reserva => {
		const ff = new Date(reserva['horaRegistro']);
		console.log(ff);
		if (ff.getTime() + segundosReserva * 1000 < new Date().getTime()) {
			reservas.splice(reservas.indexOf(reserva), 1);
			reservasEliminadas = true;
			console.log('Reserva eliminada', reservas);
		}
		if (reservasEliminadas) {
			console.log('notificado');
			io.emit('reservas', reservas);
			reservasEliminadas = false;
		}
	});
}

export function reservaTeporal(io: Server, socket: Socket) {
	socket.on('agregarReserva', data => {
		if (
			!reservas.find(
				reserva =>
					reserva['hora'] === data.hora &&
					reserva['cmp'] === data.cmp &&
					reserva['fecha'] === data.fecha &&
					reserva['idEspecialidad'] === data.idEspecialidad &&
					reserva['idBus'] === data.idBus,
			)
		) {
			reservas.push(data);
			io.emit('reservas', reservas);
		}
		console.log('reservas', reservas);
	});

	socket.on('quitarReserva', data => {
		console.log('quitarReserva', data);
		const index = reservas.findIndex(
			reserva =>
				reserva['hora'] === data.hora &&
				reserva['cmp'] === data.cmp &&
				reserva['fecha'] === data.fecha &&
				reserva['idEspecialidad'] === data.idEspecialidad &&
				reserva['idBus'] === data.idBus,
		);
		if (index !== -1) {
			reservas.splice(index, 1);
			io.emit('reservas', reservas);
		}
		console.log('reservas', reservas);
	});
}
