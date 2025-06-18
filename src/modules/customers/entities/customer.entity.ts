import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "@/modules/booking/entities/booking.entity";

@Index("phone", ["phone"], { unique: true })
@Entity("customers", { schema: "bookingNail" })
export class Customers {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "name", nullable: true, length: 255 })
    name: string | null;

    @Column("varchar", {
        name: "phone",
        nullable: true,
        unique: true,
        length: 20,
    })
    phone: string | null;

    @Column("varchar", { name: "email", nullable: true, length: 255 })
    email: string | null;

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

    @OneToMany(() => Booking, (booking) => booking.customer)
    bookings: Booking[];
}
