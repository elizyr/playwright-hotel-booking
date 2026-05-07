const { test, expect, request } = require('@playwright/test');
const testData = require('../../data/testData.json');

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Hotel Booking - Testes de API', () => {

  let bookingId;
  let authToken;

  // ─── AUTH ────────────────────────────────────────────────────────────────

  test.beforeAll(async () => {
    const context = await request.newContext();

    const response = await context.post(`${BASE_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    const body = await response.json();
    authToken = body.token;
    console.log('Token obtido:', authToken);
  });

  // ─── GET ALL BOOKINGS ─────────────────────────────────────────────────────

  test('CT-API-001 | GET /booking - Deve listar todas as reservas', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');

    console.log(`Total de reservas encontradas: ${body.length}`);
  });

  // ─── POST - CREATE BOOKING ────────────────────────────────────────────────

  test('CT-API-002 | POST /booking - Deve criar uma nova reserva', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: testData.booking,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking.firstname).toBe(testData.booking.firstname);
    expect(body.booking.lastname).toBe(testData.booking.lastname);
    expect(body.booking.totalprice).toBe(testData.booking.totalprice);

    bookingId = body.bookingid;
    console.log('Reserva criada com ID:', bookingId);
  });

  // ─── GET BY ID ────────────────────────────────────────────────────────────

  test('CT-API-003 | GET /booking/:id - Deve buscar reserva por ID', async ({ request }) => {
    // Cria uma reserva antes de buscar
    const createRes = await request.post(`${BASE_URL}/booking`, {
      data: testData.booking,
      headers: { 'Content-Type': 'application/json' }
    });
    const created = await createRes.json();
    const id = created.bookingid;

    const response = await request.get(`${BASE_URL}/booking/${id}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(testData.booking.firstname);
    expect(body.lastname).toBe(testData.booking.lastname);
    expect(body).toHaveProperty('bookingdates');

    console.log('Reserva encontrada:', body);
  });

  // ─── PUT - UPDATE BOOKING ─────────────────────────────────────────────────

  test('CT-API-004 | PUT /booking/:id - Deve atualizar uma reserva', async ({ request }) => {
    // Cria reserva
    const createRes = await request.post(`${BASE_URL}/booking`, {
      data: testData.booking,
      headers: { 'Content-Type': 'application/json' }
    });
    const created = await createRes.json();
    const id = created.bookingid;

    // Atualiza
    const response = await request.put(`${BASE_URL}/booking/${id}`, {
      data: testData.bookingUpdated,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${authToken}`
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.lastname).toBe(testData.bookingUpdated.lastname);
    expect(body.totalprice).toBe(testData.bookingUpdated.totalprice);

    console.log('Reserva atualizada:', body);
  });

  // ─── DELETE ───────────────────────────────────────────────────────────────

  test('CT-API-005 | DELETE /booking/:id - Deve cancelar uma reserva', async ({ request }) => {
    // Cria reserva para deletar
    const createRes = await request.post(`${BASE_URL}/booking`, {
      data: testData.booking,
      headers: { 'Content-Type': 'application/json' }
    });
    const created = await createRes.json();
    const id = created.bookingid;

    // Deleta
    const deleteRes = await request.delete(`${BASE_URL}/booking/${id}`, {
      headers: {
        'Cookie': `token=${authToken}`
      }
    });

    expect(deleteRes.status()).toBe(201);

    // Verifica que não existe mais
    const getRes = await request.get(`${BASE_URL}/booking/${id}`);
    expect(getRes.status()).toBe(404);

    console.log(`Reserva ${id} cancelada com sucesso`);
  });

  // ─── VALIDAÇÃO - CAMPO OBRIGATÓRIO ────────────────────────────────────────

  test('CT-API-006 | POST /booking - Deve retornar erro com dados inválidos', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: { firstname: '' },
      headers: { 'Content-Type': 'application/json' }
    });

    // API retorna 500 para dados inválidos
    expect([400, 422, 500]).toContain(response.status());
    console.log('Status retornado para dados inválidos:', response.status());
  });

});
