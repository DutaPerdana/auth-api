import PasswordHash from '../../Applications/security/PasswordHash.js';

/**
 * BcryptPasswordHash
 * Merupakan implementasi konkrit dari PasswordHash interface.
 * Class ini bertanggung jawab untuk melakukan hashing password menggunakan algoritma Bcrypt.
 */
class BcryptPasswordHash extends PasswordHash {
  /**
   * @param {Object} bcrypt - Library bcrypt (External Tool).
   * @param {number} saltRound - Tingkat kompleksitas pengacakan (Default: 10).
   */
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  /**
   * FUNGSI: hash
   * Mengubah teks password asli menjadi string acak (hash).
   * @param {string} password - Teks password mentah dari user.
   * @returns {Promise<string>} - Hasil enkripsi password.
   */
  async hash(password) {
    // Memanggil fungsi hash dari library bcrypt dengan tingkat salt yang ditentukan
    return this._bcrypt.hash(password, this._saltRound);
  }
}

/**
 * CATATAN PENTING:
 * Gunakan 'export default' jika proyek kamu menggunakan ES Modules (type: module).
 * Gunakan 'module.exports' jika menggunakan CommonJS.
 */
export default BcryptPasswordHash;