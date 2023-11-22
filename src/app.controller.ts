import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly dataService: AppService) {}

  @Get('sync')
  async syncData(): Promise<any> {
    return await this.dataService.getToken();
    //await this.dataService.fetchDataAndSyncWithDatabase(token);

    return 'Sync operation completed.';
  }
}
