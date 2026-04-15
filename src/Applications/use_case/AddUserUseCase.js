import RegisterUser from '../../Domains/users/entities/RegisterUser.js';

/**
 * AddUserUseCase
 * Merupakan Application Business Layer yang berfungsi sebagai 'Orchestrator'.
 * Tugasnya adalah mengatur urutan langkah (workflow) untuk aksi pendaftaran user.
 */
class AddUserUseCase {
  /**
   * Dependency Injection melalui constructor.
   * Kita tidak membuat instance repository/security di sini, 
   * melainkan menerimanya dari luar agar kode ini mudah diuji (testable).
   */
  constructor({ userRepository, passwordHash }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  /**
   * Fungsi utama untuk mengeksekusi proses pendaftaran.
   * @param {Object} useCasePayload - Data mentah dari client (username, password, fullname).
   */
  async execute(useCasePayload) {
    /**
     * LANGKAH 1: Validasi Payload
     * Mengubah payload mentah menjadi Entity 'RegisterUser'.
     * Jika data tidak valid (misal: username kepanjangan), 
     * maka Error akan dilempar dari dalam Class RegisterUser.
     */
    const registerUser = new RegisterUser(useCasePayload);

    /**
     * LANGKAH 2: Validasi Business Logic (Keunikan Username)
     * Meminta repository untuk mengecek ke database apakah username sudah terpakai.
     * Ini harus dilakukan SEBELUM password di-hash untuk menghemat resource CPU.
     */
    await this._userRepository.verifyAvailableUsername(registerUser.username);

    /**
     * LANGKAH 3: Security Service (Hashing Password)
     * Mengubah password teks biasa menjadi hash menggunakan passwordHash interface.
     * Kita menimpa (re-assign) property password pada entity dengan hasil hash-nya.
     */
    registerUser.password = await this._passwordHash.hash(registerUser.password);

    /**
     * LANGKAH 4: Persistence (Simpan ke Database)
     * Meminta repository untuk menyimpan data user yang sudah tervalidasi dan terenkripsi.
     * Fungsi ini akan mengembalikan entity 'RegisteredUser'.
     */
    return this._userRepository.addUser(registerUser);
  }
}

export default AddUserUseCase;