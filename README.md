# OpenWhistle

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-blue)](https://www.postgresql.org/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.0-orange)](https://kit.svelte.dev/)

**OpenWhistle** is an open-source, multi-tenant whistleblower platform that enables organizations to receive anonymous reports securely through customizable links.

## ✨ Features

### 🔐 Security & Privacy
- **End-to-End Encryption**: All reports encrypted with AES-256-GCM
- **Complete Anonymity**: No IP tracking, no accounts required for whistleblowers
- **Session-based Auth**: Secure authentication using Lucia Auth v3
- **Data Protection**: GDPR/CCPA compliant data handling

### 📊 Organization Management
- **Multi-Tenant Architecture**: Support for 100+ organizations per instance
- **Project/Campaign System**: Create multiple reporting projects with unique URLs
- **Custom URL Generation**: Disguised URLs, QR codes, and short links
- **Team Management**: Role-based access control for organization members

### 📝 Report Management
- **Anonymous Submission**: Simple, secure report submission interface
- **File Attachments**: Support for images, documents with encryption
- **Report Tracking**: Unique tokens for status checking
- **Two-way Communication**: Anonymous messaging between reporters and admins

### 🔔 Notifications
- **Webhook Integration**: Real-time notifications via:
  - Telegram Bot
  - Discord Webhooks
  - Slack (coming soon)
  - Custom HTTP endpoints
- **Event Types**: New reports, status updates, messages

### 🎨 User Experience
- **Modern UI**: Dark-first design with Tailwind CSS & Skeleton UI
- **Responsive**: Mobile-first, PWA-ready
- **Accessible**: WCAG 2.1 AA compliant
- **Multi-language**: i18n support ready

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Redis** 7+ ([Download](https://redis.io/download))
- **MinIO** or S3-compatible storage ([Download](https://min.io/download))

### Option 1: Docker Compose (Recommended)

The easiest way to get started:

```bash
# Clone the repository
git clone https://github.com/yourusername/openwhistle.git
cd openwhistle

# Copy environment file
cp .env.example .env

# Generate secure secrets
node -e "console.log('ENCRYPTION_KEY=' + require('crypto').randomBytes(32).toString('hex'))" >> .env
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))" >> .env

# Start all services with Docker Compose
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma migrate deploy

# Create MinIO bucket (first time only)
# Access MinIO Console at http://localhost:9001 (minioadmin/minioadmin)
# Create bucket named: openwhistle-files
```

The application will be available at:
- **App**: http://localhost:3000
- **MinIO Console**: http://localhost:9001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/openwhistle.git
cd openwhistle

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Make sure to set DATABASE_URL, REDIS_URL, and other required variables

# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit http://localhost:5173 to see the application.

## 📖 Usage

### 1. Create an Organization

1. Navigate to `/register`
2. Fill in organization details:
   - Organization name
   - Unique slug (for URLs)
   - Admin name and email
   - Strong password (min 12 chars)
3. Accept terms and create account

### 2. Create a Reporting Project

1. Login to your dashboard
2. Navigate to "Projects" > "Create New"
3. Configure:
   - Project name and description
   - Report categories
   - File upload settings
   - Custom message for reporters
4. Generate custom URLs:
   - Standard: `app.com/report/{slug}`
   - Stealth: `app.com/feedback/{random}`
   - Short URL and QR code

### 3. Configure Webhooks

**Telegram Integration:**
1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Get your chat ID (send `/start` to your bot, then use https://api.telegram.org/bot{TOKEN}/getUpdates)
4. In OpenWhistle: Settings > Webhooks > Add Telegram
5. Enter bot token and chat ID
6. Test the webhook

**Discord Integration:**
1. Go to Discord Server Settings > Integrations > Webhooks
2. Create a new webhook
3. Copy the webhook URL
4. In OpenWhistle: Settings > Webhooks > Add Discord
5. Paste the URL and configure events

### 4. Receive Reports

When someone submits a report:
1. You receive instant notification via webhooks
2. Report appears in your dashboard
3. All data is encrypted at rest
4. You can reply anonymously
5. Reporter can track status with their unique token

## 🏗️ Architecture

```
openwhistle/
├── src/
│   ├── lib/
│   │   ├── components/       # Svelte components
│   │   ├── server/
│   │   │   ├── auth/         # Lucia Auth setup
│   │   │   ├── db/           # Prisma client
│   │   │   ├── encryption/   # AES-256-GCM encryption
│   │   │   ├── trpc/         # tRPC API (future)
│   │   │   └── webhooks/     # Webhook delivery
│   │   ├── types/            # TypeScript types
│   │   ├── schemas/          # Zod validation schemas
│   │   └── utils/            # Utility functions
│   └── routes/
│       ├── (auth)/           # Login, register, logout
│       ├── (public)/         # Public submission pages
│       ├── (dashboard)/      # Admin dashboard
│       └── api/              # API endpoints
├── prisma/
│   └── schema.prisma         # Database schema
├── static/                   # Static assets
└── docker-compose.yml        # Docker services
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available options. Key variables:

```env
# Application
NODE_ENV=production
PUBLIC_APP_URL=https://your-domain.com
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@host:5432/openwhistle

# Redis
REDIS_URL=redis://host:6379

# Security (GENERATE NEW VALUES!)
ENCRYPTION_KEY=     # 32-byte hex string
JWT_SECRET=         # Random 64+ chars
WEBHOOK_SIGNING_SECRET=  # Random 32+ chars
SESSION_SECRET=     # Random 32+ chars

# File Storage
S3_ENDPOINT=https://s3.amazonaws.com
S3_BUCKET=openwhistle-files
S3_ACCESS_KEY=your-key
S3_SECRET_KEY=your-secret
```

### Database Schema

The database includes these main tables:
- **organizations**: Organization accounts
- **admins**: Admin users with authentication
- **projects**: Reporting projects/campaigns
- **project_urls**: Custom URLs for each project
- **reports**: Encrypted report submissions
- **attachments**: Encrypted file uploads
- **conversations**: Anonymous messaging
- **webhooks**: Notification configurations
- **audit_logs**: Activity tracking

## 🛠️ Development

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+

### Setup

```bash
# Install dependencies
npm install

# Setup database
npm run db:migrate

# Generate Prisma Client
npm run db:generate

# Start dev server
npm run dev

# Run tests
npm test

# Type checking
npm run check

# Linting
npm run lint

# Format code
npm run format
```

### Database Commands

```bash
# Create migration
npm run db:migrate

# Push schema changes (dev)
npm run db:push

# Open Prisma Studio
npm run db:studio

# Generate Prisma Client
npm run db:generate
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests with coverage
npm run test -- --coverage
```

## 📦 Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Deploy with Docker

```bash
# Build image
docker build -t openwhistle .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e REDIS_URL="redis://..." \
  openwhistle
```

## 🔒 Security

### Best Practices

1. **Always use HTTPS in production**
2. **Generate new encryption keys** - Never use example values
3. **Enable CSRF protection** - Enabled by default in SvelteKit
4. **Implement rate limiting** - Prevent abuse
5. **Regular backups** - Automated daily backups
6. **Update dependencies** - Run `npm audit` regularly
7. **Monitor logs** - Use Sentry or similar

### Encryption

- Reports: AES-256-GCM encryption at rest
- Files: Encrypted before S3 upload
- Passwords: Argon2id hashing
- Sessions: Secure, HTTP-only cookies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Documentation**: [docs.openwhistle.org](https://docs.openwhistle.org) (coming soon)
- **Issues**: [GitHub Issues](https://github.com/yourusername/openwhistle/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/openwhistle/discussions)
- **Email**: support@openwhistle.org

## 🗺️ Roadmap

### v1.0 (MVP) - Q1 2025
- [x] Organization registration
- [x] Project management
- [x] Anonymous report submission
- [x] Report tracking
- [x] Admin dashboard
- [x] Telegram/Discord webhooks
- [ ] File upload with encryption
- [ ] Two-way messaging
- [ ] Email notifications

### v1.1 - Q2 2025
- [ ] Multi-factor authentication (2FA)
- [ ] Advanced analytics
- [ ] Report export (PDF/CSV)
- [ ] Slack integration
- [ ] WhatsApp Business API
- [ ] Multi-language support

### v2.0 - Q3 2025
- [ ] Mobile apps (iOS/Android)
- [ ] API v2 with GraphQL
- [ ] Advanced encryption (PGP)
- [ ] Tor/Onion support
- [ ] Compliance reports (SOC 2)

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

## 👏 Acknowledgments

Built with:
- [SvelteKit](https://kit.svelte.dev/) - Web framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Lucia Auth](https://lucia-auth.com/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Skeleton UI](https://www.skeleton.dev/) - Component library

---

**Made with ❤️ for transparency and accountability**
