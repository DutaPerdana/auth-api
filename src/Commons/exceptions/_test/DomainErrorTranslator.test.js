import DomainErrorTranslator from '../DomainErrorTranslator.js';
import InvariantError from '../InvariantError.js';

/**
 * UNIT TEST: DomainErrorTranslator
 * Tujuan: Memastikan fungsi penterjemah mampu mengubah error generic dari Domain
 * menjadi InvariantError dengan pesan yang lebih spesifik dan user-friendly.
 */
describe('DomainErrorTranslator', () => {
  /**
   * TEST: Pemetaan Error yang Terdaftar
   * Memastikan semua konstanta pesan error dari entitas RegisterUser 
   * dipetakan ke InvariantError yang tepat.
   */
  it('should translate error correctly', () => {
    // 1. Kasus: Properti yang dibutuhkan tidak ada
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'));

    // 2. Kasus: Tipe data tidak sesuai spesifikasi
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'));

    // 3. Kasus: Username melebihi batas 50 karakter
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'));

    // 4. Kasus: Username mengandung karakter terlarang (selain alfanumerik & underscore)
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'));
  });

  /**
   * TEST: Penanganan Error Tak Terdaftar
   * Memastikan jika ada error yang tidak masuk dalam daftar terjemahan, 
   * translator akan mengembalikan error aslinya tanpa modifikasi.
   */
  it('should return original error when error message is not needed to translate', () => {
    // Arrange: Buat error generic yang tidak ada di kamus penterjemah
    const error = new Error('some_error_message');

    // Action: Jalankan proses translasi
    const translatedError = DomainErrorTranslator.translate(error);

    // Assert: Pastikan output sama persis dengan input (tidak diubah)
    expect(translatedError).toStrictEqual(error);
  });
});