/**
 * ClientError
 * Induk dari segala error yang disebabkan oleh kesalahan Client (User).
 * @abstract - Class ini tidak boleh dibuat objeknya secara langsung.
 */
class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message); // Memanggil constructor asli milik Class Error bawaan JS

    // Logika untuk mencegah class ini dibuat instance-nya secara langsung
    if (this.constructor.name === 'ClientError') {
      throw new Error('cannot instantiate abstract class');
    }

    this.statusCode = statusCode; // Kode status HTTP (400, 401, 404, dll)
    this.name = 'ClientError';    // Nama identitas error
  }
}

export default ClientError;