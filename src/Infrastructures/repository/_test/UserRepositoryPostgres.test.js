import UsersTableTestHelper from '../../../../test/UsersTableTestHelper.js';
import InvariantError from '../../../Commons/exceptions/InvariantError.js';
import RegisterUser from '../../../Domains/users/entities/RegisterUser.js';
import RegisteredUser from '../../../Domains/users/entities/RegisteredUser.js';
import pool from '../../database/postgres/pool.js';
import UserRepositoryPostgres from '../UserRepositoryPostgres.js';

/**
 * INTEGRATION TEST: UserRepositoryPostgres
 * Tujuan: Memastikan implementasi repository mampu berinteraksi dengan database PostgreSQL
 * secara benar, termasuk operasi SELECT dan INSERT.
 */
describe('UserRepositoryPostgres', () => {
  /**
   * TEARDOWN: afterEach
   * Membersihkan isi tabel users setiap kali satu unit tes (it) selesai.
   * Ini krusial agar data dari tes sebelumnya tidak mengganggu tes berikutnya.
   */
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  /**
   * TEARDOWN: afterAll
   * Memutuskan koneksi database pool setelah seluruh rangkaian tes selesai.
   * Jika tidak ditutup, proses testing tidak akan berhenti (hang).
   */
  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableUsername function', () => {
    it('should throw InvariantError when username not available', async () => {
      // Arrange: Masukkan user 'dicoding' terlebih dahulu ke database
      await UsersTableTestHelper.addUser({ username: 'dicoding' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert: Harus melempar InvariantError karena username sudah ada
      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding'))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when username available', async () => {
      // Arrange: Database dalam keadaan kosong
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert: Harus lolos (resolves) karena username belum ada
      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding'))
        .resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should persist register user', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });
      // Stub: ID generator palsu agar nilai ID bisa diprediksi ('user-123')
      const fakeIdGenerator = () => '123'; 
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action: Menjalankan fungsi simpan user
      await userRepositoryPostgres.addUser(registerUser);

      // Assert: Cek langsung ke database menggunakan helper apakah data tersimpan
      const users = await UsersTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });

    it('should return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });
      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action: Mendapatkan return value dari fungsi addUser
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      // Assert: Memastikan data yang dikembalikan adalah objek RegisteredUser yang valid
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: 'dicoding',
        fullname: 'Dicoding Indonesia',
      }));
    });
  });
});