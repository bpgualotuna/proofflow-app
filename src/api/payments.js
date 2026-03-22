import axios from 'axios';

/**
 * Base URL para la API de pagos.
 * Usa la variable de entorno VITE_API_URL o localhost:5000 por defecto.
 * En producción, configurar VITE_API_URL en un archivo .env.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: `${BASE_URL}/payments` });

/**
 * Obtiene todos los pagos ordenados por fecha descendente.
 * @returns {Promise<Array<{
 *   _id: string,
 *   amount: number,
 *   description: string,
 *   status: 'pending' | 'approved' | 'rejected',
 *   createdBy: string,
 *   createdAt: string
 * }>>}
 */
export const getPayments = () =>
  api.get('/').then((r) => r.data);

/**
 * Crea un nuevo pago con estado 'pending'.
 * @param {{ amount: number, description: string, createdBy: string }} data
 * @returns {Promise<{ _id: string, amount: number, description: string, status: string, createdBy: string, createdAt: string }>}
 */
export const createPayment = (data) =>
  api.post('/', data).then((r) => r.data);

/**
 * Actualiza el estado de un pago (aprobar/rechazar).
 * Genera un EventLog con hash SHA-256 y lo registra en blockchain.
 * @param {string} id — Payment _id
 * @param {'approved' | 'rejected'} status
 * @param {string} user — Quién realiza la acción
 * @returns {Promise<{
 *   payment: { _id: string, amount: number, description: string, status: string, createdBy: string, createdAt: string },
 *   event: { _id: string, paymentId: string, action: string, user: string, timestamp: string, hash: string, txHash: string | null }
 * }>}
 */
export const updateStatus = (id, status, user) =>
  api.put(`/${id}/status`, { status, user }).then((r) => r.data);

/**
 * Verifica la integridad de un evento recalculando el hash SHA-256.
 * @param {string} eventId — EventLog _id
 * @returns {Promise<{
 *   isValid: boolean,
 *   originalHash: string,
 *   currentHash: string,
 *   event: { _id: string, paymentId: string, action: string, user: string, timestamp: string, hash: string, txHash: string | null },
 *   payment: { _id: string, amount: number, description: string, status: string, createdBy: string, createdAt: string }
 * }>}
 */
export const verifyPayment = (eventId) =>
  api.get(`/verify/${eventId}`).then((r) => r.data);
