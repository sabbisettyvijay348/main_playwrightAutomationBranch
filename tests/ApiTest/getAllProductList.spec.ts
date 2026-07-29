import { test, expect, _baseTest } from '@playwright/test';

test('Get all product list', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList');

  expect(response.status()).toBe(200);

  const body = await response.json();
//   expect(body).toBeDefined();
//   expect(body.products).toBeDefined();
//   expect(Array.isArray(body.products)).toBeTruthy();
//   expect(body.products.length).toBeGreaterThan(0);

  let header = response.headers();

  console.log(body.products);
  console.log(header);
});


test.only('POST To All Products List', async ({ request }) => {
  const res = await request.post('https://automationexercise.com/api/productsList');

  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});

test('POST To Search Product', async ({ request }) => {
  // TODO: add POST search validation when the endpoint and expected response are known

  const res = await request.post('https://automationexercise.com/api/searchProduct');
  expect(res.status()).toBe(200);

  const body = await res.json();
  console.log(body);
   expect(body.responseCode).toBe(400);
   expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');

});

test('Patch To All Product List', async ({request}) => {

  const res = await request.patch('https://automationexercise.com/api/productsList');
  expect(res.status()).toBe(405);

  const body = await res.json();
  expect(body.responseCode).toBe(undefined);
  console.log(body);
  const header = res.headers();
  console.log(header);

  //const Res

});