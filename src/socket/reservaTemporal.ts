import { Server, Socket } from 'socket.io';

const reservas: Map<string, any>[] = [];

export function reservaTeporal(io: Server, socket: Socket) {
	socket.on('reservaTemporal', data => {
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
		}
		console.log('reservas', reservas);
	});

	socket.on('quitarReserva', data => {
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
		}
		console.log('reservas', reservas);
	});
}
