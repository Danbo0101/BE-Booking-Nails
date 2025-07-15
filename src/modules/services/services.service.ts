import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from './entities/service.entity';
import formatPrice from '@/general/formatPrice';
import formatTime from '@/general/formatTime';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>,
  ) { }

  async create(createServiceDto: CreateServiceDto): Promise<any> {
    try {

      const formattedPrice = formatPrice(createServiceDto.price);
      const formattedTime = formatTime(createServiceDto.duration);

      const newService = this.serviceRepository.create({
        ...createServiceDto,
        price: formattedPrice,
        duration: formattedTime,
      }

      );
      // console.log('Creating service with data:', newService);
      const res = await this.serviceRepository.save(newService);

      return {
        ECODE: 0,
        EMESSAGE: 'Service created successfully',
        EDATA: res,
      };
    } catch (error) {
      // console.error('Error creating service:', error.message);

      return {
        ECODE: 1,
        EMESSAGE: 'Service creation failed',
        EDETAIL: error.message,
      };
    }
  }

  async findAll(): Promise<any> {
    try {
      const services = await this.serviceRepository.find();

      if (!services.length) {
        return {
          ECODE: 2,
          EMESSAGE: 'No services found',
          EDATA: [],
        };
      }

      return {
        ECODE: 0,
        EMESSAGE: 'Services fetched successfully',
        EDATA: services.map(service => {
          const { createdAt, updatedAt, ...sanitizedService } = service;
          return sanitizedService;
        }),
      }

    } catch (error) {
      // console.error('Error fetching services:', error.message);

      return {
        ECODE: 1,
        EMESSAGE: 'Failed to fetch services',
        EDETAIL: error.message,
      };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const service = await this.serviceRepository.findOne({
        where: { id },
      })

      if (!service) {
        return {
          ECODE: 2,
          EMESSAGE: `Service with id ${id} not found`,
          EDATA: null,
        };
      }

      const { createdAt, updatedAt, ...sanitizedService } = service;

      return {
        ECODE: 0,
        EMESSAGE: 'Service fetched successfully',
        EDATA: sanitizedService,
      }

    } catch (error) {

      // console.error('Error fetching service:', error.message);

      return {
        ECODE: 1,
        EMESSAGE: 'Failed to fetch service',
        EDETAIL: error.message,
      };
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<any> {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      return {
        ECODE: 2,
        EMESSAGE: 'Service not found',
        EDATA: null,
      };
    }

    const updatedData: any = { ...updateServiceDto };

    if (updateServiceDto.price !== undefined) {
      updatedData.price = String(formatPrice(updateServiceDto.price));
    }

    if (updateServiceDto.duration !== undefined) {
      updatedData.duration = String(formatTime(updateServiceDto.duration));
    }

    await this.serviceRepository.update(id, updatedData);

    const updatedService = await this.serviceRepository.findOne({ where: { id } });

    return {
      ECODE: 0,
      EMESSAGE: 'Service updated successfully',
      EDATA: updatedService,
    };
  }




  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
