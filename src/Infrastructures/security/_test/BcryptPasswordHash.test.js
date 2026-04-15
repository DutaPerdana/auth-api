import { vi } from 'vitest';
import bcrypt from 'bcrypt';
import BcryptPasswordHash from '../BcryptPasswordHash.js';

/**
 * UNIT TEST: BcryptPasswordHash
 * Tujuan: Memastikan implementasi PasswordHash menggunakan library bcrypt berjalan benar.
 * Kita menguji apakah fungsi hash benar-benar mengaburkan password asli.
 */
describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // --- ARRANGE ---
      
      /**
       * Spying: vi.spyOn(object, methodName)
       * Kita menggunakan 'spy' untuk mengamati aktivitas fungsi bcrypt.hash.
       * Berbeda dengan mock, spy tetap menjalankan fungsi aslinya namun mencatat 
       * bagaimana fungsi tersebut dipanggil.
       */
      const spyHash = vi.spyOn(bcrypt, 'hash');
      
      // Dependency Injection: Memasukkan library bcrypt ke dalam constructor
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      // --- ACTION ---
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

      // --- ASSERT ---
      
      // 1. Memastikan hasilnya adalah string (karena hash bcrypt berupa string)
      expect(typeof encryptedPassword).toEqual('string');
      
      // 2. Memastikan password sudah berubah (tidak sama dengan teks aslinya)
      expect(encryptedPassword).not.toEqual('plain_password');
      
      /**
       * 3. Verifikasi Interaksi:
       * Memastikan bahwa BcryptPasswordHash memanggil library bcrypt dengan:
       * - Parameter 1: Password asli ('plain_password')
       * - Parameter 2: Salt round default (10)
       */
      expect(spyHash).toBeCalledWith('plain_password', 10);
    });
  });
});