import routes from './routes.js';
import UsersController from './controller.js';

/**
 * MODULE ENTRY POINT: Users API
 * Fungsi ini bertanggung jawab untuk merakit komponen-komponen API users.
 * * @param {Object} container - Service Locator yang berisi semua dependency.
 * @returns {express.Router} - Router yang sudah terkonfigurasi dengan controller.
 */
const users = (container) => {
  /**
   * 1. Inisialisasi Controller
   * Kita membuat instance UsersController dan menyuntikkan container ke dalamnya.
   */
  const usersController = new UsersController(container);

  /**
   * 2. Menghubungkan ke Routes
   * Mengirimkan instance controller ke fungsi routes untuk dipetakan ke endpoint HTTP.
   */
  return routes(usersController);
};

export default users;