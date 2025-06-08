import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DbTestService {
    constructor(private dataSource: DataSource) { }

    async testConnection(): Promise<void> {
        try {
            await this.dataSource.query('SELECT 1');
            console.log('Database connection is OK!');
        } catch (error) {
            console.log(`Database connection failed: ${error.message}`);
        }
    }

}
