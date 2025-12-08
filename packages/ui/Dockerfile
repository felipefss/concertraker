FROM oven/bun:1 AS build
WORKDIR /app
RUN mkdir app
COPY package.json /app/

RUN bun install

COPY . .
RUN bun run build

FROM nginx:alpine AS release

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG VITE_BASE_API_URL

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]