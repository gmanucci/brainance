# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM docker.io/library/node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cached unless package-lock changes)
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy source and build for production
COPY . .
RUN npx ng build --configuration production

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM docker.io/library/nginx:1.27-alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder stage
COPY --from=builder /app/dist/brainance/browser /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
