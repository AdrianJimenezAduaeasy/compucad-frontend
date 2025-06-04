# Etapa de construcción
FROM node:22-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de servidor
FROM node:22-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist .
ENV PORT 8080
EXPOSE 8080
CMD ["serve", "-s", ".", "-l", "8080"]
