import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './roles-entity';
import { Booking } from './booking-entity';
import { Service } from './services-entity';
import { Schedule } from './schedules-entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @ManyToMany(() => Service, service => service.users)
    @JoinTable({
        name: 'user_services',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
    })
    services: Service[];

    @OneToMany(() => Schedule, schedule => schedule.user)
    schedules: Schedule[];
}
