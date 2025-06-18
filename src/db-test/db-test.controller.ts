import { Controller, Get } from '@nestjs/common';
import { DbTestService } from '@/db-test/db-test.service';

@Controller('db-test')
export class DbTestController {
    constructor(private readonly dbTestService: DbTestService) { }

    @Get()
    async checkDbConnection() {
        return this.dbTestService.testConnection();
    }
}
