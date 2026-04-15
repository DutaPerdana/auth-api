import PasswordHash from '../PasswordHash.js';

/**
 * UNIT TEST: PasswordHash Interface
 * Tujuan: Memastikan PasswordHash bertindak sebagai Class Abstrak (Interface).
 * Kita mengetes bahwa setiap fungsi di dalamnya akan melempar error jika dipanggil langsung
 * tanpa adanya implementasi nyata (concrete) di layer Infrastructure (seperti Bcrypt).
 */
describe('PasswordHash interface', () => {
  /**
   * TEST CASE: Memastikan perilaku abstrak pada fungsi hash.
   * Karena proses hashing biasanya memakan waktu (asynchronous), 
   * kita menggunakan async/await dan matcher .rejects.
   */
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange: Membuat instance dari class interface PasswordHash
    const passwordHash = new PasswordHash();

    /**
     * Action & Assert:
     * Kita memanggil fungsi hash() dan berekspektasi bahwa Promise tersebut 
     * akan ditolak (rejected) dengan pesan error spesifik.
     */
    await expect(passwordHash.hash('dummy_password'))
      .rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});