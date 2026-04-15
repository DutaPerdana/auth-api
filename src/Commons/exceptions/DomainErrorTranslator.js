import InvariantError from './InvariantError.js';

/**
 * DOMAIN ERROR TRANSLATOR
 * Objek ini bertanggung jawab untuk memetakan (mapping) pesan error dari layer Domain
 * menjadi objek error yang lebih spesifik (InvariantError) agar dapat dipahami oleh layer Interface.
 */
const DomainErrorTranslator = {
  /**
   * Menerjemahkan pesan error.
   * @param {Error} error - Objek error asli dari Domain/Application.
   * @returns {Error} - Mengembalikan InvariantError jika terdaftar, atau error asli jika tidak.
   */
  translate(error) {
    // Mencari terjemahan berdasarkan pesan error sebagai key pada direktori
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

/**
 * DIREKTORI TERJEMAHAN
 * Berisi daftar pasangan antara "Pesan Error Internal" dengan "Objek Error Publik".
 * Teknik ini lebih bersih dan mudah dikelola dibandingkan menggunakan blok switch-case.
 */
DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
};

export default DomainErrorTranslator;