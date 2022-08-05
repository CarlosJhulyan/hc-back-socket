import { Server, Socket } from 'socket.io';

export function reserva(io: Server, socket: Socket) {
	socket.on('reservado:success', message => {
		console.log('reservado:success', message);
		io.sockets.emit('reservado:success', message);
	});
}
