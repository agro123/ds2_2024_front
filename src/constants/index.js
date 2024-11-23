export const STATUS_LABELS = {
  0: 'Pendiente',
  1: 'Procesado',
};

export const TYPE_PQRSD_LABELS = {
  1: 'Petición',
  2: 'Queja',
  3: 'Reclamo',
  4: 'Sugerencia',
  5: 'Denuncia',
};

export const TYPE_DOCUMENTS = {
  1: 'Cédula',
  2: 'Pasaporte',
  3: 'Otro',
};

export const API_URL = localStorage.getItem('debug') == 'true' ? 'http://localhost:3000/api/public/' : 'https://ds2-2024-api-v1ea.onrender.com/api/public/'