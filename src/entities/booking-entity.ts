import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from './customers-entity';
import { User } from './users-entity';
import { Service } from './services-entity';

@Entity('booking')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    booking_time: Date;

    @Column()
    status: number;

    @Column({ nullable: true, type: 'text' })
    notes: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Customer, customer => customer.bookings)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, user => user.bookings)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Service, service => service.bookings)
    @JoinColumn({ name: 'service_id' })
    service: Service;
}
