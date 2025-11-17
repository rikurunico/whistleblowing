# Contributing to OpenWhistle

Thank you for your interest in contributing to OpenWhistle! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct (to be added).

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/openwhistle/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Detailed description of the issue
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check [Discussions](https://github.com/yourusername/openwhistle/discussions) for similar suggestions
2. Create a new discussion with:
   - Clear use case
   - Expected behavior
   - Why this would be valuable
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Write or update tests
5. Ensure all tests pass (`npm test`)
6. Format code (`npm run format`)
7. Lint code (`npm run lint`)
8. Commit with clear message (`git commit -m 'Add some AmazingFeature'`)
9. Push to your fork (`git push origin feature/AmazingFeature`)
10. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/openwhistle.git
cd openwhistle

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/openwhistle.git

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your local settings

# Start development
npm run dev
```

### Coding Standards

- Use TypeScript for type safety
- Follow existing code style
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Write tests for new features
- Update documentation

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add Telegram webhook integration

- Implement Telegram bot API client
- Add webhook configuration UI
- Write tests for message delivery
```

### Testing

- Write unit tests for utilities and functions
- Write integration tests for API endpoints
- Write E2E tests for critical user flows
- Ensure coverage stays above 80%

```bash
# Run tests
npm test

# Run tests with coverage
npm run test -- --coverage

# Run tests in UI mode
npm run test:ui
```

## Project Structure

```
src/
├── lib/
│   ├── components/       # Reusable Svelte components
│   ├── server/          # Server-side code
│   │   ├── auth/        # Authentication logic
│   │   ├── db/          # Database client
│   │   ├── encryption/  # Encryption utilities
│   │   └── webhooks/    # Webhook delivery
│   ├── types/           # TypeScript type definitions
│   ├── schemas/         # Zod validation schemas
│   └── utils/           # Utility functions
└── routes/              # SvelteKit routes
    ├── (auth)/          # Auth pages
    ├── (public)/        # Public pages
    └── (dashboard)/     # Protected dashboard
```

## Security

- Never commit sensitive data
- Use environment variables for secrets
- Validate all user input
- Sanitize HTML output
- Use prepared statements for SQL
- Implement rate limiting
- Follow OWASP guidelines

If you discover a security vulnerability, please email security@openwhistle.org instead of creating a public issue.

## Questions?

- Join our [Discussions](https://github.com/yourusername/openwhistle/discussions)
- Ask in [Issues](https://github.com/yourusername/openwhistle/issues)
- Email: support@openwhistle.org

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
