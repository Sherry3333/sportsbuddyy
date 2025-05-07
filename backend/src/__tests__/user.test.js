import { MongoMemoryServer } from 'mongodb-memory-server-core';
import { describe, it, expect, afterAll, beforeAll, beforeEach, vi } from 'vitest';
import mongoose from 'mongoose';
import express from 'express';
import supertest from 'supertest';
import User from '../data/UserSchema.js';
import userRouter from '../routes/user.js';
import apiResponse from '../middleware/apiResponse.js';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'test-secret-key';

const testUser =
    { username: 'testuser1', gender: 'male', sports: 'soccer', level: 'beginner', email: 'test1@test.com', password: '123456' };

describe('User API', () => {
    let mongod;
    let request;
    let app;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
        console.log('Connected to in-memory MongoDB instance: ' + uri);

        app = express();
        app.use(express.json());
        app.use(apiResponse);
        app.use('/api/user', userRouter);
        request = supertest(app);
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongod.stop();
    });

    it('should register a new user', async () => {
        const response = await request
            .post('/api/user/register')
            .send(testUser);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('user created successfully');

        const savedUser = await User.findOne({ username: testUser.username });
        expect(savedUser).not.toBeNull();
        expect(savedUser.email).toBe(testUser.email);
    });

    it('should login a user with valid credentials', async () => {
        await User.create(testUser);

        const response = await request
            .post('/api/user/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        console.log('Login response:', response.status, response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.data).toBeTruthy();

        const token = response.body.data;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded).toHaveProperty('userId');
    });

    it('should not login with invalid credentials', async () => {
        await User.create(testUser);

        const response = await request
            .post('/api/user/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Invalid username or password');
    });
});