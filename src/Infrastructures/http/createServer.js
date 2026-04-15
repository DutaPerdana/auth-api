import express from 'express';
import ClientError from '../../Commons/exceptions/ClientError.js';
import DomainErrorTranslator from '../../Commons/exceptions/DomainErrorTranslator.js';
import users from '../../Interfaces/http/api/users/index.js';

/**
 * FACTORY FUNCTION: createServer
 * Inilah 'Motherboard' aplikasi kita. Di sini semua komponen (Routes, 
 * Middleware, dan Error Handling) dirakit menjadi satu kesatuan.
 * * @param {Object} container - DI Container yang membawa seluruh dependensi.
 * @returns {Promise<express.Application>} - Instance aplikasi Express yang sudah siap.
 */
const createServer = async (container) => {
  const app = express();

  // 1. Body Parser: Agar server bisa membaca data JSON dari client
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).json({ data: 'Hello world!' });
  });

  // 2. API Routing: Jalur utama untuk fitur-fitur User
  app.use('/users', users(container));

  /**
   * 3. MIDDLEWARE: 404 Not Found
   * Jika request client tidak cocok dengan rute manapun di atas, 
   * maka fungsi ini akan memberikan respon "Halaman Tidak Ditemukan".
   */
  app.use((req, res) => {
    res.status(404).json({
      status: 'fail',
      message: 'resource not found',
    });
  });

  /**
   * 4. GLOBAL ERROR MIDDLEWARE (Jaring Pengaman Pusat)
   * Inilah alasan kenapa Controller kita sekarang jadi sangat ringkas. 
   * Setiap error yang terjadi di Use Case atau Domain akan otomatis "jatuh" ke sini.
   */
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    
    // Tahap A: Terjemahkan error domain menjadi error yang punya status code
    const translatedError = DomainErrorTranslator.translate(err);

    // Tahap B: Cek apakah error ini disebabkan oleh kesalahan Client (4xx)
    if (translatedError instanceof ClientError) {
      res.status(translatedError.statusCode).json({
        status: 'fail',
        message: translatedError.message,
      });
      return;
    }

    /**
     * Tahap C: Server Error (5xx)
     * Jika bukan ClientError, berarti ada bug di kode kita atau server bermasalah.
     * Kita sembunyikan detail error aslinya demi keamanan.
     */
    res.status(500).json({
      status: 'error',
      message: 'terjadi kegagalan pada server kami',
    });
  });

  return app;
};

export default createServer;