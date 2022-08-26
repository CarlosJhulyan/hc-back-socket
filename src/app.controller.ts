import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getUrlTranferFile')
 async getUrlTranferFile(
  @Query('filename') filename: string,
  @Query('path') path: string,
 ): Promise<string> {
    return this.appService.getUrlTranferFile(filename, path);
  }
}
