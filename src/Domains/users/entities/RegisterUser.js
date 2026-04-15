/**
 * RegisterUser Entity (Versi Lengkap sebelum Refactor)
 * Berfungsi sebagai "Validator" utama untuk data pendaftaran user baru.
 * Memastikan data memenuhi kriteria keberadaan, tipe, panjang, dan format.
 */
class RegisterUser {
  constructor({ username, password, fullname }) {
    /**
     * VALIDASI 1: Keberadaan Properti
     * Memastikan tidak ada kolom yang kosong (null, undefined, atau string kosong).
     */
    if (!username || !password || !fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    /**
     * VALIDASI 2: Tipe Data
     * Memastikan semua input adalah string. 
     * Ini penting agar fungsi string seperti .length atau .match tidak error.
     */
    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    /**
     * VALIDASI 3: Batas Karakter
     * Membatasi username maksimal 50 karakter agar sesuai dengan struktur tabel di database.
     */
    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    /**
     * VALIDASI 4: Karakter Terlarang (Regex)
     * /^[\w]+$/ artinya: hanya boleh huruf (a-z, A-Z), angka (0-9), dan underscore (_).
     * Jika ada spasi atau simbol seperti @, #, $, maka akan melempar error.
     */
    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    /**
     * ASSIGNMENT
     * Jika semua "Gerbang Logika" di atas lolos, barulah data disimpan ke dalam properti objek.
     */
    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }
}

export default RegisterUser;