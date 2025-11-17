# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL and other required libraries for Prisma
RUN apk add --no-cache openssl libc6-compat

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install OpenSSL and other required libraries for Prisma
RUN apk add --no-cache openssl libc6-compat

# Copy built application and dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {if (r.statusCode === 200) process.exit(0); process.exit(1);})"

# Start application
CMD ["node", "build"]
