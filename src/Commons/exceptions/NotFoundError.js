import ClientError from './ClientError.js';

/**
 * NotFoundError
 * Digunakan ketika data yang diminta (user, token, dll) tidak ditemukan.
 * Menggunakan status code 404 (Not Found).
 */
class NotFoundError extends ClientError {
  constructor(message) {
    // Kita kirim 404 ke constructor induk (ClientError)
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;