import InvariantError from '../../Commons/exceptions/InvariantError.js';
import RegisteredUser from '../../Domains/users/entities/RegisteredUser.js';
import UserRepository from '../../Domains/users/UserRepository.js';

/**
 * UserRepositoryPostgres
 * Implementasi konkrit dari UserRepository untuk database PostgreSQL.
 * Class ini bertanggung jawab atas persistensi data user ke tabel 'users'.
 */
class UserRepositoryPostgres extends UserRepository {
  /**
   * @param {Object} pool - Connection pool dari library 'pg'.
   * @param {Function} idGenerator - Fungsi untuk men-generate ID unik (misal: nanoid).
   */
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * Memeriksa ketersediaan username di database.
   * @param {string} username
   * @throws {InvariantError} - Jika username sudah terdaftar di database.
   */
  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    // result.rowCount akan bernilai > 0 jika ada baris data yang ditemukan
    if (result.rowCount) {
      throw new InvariantError('username tidak tersedia');
    }
  }

  /**
   * Menyimpan data user baru ke database.
   * @param {RegisterUser} registerUser - Entity yang membawa data pendaftaran.
   * @returns {RegisteredUser} - Entity yang membawa data user hasil penyimpanan.
   */
  async addUser(registerUser) {
    const { username, password, fullname } = registerUser;
    
    // Membuat ID baru dengan bantuan generator eksternal
    const id = `user-${this._idGenerator()}`;

    const query = {
      /**
       * Menggunakan fitur RETURNING di PostgreSQL untuk langsung mengambil
       * data yang baru saja dimasukkan tanpa perlu query SELECT tambahan.
       */
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    /**
     * Mengembalikan data dalam bentuk Entity RegisteredUser.
     * Spread operator (...) digunakan untuk menyalin properti dari result.rows[0].
     */
    return new RegisteredUser({ ...result.rows[0] });
  }
}

export default UserRepositoryPostgres;