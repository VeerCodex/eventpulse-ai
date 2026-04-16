# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
# For this project, npm might not be executed locally so we don't have package-lock.json
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
