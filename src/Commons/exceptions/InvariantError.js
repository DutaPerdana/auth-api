import ClientError from './ClientError.js';

/**
 * InvariantError
 * Digunakan ketika ada pelanggaran aturan bisnis atau validasi data.
 * Menggunakan status code 400 (Bad Request).
 */
class InvariantError extends ClientError {
  constructor(message) {
    super(message); // Default statusCode dari ClientError adalah 400
    this.name = 'InvariantError';
  }
}

export default InvariantError;