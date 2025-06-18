import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Customers } from "@/modules/customers/entities/customer.entity";
import { Users } from "@/modules/users/entities/user.entity";
import { Services } from "@/modules/services/entities/service.entity";

@Index("customer_id", ["customerId"], {})
@Index("service_id", ["serviceId"], {})
@Index("user_id", ["userId"], {})
@Entity("booking", { schema: "bookingNail" })
export class Booking {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("int", { name: "customer_id", nullable: true })
    customerId: number | null;

    @Column("int", { name: "user_id", nullable: true })
    userId: number | null;

    @Column("int", { name: "service_id", nullable: true })
    serviceId: number | null;

    @Column("timestamp", { name: "booking_time", nullable: true })
    bookingTime: Date | null;

    @Column("int", { name: "status", nullable: true })
    status: number | null;

    @Column("text", { name: "notes", nullable: true })
    notes: string | null;

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

    @ManyToOne(() => Customers, (customers) => customers.bookings, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "customer_id", referencedColumnName: "id" }])
    customer: Customers;

    @ManyToOne(() => Users, (users) => users.bookings, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: Users;

    @ManyToOne(() => Services, (services) => services.bookings, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
    service: Services;
}
