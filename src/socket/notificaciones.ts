import { Server, Socket } from 'socket.io';

export function notificaciones(io: Server, socket: Socket) {
	socket.on('notification:horarios', message => {
		console.log('notification:horarios', message);
		io.sockets.emit('notification:horarios', message);
	});
}
