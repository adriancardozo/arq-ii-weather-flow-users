import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { createDto, headers, loginDto, mongoUri, registerDto, url, user } from './data/user.e2e-spec.data';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

describe('UserController (e2e)', () => {
  let app: INestApplication<App>;
  let httpService: HttpService;
  let token: string;
  let userId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, MongooseModule.forRoot(mongoUri)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpService = app.get(HttpService);

    const connection = app.get<Connection>(getConnectionToken());
    const collections = await connection.listCollections();
    for (const { name } of collections) {
      const collection = connection.collection(name);
      await collection.deleteMany({});
    }

    try {
      await firstValueFrom(httpService.post(`${url}/auth/register`, registerDto));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      /* */
    }

    token = (await firstValueFrom(httpService.post(`${url}/auth/login`, loginDto))).data.access_token;
    userId = (await firstValueFrom(httpService.get(`${url}/auth/profile`, headers(token)))).data.id;
  });

  it('/profile (GET)', async () => {
    const { data } = await firstValueFrom(httpService.get(`${url}/auth/profile`, headers(token)));
    expect(data).toMatchObject(user);
  });

  it('/user/:id (GET)', async () => {
    const { data } = await firstValueFrom(httpService.get(`${url}/user/${userId}`, headers(token)));
    expect(data).toMatchObject(user);
  });

  it('/user (GET)', async () => {
    const { data } = await firstValueFrom(httpService.get(`${url}/user`, headers(token)));
    expect(data).toMatchObject([user]);
  });

  it('/user (POST)', async () => {
    const { data: created } = await firstValueFrom(
      httpService.post(`${url}/user`, createDto(), headers(token)),
    );
    const { data: retrieved } = await firstValueFrom(
      httpService.get(`${url}/user/${created.id}`, headers(token)),
    );
    expect(created).toEqual(retrieved);
  });

  afterEach(async () => {
    await app.close();
  });
});
