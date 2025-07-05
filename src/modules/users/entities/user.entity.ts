import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "@/modules/booking/entities/booking.entity";
import { Schedules } from "@/modules/schedules/entities/schedule.entity";
import { Services } from "@/modules/services/entities/service.entity";
import { Roles } from "@/modules/roles/entities/role.entity";

@Index("role_id", ["roleId"], {})
@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "bookingNail" })
export class Users {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "name", nullable: true, length: 255 })
    name: string | null;

    @Column("varchar", {
        name: "email",
        nullable: true,
        unique: true,
        length: 255,
    })
    email: string | null;

    @Column("varchar", { name: "password", nullable: true, length: 255 })
    password: string | null;

    @Column("int", { name: "role_id", nullable: true })
    roleId: number | null;

    @Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column("timestamp", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;

    @Column("int", { name: "status", nullable: true })
    status: number | null;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];

    @OneToMany(() => Schedules, (schedules) => schedules.user)
    schedules: Schedules[];

    @ManyToMany(() => Services, (services) => services.users)
    @JoinTable({
        name: "user_services",
        joinColumns: [{ name: "user_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "service_id", referencedColumnName: "id" }],
        schema: "bookingNail",
    })
    services: Services[];

    @ManyToOne(() => Roles, (roles) => roles.users, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
    role: Roles;
}
