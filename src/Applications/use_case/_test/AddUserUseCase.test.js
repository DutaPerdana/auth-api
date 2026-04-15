import { vi } from 'vitest';
import RegisterUser from '../../../Domains/users/entities/RegisterUser.js';
import RegisteredUser from '../../../Domains/users/entities/RegisteredUser.js';
import UserRepository from '../../../Domains/users/UserRepository.js';
import PasswordHash from '../../security/PasswordHash.js';
import AddUserUseCase from '../AddUserUseCase.js';

/**
 * UNIT TEST: AddUserUseCase
 * Tujuan: Menguji apakah Use Case mampu mengorkestrasikan alur bisnis pendaftaran user
 * dengan benar, mulai dari validasi, pengecekan username, hashing, hingga penyimpanan.
 */
describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    // --- STEP 1: ARRANGE (Menyiapkan Skenario) ---
    
    // Data yang dikirim oleh Client ke Use Case
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };

    // Data yang diekspektasikan keluar dari database (setelah di-insert)
    const mockRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    /** * MENCIPTAKAN DEPENDENCY (Test Double)
     * Kita membuat instance dari Interface yang sudah kita buat sebelumnya.
     */
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    /** * MOCKING FUNCTIONALITY
     * Di sini kita "membajak" fungsi aslinya menggunakan vi.fn().
     * Kita menentukan apa yang harus dikembalikan (Return Value) tanpa menjalankan database/bcrypt beneran.
     */
    
    // Simulasi: Username tersedia (tidak melempar error)
    mockUserRepository.verifyAvailableUsername = vi.fn()
      .mockImplementation(() => Promise.resolve());
    
    // Simulasi: Hasil enkripsi password adalah 'encrypted_password'
    mockPasswordHash.hash = vi.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    
    // Simulasi: Database berhasil menyimpan dan mengembalikan data user terdaftar
    mockUserRepository.addUser = vi.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredUser));

    /** * INJECTING DEPENDENCY
     * Kita masukkan "Kuli Gadungan" (Mock) ke dalam "Mandor" (Use Case).
     */
    const addUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // --- STEP 2: ACTION (Menjalankan Perintah) ---
    const registeredUser = await addUserUseCase.execute(useCasePayload);

    // --- STEP 3: ASSERT (Verifikasi Hasil & Alur) ---

    // 1. Memastikan output Use Case adalah objek RegisteredUser yang benar
    expect(registeredUser).toStrictEqual(new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    }));

    // 2. Memastikan Use Case memanggil fungsi cek username dengan parameter yang benar
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);

    // 3. Memastikan Use Case memanggil fungsi hash dengan password yang belum di-enkripsi
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);

    // 4. Memastikan Use Case memanggil fungsi simpan (addUser) dengan password yang SUDAH di-enkripsi
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: useCasePayload.username,
      password: 'encrypted_password', // Ini poin krusialnya!
      fullname: useCasePayload.fullname,
    }));
  });
});