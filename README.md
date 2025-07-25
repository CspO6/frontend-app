# Sistema de Gestión de Empleados y Tiendas

Este proyecto es una aplicación completa de gestión de empleados y tiendas, desarrollada con **Angular** en el frontend y **.NET 8** en el backend, siguiendo una arquitectura limpia y desacoplada. Se incluyen también pruebas automatizadas en el backend y documentación Swagger para la API.

---

## Tecnologías utilizadas

### Backend (.NET 8)
- ASP.NET Core 8
- Entity Framework Core
- SQL Server
- JWT (Json Web Token) para autenticación
- AutoMapper
- xUnit + Moq para pruebas unitarias
- Swashbuckle.AspNetCore (Swagger) para documentación

### Frontend (Angular)
- Angular 19+
- Angular Standalone Components (sin AppModule)
- Tailwind CSS
- SweetAlert2
- Reactive Forms
- RxJS
- Angular Interceptors
  
## Diagrama simple de arquitectura 

<img width="886" height="611" alt="image" src="https://github.com/user-attachments/assets/ce93eb88-4f0d-4c52-8bd2-6a214c01b427" />

## Decisiones de Arquitectura

- Separación por capas (Clean Architecture):
  - Domain: Entidades puras y lógica de negocio.
  - Application: Servicios, interfaces, reglas de aplicación.
  - Infrastructure: Acceso a datos, implementaciones concretas.
  - API: Punto de entrada, controladores y configuración general.
- Uso de interfaces e inyección de dependencias para facilitar el testing y cumplir el principio de inversión de dependencias (SOLID).
- Implementación de pruebas unitarias desde Backend.Tests para asegurar el correcto funcionamiento de la lógica de negocio sin necesidad de levantar toda la aplicación.
- Uso de DTOs (Data Transfer Objects) para controlar la entrada y salida de datos en los endpoints.
- Se decidió crear una tabla Usuarios para poder manejar el login con autentificación JWT

## Instrucciones para ejecutar el proyecto
## 1. Clonar los repositorios
```bash
# Backend
git clone https://github.com/CspO6/api-empleados-tiendas.git

# Frontend
git clone https://github.com/CspO6/frontend-app.git
```
## 2. Backend - Configuración y ejecución
Requisitos:
.NET 8 SDK

SQL Server

Pasos:
Crear la base de datos (puedes usar el script SQL incluido si lo deseas).

Configurar la cadena de conexión en appsettings.json:
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=EmpleadosTiendasDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
## 3. Ejecutar el proyecto

Desde la raíz del repositorio, navega a la carpeta del proyecto API y ejecuta:

```bash
cd api-empleados-tiendas/Backend.API/Backend.API
dotnet tool install --global dotnet-ef   
dotnet ef database update
dotnet run

## Usuario por defecto
Si no existen usuarios, se creará automáticamente uno:
## Usuario: admin
## Contraseña: 123456
## Rol: Administrador

## 4. Frontend - Configuración y ejecución
Requisitos:
Node.js (18+)

Angular CLI

Pasos:
```bash
cd frontend-app/gestion-empleados
npm install
ng serve
La aplicación se ejecutará en http://localhost:4200.
```

## 5. Python API - Reportes en PDF

Este microservicio opcional permite generar reportes en PDF para empleados y tiendas.

Requisitos:
- Python 3.10+
- Entorno virtual 

Pasos:
```bash
# Ubícate en la carpeta del backend
cd api-empleados-tiendas/Backend.API/python-api

# Crear y activar entorno virtual
py -m venv venv
venv\Scripts\activate

# Instalar dependencias
pip install fastapi uvicorn reportlab
pip install -r requirements.txt

# Ejecutar el servidor
uvicorn main:app --reload
```

La API estará disponible en: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Documentación API
La documentación Swagger está disponible en:
http://localhost:5204/swagger/index.html

## Pruebas
Backend
cd Backend.Tests
dotnet test

## Opcional: Script SQL
Si deseas crear la base de datos manualmente, puedes usar el script script.sql que incluye las tablas Usuarios, Empleados y Tiendas sin datos.

## Notas adicionales
- El sistema está preparado para login con token JWT.
- Se pueden gestionar empleados y tiendas desde el frontend.
- Se implementaron formularios reactivos, validaciones y manejo de errores visuales.


## Funcionalidad adicional en Python (FastAPI)

Como parte de los requerimientos opcionales, se implementó un microservicio con **FastAPI** y **ReportLab** en Python para generar reportes en PDF de empleados y tiendas. Este microservicio se conecta directamente a la misma base de datos SQL Server usada por la API principal .NET.

### Endpoints implementados

- `GET /reporte-empleados-pdf`: Genera un PDF con el listado de todos los empleados.
- `GET /reporte-tiendas-pdf`: Genera un PDF con el listado de todas las tiendas.

### Tecnologías usadas en el microservicio Python

- **FastAPI**: Framework para construir APIs rápidas y modernas.
- **SQLAlchemy**: ORM para interactuar con SQL Server.
- **ReportLab**: Librería para la generación de PDFs.
- **Uvicorn**: Servidor ASGI para FastAPI.

Estos endpoints pueden ser consumidos directamente desde el frontend Angular para descargar los reportes de manera inmediata.

## Autor
Sebastián Peñaherrera
