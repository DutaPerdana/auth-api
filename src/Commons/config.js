/* istanbul ignore file */ 
// Baris di atas memberitahu Vitest untuk mengabaikan file ini dari laporan coverage, 
// karena file konfigurasi memang tidak perlu diuji secara logika.

import dotenv from 'dotenv';
import path from 'path';

/**
 * LOGIKA PEMILIHAN ENVIRONMENT
 * Kita harus memisahkan antara database asli dan database untuk pengujian (testing).
 * * NODE_ENV adalah variabel bawaan Node.js. 
 * Secara otomatis bernilai 'test' saat kita menjalankan 'npm run test' (Vitest).
 */
if (process.env.NODE_ENV === 'test') {
  // Jika sedang testing, ambil variabel dari file .test.env
  dotenv.config({
    path: path.resolve(process.cwd(), '.test.env'),
  });
} else {
  // Jika tidak sedang testing (production/dev), ambil dari file .env biasa
  dotenv.config();
}

/**
 * OBJEK KONFIGURASI TERPUSAT
 * Semua variabel yang ada di process.env (hasil bacaan dotenv tadi) 
 * kita kumpulkan ke dalam satu objek agar gampang dipanggil di file lain.
 */
const config = {

  app: {
    // Menentukan host: 'localhost' untuk dev, '0.0.0.0' untuk prod agar bisa diakses publik
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    
    // Port server diambil dari file .env (biasanya 3000 atau 5000)
    port: process.env.PORT,
    
    // Fitur debug: Hanya aktif saat mode development untuk membantu tracking error request
    debug: process.env.NODE_ENV === 'development' ? { request: ['error'] } : {},
  },
  database: {
    // Mengambil Host (alamat server database, biasanya localhost)
    host: process.env.PGHOST,
    
    // Mengambil Port (standar Postgres adalah 5432)
    port: process.env.PGPORT,
    
    // Mengambil Username database (misal: developer)
    user: process.env.PGUSER,
    
    // Mengambil Password database
    password: process.env.PGPASSWORD,
    
    // Mengambil Nama Database (authapi atau authapi_test tergantung pengecekan di atas)
    database: process.env.PGDATABASE,
  },
};

// Ekspor agar bisa digunakan oleh Infrastructures/database/postgres/pool.js
export default config;

// import dotenv from 'dotenv';
// import path from 'path';
 
// if (process.env.NODE_ENV === 'test') {
//   dotenv.config({
//     path: path.resolve(process.cwd(), '.test.env'),
//   });
// } else {
//   dotenv.config();
// }
 
// const config = {
//   database: {
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     database: process.env.PGDATABASE,
//   },
// };
 
// export default config;