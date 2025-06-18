import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "@/modules/users/entities/user.entity";

@Index("user_id", ["userId"], {})
@Entity("schedules", { schema: "bookingNail" })
export class Schedules {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("int", { name: "user_id", nullable: true })
    userId: number | null;

    @Column("int", { name: "weekday", nullable: true })
    weekday: number | null;

    @Column("time", { name: "start_time", nullable: true })
    startTime: string | null;

    @Column("time", { name: "end_time", nullable: true })
    endTime: string | null;

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

    @ManyToOne(() => Users, (users) => users.schedules, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: Users;
}
