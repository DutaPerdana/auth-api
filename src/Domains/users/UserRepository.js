/**
 * UserRepository Interface
 * Berfungsi sebagai "Kontrak" atau "Protokol" untuk semua urusan data User.
 * Class ini bersifat abstrak; tidak boleh ada logika database di sini.
 */
class UserRepository {
  /**
   * FUNGSI: addUser
   * Seharusnya menerima objek 'RegisterUser' (dari Entities)
   * dan mengembalikan objek 'RegisteredUser'.
   */
  async addUser(registerUser) {
    // Jika fungsi ini dipanggil langsung tanpa di-override di layer Infrastructure, 
    // maka ia akan melempar error.
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * FUNGSI: verifyAvailableUsername
   * Seharusnya menerima string 'username' dan mengecek ketersediaannya di database.
   * Jika username sudah ada, ia akan melempar InvariantError.
   */
  async verifyAvailableUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

export default UserRepository;