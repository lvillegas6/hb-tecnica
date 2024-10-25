import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Product Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const productData = {
    name: 'Iphone 15 pro',
    description: 'Tel de alta gama',
    price: 5600000,
    quantity: 20,
  };

  let productId: string;

  it('/POST /products (Create a product)', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual(productData.name);
    expect(response.body.price).toBeGreaterThan(0);
    expect(response.body.quantity).toBeGreaterThan(0);
    productId = response.body.id;
  });

  it('/GET /products (Get all products)', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/PUT /products/:id (Update product by ID)', async () => {
    const updatedProductData = {
      ...productData,
      price: 5700000,
    };

    const response = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .send(updatedProductData)
      .expect(200);

    expect(response.body.price).toEqual(updatedProductData.price);
  });

  it('/DELETE /products/:id (Delete product by ID)', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .expect(200);
  });

});
