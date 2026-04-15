import 'dotenv/config'; // Meload variabel lingkungan dari berkas .env
import createServer from './Infrastructures/http/createServer.js';
import container from './Infrastructures/container.js';
import config from './Commons/config.js';

/**
 * START FUNCTION
 * Fungsi utama yang bertanggung jawab untuk menginisialisasi dan 
 * menyalakan server aplikasi.
 */
const start = async () => {
  /**
   * 1. Inisialisasi Server
   * Membuat instance aplikasi Express dengan menyuntikkan DI Container.
   */
  const app = await createServer(container);

  /**
   * 2. Pengaturan Alamat
   * Mengambil nilai host dan port dari pusat konfigurasi (Commons/config.js).
   */
  const { host, port } = config.app;

  /**
   * 3. Menyalakan Listener
   * Server mulai mendengarkan request yang masuk pada alamat yang ditentukan.
   */
  app.listen(port, host, () => {
    console.log(`🚀 Server berjalan di http://${host}:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

// Jalankan fungsi start
start();