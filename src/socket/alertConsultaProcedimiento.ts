import { Server, Socket } from 'socket.io';

export function alertConsultaProcedimiento(io: Server, socket: Socket) {
	socket.on('interconsulta:message', message => {
		console.log('interconsulta:message', message);
		io.sockets.emit('interconsulta:message', message);
	});
}
