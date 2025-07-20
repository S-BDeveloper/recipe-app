# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### 1. **DO NOT** create a public GitHub issue

Security vulnerabilities should be reported privately to prevent exploitation.

### 2. **Email us directly**

Send details to: [security@culinaria.com](mailto:security@culinaria.com)

### 3. **Include the following information:**

- **Description**: Clear description of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Environment**: Browser, OS, and version information
- **Proof of concept**: If applicable, include a safe proof of concept

### 4. **Response timeline:**

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Resolution**: Depends on severity and complexity

## Security Measures

### Environment Variables

- All API keys and secrets are stored in `.env` files
- `.env` files are excluded from version control
- `env.example` provides template for required variables

### Dependencies

- Regular dependency updates via Dependabot
- Automated vulnerability scanning
- Manual security reviews for major updates

### Code Quality

- ESLint security rules enabled
- TypeScript strict mode enabled
- Automated security scanning in CI/CD

### Firebase Security

- Firestore security rules implemented
- Authentication required for sensitive operations
- Input validation on all user inputs

## Responsible Disclosure

We follow responsible disclosure practices:

1. **Private reporting** of vulnerabilities
2. **Timely acknowledgment** of valid reports
3. **Coordinated disclosure** with security researchers
4. **Credit acknowledgment** for valid reports (if desired)

## Security Best Practices

### For Contributors

- Never commit API keys or secrets
- Use environment variables for configuration
- Validate all user inputs
- Follow secure coding practices
- Keep dependencies updated

### For Users

- Use strong, unique passwords
- Enable two-factor authentication
- Report suspicious activity immediately
- Keep your browser and OS updated

## Security Contacts

- **Security Team**: [security@culinaria.com](mailto:security@culinaria.com)
- **Lead Developer**: [sabina@culinaria.com](mailto:sabina@culinaria.com)
- **Emergency Contact**: [emergency@culinaria.com](mailto:emergency@culinaria.com)

## Bug Bounty

Currently, we do not offer a formal bug bounty program, but we do acknowledge security researchers who responsibly disclose vulnerabilities.

---

**Thank you for helping keep Culinaria secure!**
