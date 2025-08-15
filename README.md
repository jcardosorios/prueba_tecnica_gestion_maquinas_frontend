## Descripción del Proyecto

Interfaz visual para visualización de aplicacón web destinada a gestionar el ciclo de producción de máquinas industriales. En la cual cada máquina realiza tareas que generan tiempo de producción. Al completarse 5 tareas con una máquina, esta entra en un periodo de inactividad calculado en el lado del servidor y visualizado en esta aplicación.

Esta aplicación consta de 3 vistas:
- Maquinas: Consta de un CRUD completo que permite la creación, eliminación, visualización y edición de las máquinas y sus coeficientes de trabajo.
- Tareas: Las tareas pueden unicamente visualizarse, crear nuevas tareas y finalizarlas (edición limitada).
- Producción: Estas solo pueden ser visualizadas.


---

### Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:5173`.
    
- `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
    
- `npm run lint`: Busca problemas de código.
    
- `npm run preview`: Previsualiza la compilación de producción.
    

---

### Instrucciones de Instalación y Ejecución

#### 1\. Clonar el repositorio

Bash

```
git clone https://github.com/tu-usuario/nombre-del-repo.git
```

#### 2\. Instalar dependencias

Ve al directorio del proyecto e instala las dependencias:

Bash

```
cd nombre-del-repo
npm install
```

#### 3\. Levantar el servidor

Ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:

Bash

```
npm run dev
```

La aplicación estará disponible en tu navegador en `http://localhost:5173`.

---

### Prompts de IA usados para dudas comunes (Gemini)

- "How to create a new component in React with Vite?"
    
- "How to fetch data from an API in React using `useEffect` and `useState`?"
    
- "How to manage state in a React component?"