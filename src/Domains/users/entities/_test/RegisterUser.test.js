import RegisterUser from '../RegisterUser.js';

/**
 * UNIT TEST: RegisterUser Entity
 * Tujuan: Memastikan entitas pendaftaran user mampu menyaring data yang masuk
 * sesuai dengan spesifikasi bisnis sebelum masuk ke layer Application.
 */
describe('a RegisterUser entities', () => {
  /**
   * TEST CASE 1: Properti yang dibutuhkan tidak lengkap.
   */
  it('should throw error when payload did not contain needed property', () => {
    // Arrange: Payload hanya berisi username dan password (kurang fullname)
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    // Action & Assert: Harus melempar error properti tidak lengkap
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  /**
   * TEST CASE 2: Tipe data tidak sesuai.
   */
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange: Username diisi angka, fullname diisi boolean (seharusnya string semua)
    const payload = {
      username: 123,
      fullname: true,
      password: 'abc',
    };

    // Action & Assert: Harus melempar error spesifikasi tipe data
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  /**
   * TEST CASE 3: Username terlalu panjang.
   */
  it('should throw error when username contains more than 50 character', () => {
    // Arrange: Username diisi 60 karakter
    const payload = {
      username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      fullname: 'Dicoding Indonesia',
      password: 'abc',
    };

    // Action & Assert: Harus melempar error batas karakter (limit char)
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  /**
   * TEST CASE 4: Username mengandung karakter terlarang (seperti spasi).
   */
  it('should throw error when username contains restricted character', () => {
    // Arrange: Username menggunakan spasi ('dico ding')
    const payload = {
      username: 'dico ding',
      fullname: 'dicoding',
      password: 'abc',
    };

    // Action & Assert: Harus melempar error restricted character
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  /**
   * TEST CASE 5: Skenario Berhasil (Happy Path).
   */
  it('should create registerUser object correctly', () => {
    // Arrange: Data sudah benar dan sesuai aturan
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'abc',
    };

    // Action: Membuat instance objek baru
    const { username, fullname, password } = new RegisterUser(payload);

    // Assert: Memastikan nilai di dalam objek sama dengan nilai yang dikirim
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});