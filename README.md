# **PQRS Management**

Este es el frontend para gestionar PQRS (Peticiones, Quejas, Reclamos y Sugerencias). El proyecto está desarrollado con **React**, **Vite**, y **Vitest**, utilizando **Ant Design (antd)** para la creación de componentes UI. Está configurado para análisis con **SonarQube** y desplegado en **Vercel**, proporcionando funcionalidades tanto para clientes como para administradores, incluyendo estadísticas relacionadas con las PQRS.

---

## **Características Principales**

- **Registro de PQRS:** Los clientes pueden registrar sus peticiones, quejas, reclamos o sugerencias.
- **Gestión de PQRS:** Los administradores pueden revisar, gestionar y analizar las PQRS.
- **Estadísticas:** Generación de métricas visuales relacionadas con las PQRS.
- **Componentes Ant Design (antd):** UI moderna y consistente para mejorar la experiencia del usuario.
- **Despliegue en Vercel:** Acceso rápido y seguro a través de la nube.

---

## **Tecnologías Utilizadas**

- **Frontend:**
  - React con Vite para un desarrollo ágil.
  - Ant Design (antd) para la interfaz de usuario.
  - CSS personalizado para estilos adicionales.
- **Pruebas:**
  - Vitest para pruebas unitarias e integración.
- **Calidad del Código:**
  - SonarQube para análisis estático del código.
  - ESLint para mantener estándares de codificación.
- **Despliegue:**
  - Vercel para hosting en la nube.

---

## **Requisitos Previos**

Para ejecutar el proyecto en local, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 16 o superior)
- **npm** como gestor de paquetes
- Opcional: **SonarQube** si deseas analizar la calidad del código localmente.

---

## **Instalación y Configuración**

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/agro123/ds2_2024_front.git
   ```

2. **Instala las dependencias**:
   ```bash
   cd ds2_2024_front
   npm install
   ```

3. **Ejecuta el proyecto en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Para ejecutar las pruebas unitarias**:
   ```bash
   npm run test
   ```
    ```bash
   npm run test:coverage
   ```

5. **Para construir el proyecto para producción**:
   ```bash
   npm run build
   ```

6. **Análisis con SonarQube** (opcional):
   - Configura tu servidor de SonarQube.
   - Ejecuta:
     ```bash
     npm run sonar
     ```
7. **Abrir en el navegador:** [http://localhost:5173](http://localhost:5173)

---

## **Despliegue**

El proyecto está desplegado en **Vercel**. Puedes acceder a la versión en producción en el siguiente enlace:

[**Ver Proyecto en Vercel**](ds2-2024-front.vercel.app)

---

## **Estructura del Proyecto**

```
ds2_2024_front-main/
├── .github/
│   └── workflows/
├── public/
├── src/
│   ├── __tests__/
│   ├── assets/
│   │   └── styles/
│   ├── constants/
│   ├── context/
│   ├── layouts/
│   ├── routes/
│   │   ├── admin/
│   │   ├── error/
│   │   ├── public/
│   └── main.jsx
├── eslint.config.js
├── sonar-project.properties
├── vercel.json
└── vite.config.js

```

- **`.github/workflows/`**: Configuración para CI/CD (por ejemplo, `dev.yml` para flujos de trabajo automatizados).
- **`public/`**: Archivos estáticos (imágenes, íconos).
- **`src/`**:
  - **`__tests__/`**: Pruebas unitarias con Vitest.
    - **`layouts/`**: Pruebas de componentes de diseño (header, footer, sidebar).
    - **`routes/`**: Pruebas relacionadas con rutas, como el login.
  - **`assets/styles/`**: Archivos CSS para los estilos de la aplicación.
  - **`constants/`**: Configuración de constantes reutilizables.
  - **`context/`**: Configuración del contexto (por ejemplo, autenticación).
  - **`layouts/`**: Componentes de diseño principal (header, footer, sidebar).
  - **`routes/`**: Rutas organizadas por roles:
    - **`admin/`**: Rutas para el administrador (dashboard, lista de PQRS, gestión de usuarios).
    - **`public/`**: Rutas públicas, como login y registro de PQRS.
    - **`error/`**: Pantallas de error.
  - **`main.jsx`**: Punto de entrada de la aplicación.
- **Archivos de configuración**:
  - `sonar-project.properties`: Configuración para SonarQube.
  - `vite.config.js`: Configuración del entorno de desarrollo.
  - `vercel.json`: Configuración para el despliegue en Vercel.
  - `eslint.config.js`: Configuración para el linting del código.

