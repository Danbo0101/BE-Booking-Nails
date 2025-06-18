import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbTestModule } from '@/db-test/db-test.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@/modules/users/users.module';
import { ServicesModule } from '@/modules/services/services.module';
import { BookingModule } from '@/modules/booking/booking.module';
import { CustomersModule } from '@/modules/customers/customers.module';
import { SchedulesModule } from '@/modules/schedules/schedules.module';
import { RolesModule } from '@/modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST') || 'localhost',
        port: parseInt(config.get('DB_PORT') || '3306', 10),
        username: config.get('DB_USERNAME') || 'root',
        password: config.get('DB_PASSWORD') || '',
        database: config.get('DB_NAME') || 'test',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    DbTestModule,
    UsersModule,
    ServicesModule,
    BookingModule,
    CustomersModule,
    SchedulesModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
