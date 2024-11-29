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

const API_URL = localStorage.getItem('debug') == 'true' ? 'http://localhost:3000/' : 'https://ds2-2024-api-v1ea.onrender.com/';

export const API = {
  public: API_URL + 'api/public/',
  private: API_URL + 'api/private/',
  authHeaders:{
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  },
}

console.log('API URL: ', API_URL)