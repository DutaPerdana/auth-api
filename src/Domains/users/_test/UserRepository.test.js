import UserRepository from '../UserRepository.js';

/**
 * UNIT TEST: UserRepository Interface
 * Tujuan: Memastikan bahwa UserRepository bertindak sebagai Class Abstrak.
 * Kita mengetes bahwa setiap fungsi di dalamnya akan melempar error jika dipanggil langsung
 * tanpa adanya implementasi nyata (concrete) di layer Infrastructure.
 */
describe('UserRepository interface', () => {
  /**
   * TEST CASE: Memastikan perilaku abstrak.
   * Karena fungsi database bersifat asynchronous, kita menggunakan async/await.
   */
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange: Membuat instance dari class interface itu sendiri
    const userRepository = new UserRepository();

    /**
     * Action and Assert:
     * Kita menggunakan '.rejects' karena fungsi yang kita panggil adalah 'async' (mengembalikan Promise).
     * Kita berekspektasi bahwa Promise tersebut akan ditolak (rejected) dengan pesan error spesifik.
     */
    
    // Mengetes fungsi addUser
    await expect(userRepository.addUser({}))
      .rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    // Mengetes fungsi verifyAvailableUsername
    await expect(userRepository.verifyAvailableUsername(''))
      .rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});