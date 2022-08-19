import { Server, Socket } from 'socket.io';

export function alertDoctorKardex(io: Server, socket: Socket) {
	socket.on('kardex:alert', message => {
		console.log('kardex:alert', message);
		io.sockets.emit('kardex:alert', message);
	});

	socket.on('kardex:request', message => {
		console.log('kardex:request', message);
		io.sockets.emit('kardex:request', message);
	});
}
