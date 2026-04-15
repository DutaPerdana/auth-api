/**
 * RegisteredUser Entity
 * Objek ini merepresentasikan data pengguna yang SUDAH BERHASIL disimpan di database.
 * Perhatikan: Di sini tidak ada password, karena kita tidak ingin mengembalikan 
 * data sensitif tersebut ke Client.
 */
class RegisteredUser {
  constructor(payload) {
    // Langkah 1: Validasi data yang datang dari database/repository
    this._verifyPayload(payload);

    // Langkah 2: Ambil datanya (Destructuring)
    const { id, username, fullname } = payload;

    // Langkah 3: Masukkan ke dalam properti objek
    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  /**
   * Fungsi Internal (Private Helper) untuk memvalidasi payload.
   * Kita menggunakan awalan underscore (_) sebagai konvensi bahwa ini fungsi privat.
   */
  _verifyPayload({ id, username, fullname }) {
    /**
     * VALIDASI 1: Keberadaan Properti
     * Database HARUS mengembalikan id, username, dan fullname.
     * Jika id tidak ada (misal: proses insert gagal), maka akan melempar error.
     */
    if (!id || !username || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    /**
     * VALIDASI 2: Tipe Data
     * Memastikan id, username, dan fullname yang dikirim balik berbentuk String.
     */
    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default RegisteredUser;