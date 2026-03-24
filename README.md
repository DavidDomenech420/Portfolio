# Mi Portfolio

Un portafolio personal interactivo construido como una experiencia visual en 2D (estilo RPG isométrico). Más que un simple currículum web, este proyecto es una demostración técnica de cómo fusionar el diseño creativo (UI/UX) con fundamentos sólidos de Ingeniería de Software.

El objetivo de esta aplicación es ofrecer una experiencia inmersiva mediante micro-interacciones, gestión avanzada de estado en el cliente y un sistema de audio personalizado, todo ello empaquetado y servido bajo estándares de producción modernos.

## Filosofía del Proyecto

El enfoque principal ha sido construir los sistemas desde cero para aprender a trabajar realmente con la tecnología, en lugar de depender de código prefabricado o soluciones "caja negra". Por ello, elementos complejos como el reproductor de música o la gestión de modales interactivos han sido desarrollados íntegramente a medida, garantizando un control absoluto sobre el ciclo de vida de los componentes y el rendimiento del navegador.

## Stack Tecnológico

* **Frontend Core:** React.js & Vite (Gestión de estado, interactividad, fast-refreshing).
* **Estilos y UI:** Tailwind CSS (Utilidades atómicas, diseño responsive, paleta de colores personalizada *Gruvbox*).
* **Gestión de Audio:** HTML5 Audio API (Manipulación del DOM y eventos de reproducción asíncronos).
* **Despliegue y DevOps:** Docker, Docker Multi-stage builds & Nginx (Servidor web de alto rendimiento).

---

## 🏗️ Arquitectura y Flujo de la Aplicación

### 1. Sistema de Renderizado Condicional y "Mobile-Inverse"
Para garantizar la mejor Experiencia de Usuario (UX) sin sacrificar la creatividad, se ha implementado una estrategia de diseño responsivo poco convencional:
* **Desktop (Modo Habitación):** En pantallas grandes, se renderiza un entorno 2D interactivo absoluto (`InteractiveItems`). El usuario explora el DOM haciendo hover y click en objetos con mapeo de coordenadas espaciales.
* **Mobile (Modo Game Launcher):** En dispositivos móviles, renderizar una habitación pequeña es un anti-patrón de accesibilidad. Por ello, la UI muta por completo hacia un "Menú de Pausa" o *Launcher* vertical, ocultando el motor gráfico de la habitación y priorizando botones de acceso directo grandes e intuitivos mediante Media Queries de Tailwind (`md:hidden` vs `md:block`).

### 2. Motor de Audio Custom (React + HTML5 Audio)
En lugar de incrustar un simple *iframe* de Spotify (que limita el control del desarrollador sobre la UI), se construyó un reproductor de audio local completamente integrado en el ciclo de vida de React:
* **Sincronización UI/Estado:** El estado de React (`isPlaying`) controla las animaciones CSS en tiempo real (por ejemplo, el vinilo girando o el brazo del tocadiscos moviéndose).
* **Manejo de Eventos Asíncronos:** Se utilizan `useEffect` con listeners del evento `'ended'` de la API de Audio nativa para automatizar el salto a la siguiente pista de un array dinámico (`PLAYLIST`), gestionando la limpieza de memoria (`removeEventListener`) al desmontar el componente.
* **Bypass de Políticas de Autoplay:** Para cumplir con las estrictas políticas de los navegadores modernos (que bloquean el audio automático), se diseñó un "Intro Modal" obligatorio. Esta pantalla inicial fuerza la interacción táctil del usuario para "entrar", lo que desbloquea y lanza legítimamente la reproducción en segundo plano.

### 3. Arquitectura de Ventanas (Modales Inteligentes)
Toda la información se presenta mediante un componente centralizado `<Modal />` altamente reutilizable y parametrizable:
* **Prevención de Propagación:** Se utiliza `e.stopPropagation()` en elementos internos (como iconos de GitHub dentro de tarjetas clicables) para evitar el temido *event bubbling* y rutas ambiguas.
* **Comportamiento Dinámico del Scroll:** El modal acepta props paramétricas (`noScroll`). Si se renderiza texto (como la trayectoria), permite el *overflow-y*. Si se renderiza una "App" interna (como el tocadiscos), inyecta `overflow-hidden` para simular una ventana nativa rígida, mejorando la inmersión.

### 4. Micro-Interacciones y Feedback Visual
Se han programado pequeñas interacciones para que la interfaz se sienta "viva":
* **Portapapeles Dinámico:** La sección de contacto utiliza `navigator.clipboard.writeText` para copiar el email del usuario. Esto detona un cambio de estado temporal (`setTimeout` de 2 segundos) que altera las clases de Tailwind del botón para proveer feedback inmediato sin necesidad de alertas invasivas.

### 5. Navegación Global (Pause Menu)
Para evitar que el usuario se pierda buscando objetos en el entorno 2D, se implementó un *Sidebar* oculto. Este menú superpuesto se gestiona con un estado global en el componente padre, permitiendo cerrar la navegación y abrir la sección deseada en un solo flujo lógico, optimizando los renders de la pantalla.

---

## Preparación para Producción y DevOps
El proyecto está optimizado y preparado para un despliegue profesional automatizado:
* **Docker Multi-Stage Build:** El `Dockerfile` divide la construcción en dos etapas. Primero, utiliza una imagen de Node para compilar el código de React/Vite (`npm run build`). Segundo, extrae únicamente la carpeta `/dist` resultante y la inyecta en un contenedor **Nginx Alpine** ultra ligero.
* **Enrutamiento SPA en Nginx:** Se ha configurado un `nginx.conf` personalizado con la directiva `try_files $uri $uri/ /index.html`. Esto es crítico para cualquier Single Page Application, asegurando que si un usuario recarga la página, el servidor delegue el enrutamiento interno de vuelta a React en lugar de devolver un error 404.