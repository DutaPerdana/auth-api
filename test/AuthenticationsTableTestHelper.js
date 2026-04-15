/* istanbul ignore file */
/**
 * Memberitahu Vitest agar mengabaikan file ini dari laporan coverage.
 * Karena file ini hanya alat bantu untuk testing (bukan logika bisnis).
 */

import pool from '../src/Infrastructures/database/postgres/pool.js';

/**
 * AuthenticationsTableTestHelper
 * Objek pembantu untuk memanipulasi tabel 'authentications' pada database testing.
 * Tabel ini sangat penting untuk fitur Login (menyimpan refresh token) dan Logout (menghapus token).
 */
const AuthenticationsTableTestHelper = {
  /**
   * FUNGSI: addToken
   * Gunanya: Memasukkan token secara langsung ke database.
   * Dipakai saat kita ingin mensimulasikan keadaan "User sudah dalam posisi Login"
   * sebelum menjalankan pengujian tertentu (seperti tes Logout atau Refresh Token).
   */
  async addToken(token) {
    const query = {
      // Tabel authentications hanya memiliki satu kolom yaitu 'token'
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await pool.query(query);
  },

  /**
   * FUNGSI: findToken
   * Gunanya: Mencari token spesifik di dalam database.
   * Sangat berguna di bagian 'Assert' untuk memastikan bahwa setelah user Login,
   * tokennya benar-benar tersimpan di database.
   */
  async findToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(query);

    // Mengembalikan baris data yang ditemukan
    return result.rows;
  },

  /**
   * FUNGSI: cleanTable
   * Gunanya: Mengosongkan tabel authentications.
   * Sesuai prinsip TDD, database harus "suci" kembali setelah setiap satu skenario tes selesai.
   */
  async cleanTable() {
    await pool.query('TRUNCATE TABLE authentications');
  },
};

export default AuthenticationsTableTestHelper;