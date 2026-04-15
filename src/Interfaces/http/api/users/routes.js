import express from 'express';

/**
 * ROUTES: Users
 * Berfungsi untuk memetakan jalur (endpoint) ke fungsi controller yang sesuai.
 * * @param {Object} controller - Instance dari UsersController yang sudah di-inject dengan container.
 * @returns {express.Router} - Objek router yang berisi daftar rute untuk domain 'users'.
 */
const routes = (controller) => {
  const router = express.Router();

  /**
   * DEFINISI RUTE:
   * Metode: POST
   * Path: / (relatif terhadap path yang didaftarkan di createServer, yaitu /users)
   * Handler: fungsi postUser dari UsersController
   */
  router.post('/', controller.postUser);

  return router;
};

export default routes;