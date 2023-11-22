// data.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Data } from './data.model';

@Injectable()
export class AppService {
  constructor(@InjectModel('Data') private readonly dataModel: Model<Data>) {}

  async getToken(): Promise<string> {
    const url =
      'https://efatura.etrsoft.com/fmi/data/v1/databases/testdb/sessions';
    const username = 'apitest';
    const password = 'test123';
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64',
    );
    console.log(credentials);

    const response = await axios.post(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
      },
    );

    return response.data.response.token;
  }

  async fetchDataAndSyncWithDatabase(token: string): Promise<void> {
    const url = 'VERI_CEKME_URL'; // Özel URL'yi buraya ekleyin

    const response = await axios.patch(
      url,
      {
        fieldData: {},
        script: 'getData',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const scriptResult = JSON.parse(response.data.response.scriptResult);

    // Veritabanına yazma/güncelleme işlemleri
    for (const data of scriptResult) {
      await this.syncDataWithDatabase(data);
    }
  }

  async syncDataWithDatabase(data: any): Promise<void> {
    // Veritabanına yazma/güncelleme kodları buraya gelir
    await this.dataModel.findOneAndUpdate(
      {
        /* uygun bir filtreleme kriteri ekleyin */
      },
      data,
      {
        upsert: true,
      },
    );
  }
}
