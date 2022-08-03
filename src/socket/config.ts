import { Server } from 'socket.io';
import { notificaciones } from './notificaciones';
import { reservaTeporal } from './reservaTemporal';

export function initialSocket(app) {
	const server = app.getHttpServer();
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', socket => {
		console.log('Conexión', socket.id, 'desde:', socket.handshake.headers.origin);
		notificaciones(io, socket);
		reservaTeporal(io, socket);
	});
}
