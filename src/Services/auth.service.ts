import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/user.repository';

export class AuthService {
    private userRepository = new UserRepository();

    async register(userData: Partial<User>) {
        // Add validation for required fields
        if (!userData.email || !userData.password) {
            throw new Error('Email and password are required');
        }
    
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) throw new Error('Email already in use');
    
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.userRepository.create({
            ...userData,
            password: hashedPassword
        });
    
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d'
        });

        return token;
    }
}