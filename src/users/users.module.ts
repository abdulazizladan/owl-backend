import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ],
})
export class UsersModule {}
