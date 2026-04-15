/* istanbul ignore file */

/**
 * CONTAINER.JS
 * Berperan sebagai Service Locator / Dependency Injection Container.
 * File ini mengotomatiskan pembuatan instance class yang memiliki dependency rumit.
 */

import { createContainer } from 'instances-container';

// --- AGEN EKSTERNAL (Tools luar yang akan dicolokkan) ---
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import pool from './database/postgres/pool.js';

// --- SERVICE (Implementasi Konkrit dari Infrastructure) ---
import UserRepository from '../Domains/users/UserRepository.js';
import UserRepositoryPostgres from './repository/UserRepositoryPostgres.js';
import BcryptPasswordHash from './security/BcryptPasswordHash.js';

// --- USE CASE (Logika Bisnis dari Applications) ---
import AddUserUseCase from '../Applications/use_case/AddUserUseCase.js';
import PasswordHash from '../Applications/security/PasswordHash.js';

// Membuat instance container
const container = createContainer();

/**
 * 1. MENDAFTARKAN SERVICE & REPOSITORY
 * Kita memetakan Interface (Key) ke Implementasi Konkrit (Class).
 */
container.register([
  {
    key: UserRepository.name, // Key: "UserRepository"
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        { concrete: pool },   // Injeksi pool database
        { concrete: nanoid }, // Injeksi generator ID
      ],
    },
  },
  {
    key: PasswordHash.name, // Key: "PasswordHash"
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        { concrete: bcrypt }, // Injeksi library bcrypt
      ],
    },
  },
]);

/**
 * 2. MENDAFTARKAN USE CASE
 * Kita mendaftarkan alur bisnis yang akan digunakan oleh Handler (Controller).
 */
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring', // Sesuai constructor { userRepository, passwordHash }
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name, // Mengambil dari registrasi di atas
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name, // Mengambil dari registrasi di atas
        },
      ],
    },
  },
]);

export default container;