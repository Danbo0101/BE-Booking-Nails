import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "@/modules/booking/entities/booking.entity";
import { Users } from "@/modules/users/entities/user.entity";

@Entity("services", { schema: "bookingNail" })
export class Services {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "name", nullable: true, length: 255 })
    name: string | null;

    @Column("varchar", { name: "price", nullable: true })
    price: string | null;

    @Column("varchar", { name: "duration", nullable: true })
    duration: string | null;

    @Column("int", { name: "status", nullable: true })
    status: number | null;

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

    @OneToMany(() => Booking, (booking) => booking.service)
    bookings: Booking[];

    @ManyToMany(() => Users, (users) => users.services)
    users: Users[];
}
