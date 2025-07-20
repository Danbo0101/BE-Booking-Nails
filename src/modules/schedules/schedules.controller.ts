import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedules } from './entities/schedule.entity';


@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) { }

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createScheduleDto: CreateScheduleDto
  ) {
    const userId = parseInt(id, 10);

    const scheduleWithUser = {
      ...createScheduleDto,
      userId,
    };

    return this.schedulesService.create(scheduleWithUser);
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}
