/* istanbul ignore file */
/**
 * Komentar di atas memberitahu Vitest agar mengabaikan file ini dari laporan coverage.
 * Karena file ini hanya pembantu tes, bukan kode aplikasi utama (production).
 */

import pool from '../src/Infrastructures/database/postgres/pool.js';

/**
 * UsersTableTestHelper
 * Objek ini berisi kumpulan fungsi untuk membantu kita memanipulasi tabel 'users' 
 * khusus di dalam lingkungan pengujian (testing).
 */
const UsersTableTestHelper = {
  /**
   * FUNGSI: addUser
   * Gunanya: Memasukkan data user langsung ke database tanpa lewat 'Use Case'.
   * Ini dipakai untuk menyiapkan data (Arrange) sebelum pengujian dimulai.
   */
  async addUser({
    id = 'user-123', 
    username = 'dicoding', 
    password = 'secret', 
    fullname = 'Dicoding Indonesia',
  }) {
    const query = {
      // Menggunakan parameterized query ($1, $2, dst) untuk keamanan SQL Injection
      text: 'INSERT INTO users VALUES($1, $2, $3, $4)',
      values: [id, username, password, fullname],
    };

    // Eksekusi query ke database
    await pool.query(query);
  },

  /**
   * FUNGSI: findUsersById
   * Gunanya: Untuk mengecek apakah data user benar-benar sudah tersimpan di database.
   * Biasanya dipakai di bagian 'Assert' untuk memverifikasi hasil kerja aplikasi.
   */
  async findUsersById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    
    // Mengembalikan baris data hasil query (dalam bentuk array)
    return result.rows;
  },

  /**
   * FUNGSI: cleanTable
   * Gunanya: MENGHAPUS SEMUA DATA di tabel users.
   * SANGAT PENTING: Fungsi ini dijalankan setelah setiap tes selesai (afterEach)
   * agar database kembali bersih dan tidak mengganggu tes selanjutnya.
   */
  async cleanTable() {
    // TRUNCATE lebih cepat daripada DELETE untuk mengosongkan tabel
    await pool.query('TRUNCATE TABLE users');
  },
};

export default UsersTableTestHelper;