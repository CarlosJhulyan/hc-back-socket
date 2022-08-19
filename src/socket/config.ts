import { Server } from 'socket.io';
import { alertDoctorKardex } from './alertDoctorKardex';
import { alertConsultaProcedimiento } from './alertConsultaProcedimiento';
import { notificaciones } from './notificaciones';
import { reserva } from './reserva';
import { eliminarReservasVencidas, enviarDatainicio, reservaTeporal } from './reservaTemporal';

export function initialSocket(app) {
	const server = app.getHttpServer();
	const io = new Server(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	setInterval(() => {
		eliminarReservasVencidas(io);
	}, 5000);

	setTimeout(() => {
		enviarDatainicio(io);
	}, 2000);

	io.on('connection', socket => {
		console.log('Conexión', socket.id, 'desde:', socket.handshake.headers.origin);
		notificaciones(io, socket);
		reservaTeporal(io, socket);
		reserva(io, socket);
		alertDoctorKardex(io, socket);
		alertConsultaProcedimiento(io, socket);
	});
}
