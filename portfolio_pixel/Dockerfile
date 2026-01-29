# --- Construcción ---
# Usamos una imagen de Node ligera
FROM node:18-alpine as builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación
RUN npm run build

# --- Servidor Producción ---
# Usamos Nginx Alpine (muy ligero, pesa <10MB)
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Arrancamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]