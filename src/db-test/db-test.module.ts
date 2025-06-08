import { Module } from '@nestjs/common';
import { DbTestService } from './db-test.service';
import { DbTestController } from './db-test.controller';

@Module({
    providers: [DbTestService],
    controllers: [DbTestController],
})
export class DbTestModule { }
