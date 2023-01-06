# Stage 1
FROM node:16.10.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2

FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=node /app/dist/simusr-fe-jwt .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
