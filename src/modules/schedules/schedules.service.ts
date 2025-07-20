import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedules } from './entities/schedule.entity';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedules)
    private readonly scheduleRepository: Repository<Schedules>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }
  async create(createScheduleDto: CreateScheduleDto): Promise<any> {
    const { userId, ...scheduleData } = createScheduleDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    console.log('User found:', userId);

    return user
  }

  findAll() {
    return `This action returns all schedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
