import { Server, Socket } from 'socket.io';

export function notificaciones(io: Server, socket: Socket) {
	socket.on('notification:horarios', message => {
		console.log('notification:horarios', message);
		io.sockets.emit('notification:horarios', message);
	});

	socket.on('notification:reserva', message => {
		console.log('notification:reserva', message);
		io.sockets.emit('notification:reserva', message);
	});

	socket.on('notification:admin', message => {
		console.log('notification:admin', message);
		io.sockets.emit('notification:admin', message);
	});
}
