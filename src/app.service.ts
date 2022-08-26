import { Injectable } from '@nestjs/common';
import { upload, getInfo } from 'wetransfert';

@Injectable()
export class AppService {
  getUrlTranferFile(filename: string, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      upload(
        '',
        '',
        `../${path}/public/documentos/reservas/${filename}`,
        'es'
      )
        .on('progress', (progress) => {
          console.log('PROGRESS', progress);
        })
        .on('end', async (end) => {
          resolve(end.shortened_url);
        })
        .on('error', (error) => {
          reject(error);
        });
    })
  }
}
