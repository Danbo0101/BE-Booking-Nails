import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './entities/customer.entity'; // Assuming you have a Customer entity defined
import isValidEmail from '@/general/IsValidEmial';
import isValidPhone from '@/general/isValidPhoneNum';


@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    try {
      if (!isValidEmail(createCustomerDto.email)) {
        return {
          ECODE: 1,
          EMESSAGE: 'Invalid email format',
          EDETAIL: 'Please provide a valid email address.',
        };
      }

      if (isValidPhone(createCustomerDto.phone) === "Invalid phone number format") {
        return {
          ECODE: 1,
          EMESSAGE: 'Invalid phone number format',
          EDETAIL: 'Please provide a valid phone number.',
        };
      }
      else {
        createCustomerDto.phone = isValidPhone(createCustomerDto.phone);
      }

      const newCustomer = this.customerRepository.create(createCustomerDto);
      const res = await this.customerRepository.save(newCustomer);

      return {
        ECODE: 0,
        EMESSAGE: 'Customer created successfully',
        EDATA: res,
      };

    } catch (error) {
      return {
        ECODE: 1,
        EMESSAGE: 'Customer creation failed',
        EDETAIL: error.message,
      };
    }
  }

  async findAll(): Promise<any> {
    const res = await this.customerRepository.find();

    if (res.length === 0) {
      return {
        ECODE: 2,
        EMESSAGE: 'No customers found',
        EDATA: [],
      };
    }
    else {
      const sanitizedCustomers = res.map(customer => {
        const { createdAt, updatedAt, ...sanitizedCustomer } = customer;
        return sanitizedCustomer;
      });
      return {
        ECODE: 0,
        EMESSAGE: 'Customers fetched successfully',
        EDATA: sanitizedCustomers,
      };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        return {
          ECODE: 2,
          EMESSAGE: `Customer with id ${id} not found`,
          EDATA: null,
        };
      }
      const { createdAt, updatedAt, ...sanitizedCustomer } = customer;
      return {
        ECODE: 0,
        EMESSAGE: 'Customer fetched successfully',
        EDATA: sanitizedCustomer,
      };
    } catch (error) {
      return {
        ECODE: 1,
        EMESSAGE: 'Failed to fetch customer',
        EDETAIL: error.message,
      };
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<any> {
    try {

      if (updateCustomerDto.email && !isValidEmail(updateCustomerDto.email)) {
        return {
          ECODE: 1,
          EMESSAGE: 'Invalid email format',
          EDETAIL: 'Please provide a valid email address.',
        };
      }

      if (updateCustomerDto.phone && isValidPhone(updateCustomerDto.phone) === "Invalid phone number format") {
        return {
          ECODE: 1,
          EMESSAGE: 'Invalid phone number format',
          EDETAIL: 'Please provide a valid phone number.',
        };
      }
      else if (updateCustomerDto.phone) {
        updateCustomerDto.phone = isValidPhone(updateCustomerDto.phone);
      }

      const customer = await this.customerRepository.preload({
        id,
        ...updateCustomerDto,
      });

      if (!customer) {
        return {
          ECODE: 2,
          EMESSAGE: `Customer with id ${id} not found`,
          EDATA: null,
        };
      }

      const res = await this.customerRepository.save(customer);
      return {
        ECODE: 0,
        EMESSAGE: 'Customer updated successfully',
        EDATA: res,
      };
    } catch (error) {

      return {
        ECODE: 1,
        EMESSAGE: 'Customer update failed',
        EDETAIL: error.message,
      };
    }
  }

  async remove(id: number): Promise<any> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      return {
        ECODE: 1,
        EMESSAGE: 'Customer not found',
      };
    }

    await this.customerRepository.remove(customer);

    return {
      ECODE: 0,
      EMESSAGE: 'Customer removed successfully',
    };
  }

}
