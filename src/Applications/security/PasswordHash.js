/**
 * PasswordHash Interface (Abstract Class)
 * Berfungsi sebagai "Kontrak" atau "Soket" untuk fitur pengamanan password.
 * * Mengapa di folder Applications?
 * Karena proses hashing adalah 'service' yang digunakan oleh Use Case, 
 * tapi cara kerjanya (teknisnya) tidak boleh diketahui oleh Use Case.
 */
class PasswordHash {
  /**
   * FUNGSI: hash
   * @param {string} password - Teks password asli yang akan dienkripsi.
   * @returns {Promise<string>} - Mengembalikan string password yang sudah di-hash.
   * * Fungsi ini dibuat 'async' karena proses enkripsi adalah operasi 
   * yang memakan beban CPU, sehingga tidak boleh memblokir thread utama.
   */
  async hash(password) {
    /**
     * MENGAPA MELEMPAR ERROR?
     * Ini adalah pengaman. Jika di layer Infrastructure kita lupa mengimplementasikan 
     * fungsi ini (misal di BcryptPasswordHash), maka aplikasi akan memberitahu 
     * secara spesifik bahwa metode ini belum diimplementasikan.
     */
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
}

export default PasswordHash;