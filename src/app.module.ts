import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbTestModule } from './db-test/db-test.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { CustomersModule } from './customers/customers.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // đổi theo cấu hình của bạn
      port: 3306,
      username: 'root', // đổi theo cấu hình
      password: '123456', // đổi theo cấu hình
      database: 'bookingNail', // đổi theo cấu hình
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // chỉ dùng cho dev, tự động tạo bảng
    }),
    DbTestModule,
    UsersModule,
    BookingsModule,
    CustomersModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
