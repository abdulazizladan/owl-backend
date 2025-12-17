import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Info } from "./info.entity";
import { UserRole } from "../enums/user-role.enum";
import * as bcrypt from "bcrypt";
import { Contact } from "./contact.entity";
// import { Status } from "../enums/status.enum"; // Deprecated/Removed in favor of isActive

import { Exclude } from "class-transformer";

import { IsEmail, IsEnum, IsString, IsOptional, IsDate, IsBoolean, IsNumber } from "class-validator";
import { ClassArm } from "src/academic/entities/class-arm.entity";
import { ClassLevel } from "src/academic/entities/class-level.entity";

@Entity({ name: "User" })
export class User {
    /**
     * Unique identifier for the user (Primary Key)
     */
    @PrimaryGeneratedColumn({})
    @IsNumber()
    id: number;

    /**
     * Unique email address of the user
     */
    @Column({ unique: true })
    @IsEmail()
    email: string;

    /**
     * Hashed password for the user (excluded from serialization)
     */
    @Exclude()
    @Column({ name: 'password_hash' })
    @IsString()
    password_hash: string;

    /**
     * Role of the user (ADMIN, STAFF, STUDENT, GUARDIAN)
     */
    @Column({ type: 'text', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    /**
     * Account status (active vs inactive/suspended)
     */
    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;


    /**
     * Date when the user was created
     */
    @CreateDateColumn({ default: Date.now() })
    @IsDate()
    createdAt: Date;

    /**
     * One-to-one relation to Info entity (user's personal info)
     */
    @OneToOne((type) => Info, info => info.user)
    @IsOptional()
    info: Info;

    /**
     * One-to-one relation to Contact entity (user's contact info)
     */
    @OneToOne((type) => Contact, contact => contact.user)
    @IsOptional()
    contact: Contact;

    // @OneToOne((type) => Form, form => form.formMaster) // TODO: Re-implement Class Teacher logic if needed
    // @IsOptional()
    // form: Form;

    @ManyToOne((type) => ClassArm, classArm => classArm.students)
    @JoinColumn({ name: 'class_arm_id' })
    classArm: ClassArm

    /**
     * Wards (Students) associated with this user (if Guardian)
     */
    @ManyToMany(() => User, user => user.guardians)
    @JoinTable({
        name: "user_wards",
        joinColumn: { name: "guardian_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "student_id", referencedColumnName: "id" }
    })
    wards: User[];

    /**
     * Guardians associated with this user (if Student)
     */
    @ManyToMany(() => User, user => user.wards)
    guardians: User[];

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password_hash);
    }

    /**
     * Hashes a plain password using bcrypt
     * @param password Plain password to hash
     * @returns Promise<string> hashed password
     */
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10); // 10 salt rounds 
    }
}


