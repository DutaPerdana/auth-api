import ClientError from './ClientError.js';

/**
 * AuthenticationError
 * Digunakan untuk masalah login/autentikasi.
 * Menggunakan status code 401 (Unauthorized).
 */
class AuthenticationError extends ClientError {
  constructor(message) {
    // Kita kirim 401 ke constructor induk (ClientError)
    super(message, 401); 
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;