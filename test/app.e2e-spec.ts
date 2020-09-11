import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('OK');
  });

  it('/v1/auth/player (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/auth/player')
      .set('Content-Type', 'application/json')
      .send({ key: 'xxx' })
      .expect(200)
  });

  it('/v1/auth/controller (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/auth/controller')
      .set('Content-Type', 'application/json')
      .send({ token: 'xxx' })
      .expect(200)
  });
});
