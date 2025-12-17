import { DataSource } from 'typeorm';
import { User } from '../src/user/entities/user.entity';
import { UserRole } from '../src/user/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [__dirname + '/../src/**/*.entity.ts'],
    synchronize: false,
});

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');

        const userRepository = AppDataSource.getRepository(User);
        const email = 'abdulazizladan@gmail.com';

        // Check if user exists
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            console.log(`User ${email} already exists.`);
            return;
        }

        const password = 'password';
        const password_hash = await bcrypt.hash(password, 10);

        const user = new User();
        user.email = email;
        user.password_hash = password_hash;
        user.role = UserRole.ADMIN;
        user.isActive = true;
        user.createdAt = new Date(); // Explicitly setting date to avoid issues

        await userRepository.save(user);
        console.log(`User ${email} created successfully with role ${UserRole.ADMIN}.`);

    } catch (err) {
        console.error('Error during data seeding:', err);
    } finally {
        await AppDataSource.destroy();
    }
}

seed();
