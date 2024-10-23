# Usa la imagen base de Node.js
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todos los demás archivos de la carpeta backend
COPY . .

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "dev"]
