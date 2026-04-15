import RegisteredUser from '../RegisteredUser.js';

/**
 * UNIT TEST: RegisteredUser Entity
 * Tujuan: Memastikan data yang dikembalikan oleh database setelah registrasi 
 * sesuai dengan format yang diharapkan (memiliki ID dan tanpa Password).
 */
describe('a RegisteredUser entities', () => {
  /**
   * TEST CASE 1: Properti tidak lengkap.
   * Biasanya terjadi jika database gagal mengembalikan ID atau kolom penting lainnya.
   */
  it('should throw error when payload did not contain needed property', () => {
    // Arrange: Payload kurang properti 'id'
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // Action and Assert: Harus melempar error properti tidak lengkap
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  /**
   * TEST CASE 2: Tipe data salah.
   * Memastikan ID yang dihasilkan (biasanya dari nanoid) benar-benar string.
   */
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange: ID diisi angka (seharusnya string)
    const payload = {
      id: 123,
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // Action and Assert: Harus melempar error spesifikasi tipe data
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  /**
   * TEST CASE 3: Skenario Berhasil (Happy Path).
   * Memastikan objek berhasil dibuat jika datanya valid.
   */
  it('should create registeredUser object correctly', () => {
    // Arrange: Data lengkap dan valid
    const payload = {
      id: 'user-123',
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
    };

    // Action: Inisialisasi objek RegisteredUser
    const registeredUser = new RegisteredUser(payload);

    // Assert: Memastikan data yang disimpan dalam objek sesuai dengan input
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});