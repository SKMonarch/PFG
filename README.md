# PFG – Plataforma Bancaria

### Autor: Christian Sanjurjo Lueiro

---
<img src="https://github.com/user-attachments/assets/ef60f708-dbbc-44f2-925b-9755361b7e32"
       alt="ABANKOS Banner"
       width="1000"
       height="700"/>

![Python](https://img.shields.io/badge/Python-3.13.3-3776AB?style=for-the-badge\&logo=python\&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge\&logo=node.js\&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge\&logo=docker\&logoColor=white) ![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge\&logo=git\&logoColor=white)

---

## Índice

1. [Descripción del Proyecto](#descripci%C3%B3n-del-proyecto)
2. [Estado del Proyecto](#estado-del-proyecto)
3. [Demostración de funciones y aplicaciones](#demostraci%C3%B3n-de-funciones-y-aplicaciones)
4. [Acceso al Proyecto](#acceso-al-proyecto)
5. [Tecnologías utilizadas](#tecnolog%C3%ADas-utilizadas)
6. [Personas Contribuyentes](#personas-contribuyentes)
7. [Personas Desarrolladoras del Proyecto](#personas-desarrolladoras-del-proyecto)
8. [Licencia](#licencia)

---

## Descripción del Proyecto

El **PFG – Plataforma Bancaria** es una aplicación web diseñada para centralizar y facilitar operaciones financieras y empresariales en un único entorno digital. La plataforma ofrece funcionalidades orientadas tanto a usuarios individuales como a empresas, con especial foco en seguridad, trazabilidad y visualización de datos.

Funciones principales:

* Trámites bancarios y gestión de cuentas.
* Consulta en tiempo real de bolsa y criptomonedas.
* Compra/venta simulada de acciones y criptoactivos.
* Registro y gestión de operaciones fiscales.
* Historial y seguimiento de transacciones.

---

## Estado del Proyecto

**En desarrollo activo**

Estado actual:

* ✔️ Backend funcional con autenticación y modelos principales.
* ✔️ Endpoints para consultas financieras y manejo de usuarios.
* ✔️ Frontend inicial con pantallas base y hooks para datos.
* ✔️ Contenedorización básica con Docker.

Pendiente:

* ⏳ Integración de compra de acciones en bolsa.
* ⏳ Pruebas unitarias y de integración completas.

---

## Demostración de funciones y aplicaciones

La aplicación permite (entre otras):

* Visualización de gráficos financieros y evolución de activos.
* Operaciones bancarias (simuladas) y transferencias.
* Consulta de precios e historial de criptomonedas.
* Historial de transaccione.



---

## Acceso al Proyecto

### Clonar el repositorio

```bash
git clone https://github.com/SKMonarch/PFG.git 
cd PFG
```

### Docker 

```bash
docker compose up --build
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # En Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Tecnologías utilizadas

**Backend**

* Python 3.13
* FastAPI
* SQLAlchemy
* Alembic (migrations)
* JWT para autenticación

**Frontend**

* Node.js 22.x
* React + Vite
* TailwindCSS
* shadcn
  
**Infra / DevOps**

* Docker / Docker Compose
* Git / GitHub

---

## Personas Contribuyentes

* (Añade aquí otros colaboradores, si los hay: nombre — rol — GitHub)

---

## Personas Desarrolladoras del Proyecto

* **Christian Sanjurjo Lueiro** — Desarrollador principal (Full-stack)

---

## Licencia

Este proyecto es de codigo abierto

---


