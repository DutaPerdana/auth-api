import request from 'supertest';
import pool from '../../database/postgres/pool.js';
import UsersTableTestHelper from '../../../../test/UsersTableTestHelper.js';
import container from '../../container.js';
import createServer from '../createServer.js';

/**
 * INTEGRATION TEST: HTTP Server
 * Menguji integrasi antara rute HTTP, Use Case, dan Database.
 * Menggunakan 'supertest' untuk mensimulasikan request HTTP ke aplikasi Express.
 */
describe('HTTP server', () => {
  // Membersihkan koneksi database setelah semua tes selesai
  afterAll(async () => {
    await pool.end();
  });

  // Membersihkan tabel users setelah setiap skenario tes agar tidak ada data sampah
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  /**
   * Skenario: Akses rute yang tidak terdaftar
   */
  it('should response 404 when request unregistered route', async () => {
    const server = await createServer({});
    const response = await request(server).get('/unregisteredRoute');

    expect(response.status).toEqual(404);
  });

  describe('when POST /users', () => {
    /**
     * Skenario Sukses: Registrasi User Baru
     */
    it('should response 201 and persisted user', async () => {
      // Arrange
      const requestPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      const server = await createServer(container);

      // Action: Melakukan POST request
      const response = await request(server)
        .post('/users')
        .send(requestPayload);

      // Assert: Validasi response body dan status code
      expect(response.status).toEqual(201);
      expect(response.body.status).toEqual('success');
      expect(response.body.data.addedUser).toBeDefined();
    });

    /**
     * Skenario Gagal: Payload tidak lengkap
     */
    it('should response 400 when request payload not contain needed property', async () => {
      const requestPayload = {
        fullname: 'Dicoding Indonesia',
        password: 'secret',
      };
      const server = await createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada');
    });

    /**
     * Skenario Gagal: Tipe data salah (e.g., fullname adalah Array)
     */
    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: ['Dicoding Indonesia'],
      };
      const server = await createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena tipe data tidak sesuai');
    });

    /**
     * Skenario Gagal: Username sudah ada di database (Duplicate)
     */
    it('should response 400 when username unavailable', async () => {
      await UsersTableTestHelper.addUser({ username: 'dicoding' }); // Pre-fill data
      const requestPayload = {
        username: 'dicoding',
        fullname: 'Dicoding Indonesia',
        password: 'super_secret',
      };
      const server = await createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('username tidak tersedia');
    });
  });

  /**
   * Skenario: Kerusakan Internal Server (500)
   * Mengetes "Global Error Middleware" di createServer.js
   */
  it('should handle server error correctly', async () => {
    const requestPayload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'super_secret',
    };
    // Memberikan container kosong agar Use Case tidak bisa ditemukan (memicu error 500)
    const server = await createServer({}); 

    const response = await request(server).post('/users').send(requestPayload);

    expect(response.status).toEqual(500);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('terjadi kegagalan pada server kami');
  });

  describe('when GET /', () => {
    it('should return 200 and hello world', async () => {
      // Arrange
      const app = await createServer({});
 
      // Action
      const response = await request(app).get('/');
 
      // Assert
      expect(response.status).toEqual(200);
      expect(response.body.data).toEqual('Hello worldd!');
    });
  });
});