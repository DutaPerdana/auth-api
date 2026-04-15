import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase.js';

/**
 * UsersController
 * Bertindak sebagai Interface Adapter yang menghubungkan HTTP request dengan Application Use Case.
 * Versi ini sudah lebih bersih karena penanganan error (try-catch) dilakukan secara terpusat.
 */
class UsersController {
  /**
   * @param {Object} container - DI Container untuk mengambil instance dependency.
   */
  constructor(container) {
    this._container = container;

    // Binding context 'this' agar tidak hilang saat dipanggil oleh Express Router
    this.postUser = this.postUser.bind(this);
  }

  /**
   * Handler untuk endpoint POST /users
   * @param {Object} req - Express Request object
   * @param {Object} res - Express Response object
   */
  async postUser(req, res) {
    /**
     * 1. Mengambil instance Use Case dari container.
     * Kita menggunakan nama class sebagai key-nya.
     */
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);

    /**
     * 2. Menjalankan logika bisnis (Use Case).
     * Jika terjadi error di dalam sini, Express akan otomatis menangkapnya 
     * dan mengirimkannya ke Middleware Error di createServer.js.
     */
    const addedUser = await addUserUseCase.execute(req.body);

    /**
     * 3. Mengirimkan response sukses.
     * Status 201 menunjukkan sumber daya baru (User) telah berhasil dibuat.
     */
    res.status(201).json({
      status: 'success',
      data: {
        addedUser,
      },
    });
  }
}

export default UsersController;