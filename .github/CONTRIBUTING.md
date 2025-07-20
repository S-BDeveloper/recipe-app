# Contributing to Culinaria

Thank you for your interest in contributing to Culinaria! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git

### Fork and Clone

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/culinaria-recipe-app.git
   cd culinaria-recipe-app
   ```

### Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Use proper type annotations
- Avoid `any` type when possible

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types/interfaces
- Implement proper error boundaries

### Styling

- Use Tailwind CSS for styling
- Follow the project's color palette
- Use CSS variables for consistency
- Ensure responsive design

### File Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── utils/         # Utility functions
├── types/         # TypeScript types
├── services/      # API services
└── contexts/      # React contexts
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

## Pull Request Process

### Before Submitting

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**

   - Follow coding standards
   - Add tests for new functionality
   - Update documentation

3. **Run quality checks:**

   ```bash
   npm run lint
   npm run type-check
   npm run test
   npm run build
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Format

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

### Pull Request Guidelines

1. **Title**: Clear, descriptive title
2. **Description**: Detailed description of changes
3. **Related Issues**: Link to related issues
4. **Screenshots**: Include screenshots for UI changes
5. **Testing**: Describe how to test the changes

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one approval required
3. **Security Review**: Security checks must pass
4. **Documentation**: Documentation must be updated

## Issue Reporting

### Bug Reports

When reporting bugs, include:

- **Description**: Clear description of the bug
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, version
- **Screenshots**: If applicable

### Feature Requests

When requesting features, include:

- **Description**: Clear description of the feature
- **Use case**: Why this feature is needed
- **Proposed solution**: How it could be implemented
- **Alternatives**: Other approaches considered

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new functionality
- Use React Testing Library
- Test user interactions, not implementation
- Aim for 80%+ test coverage

### Test Structure

```typescript
describe("ComponentName", () => {
  it("should render correctly", () => {
    // Test implementation
  });

  it("should handle user interactions", () => {
    // Test user interactions
  });
});
```

## Documentation

### Code Documentation

- Use JSDoc for complex functions
- Add inline comments for complex logic
- Keep comments up to date

### README Updates

- Update README for new features
- Include setup instructions
- Add usage examples

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes

## Security

### Security Guidelines

- Never commit API keys or secrets
- Use environment variables
- Validate all user inputs
- Follow OWASP guidelines
- Report security issues privately

### Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation implemented
- [ ] Authentication required where needed
- [ ] Error messages don't leak information
- [ ] Dependencies are up to date

## Getting Help

- **Discussions**: Use GitHub Discussions
- **Issues**: Create GitHub issues
- **Email**: [support@culinaria.com](mailto:support@culinaria.com)

## Recognition

Contributors will be recognized in:

- README contributors section
- Release notes
- Project documentation

---

**Thank you for contributing to Culinaria!**
