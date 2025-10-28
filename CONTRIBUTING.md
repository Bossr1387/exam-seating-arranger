# Contributing to Exam Seating Arranger

First off, thank you for considering contributing to Exam Seating Arranger! It's people like you that make this tool better for everyone.

## Table of Contents

- [Contributing to Exam Seating Arranger](#contributing-to-exam-seating-arranger)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Pull Requests](#pull-requests)
  - [Development Setup](#development-setup)
  - [Style Guidelines](#style-guidelines)
    - [JavaScript](#javascript)
    - [CSS](#css)
    - [HTML](#html)
  - [Commit Guidelines](#commit-guidelines)
  - [Pull Request Process](#pull-request-process)
    - [PR Template](#pr-template)
  - [Questions?](#questions)

## Code of Conduct

This project and everyone participating in it is governed by a simple principle: **Be respectful and constructive**. By participating, you are expected to uphold this principle.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots, sample data files)
- **Describe the behavior you observed and what you expected**
- **Include browser/OS information**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar tools/features for reference**

### Pull Requests

- Fill in the required template
- Follow our style guidelines
- Update documentation as needed
- Add tests if applicable
- Ensure all tests pass

## Development Setup

1. **Fork and clone the repository**
```bash
   git clone https://github.com/CrueChan/exam-seating-arranger.git
   cd exam-seating-arranger
```

2. **Open in browser**
```bash
   # No build step needed! Just open index.html
   open index.html
```

3. **Make your changes**
   - Edit HTML, CSS, or JavaScript files
   - Test in multiple browsers (Chrome, Firefox, Safari, Edge)
   - Ensure responsive design works on mobile

4. **Test thoroughly**
   - Test with various data formats
   - Test edge cases (empty data, special characters, large datasets)
   - Verify multilingual support

## Style Guidelines

### JavaScript

- Use ES6+ features
- Use camelCase for variables and functions
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Avoid global variables (except explicitly exported functions)
```javascript
/**
 * Parse tab-separated or CSV data
 * @param {string} text - Raw input text
 * @returns {Object} Parsed data with headers and rows
 */
function parseData(text) {
    // Implementation
}
```

### CSS

- Use CSS custom properties (variables) for colors and spacing
- Follow BEM naming convention for classes
- Group related properties together
- Add comments for complex sections
- Ensure mobile-first responsive design
```css
/* Component: Button */
.btn {
    /* Layout */
    display: inline-flex;
    padding: var(--spacing-md);
    
    /* Typography */
    font-size: 1rem;
    font-weight: 600;
    
    /* Visual */
    background: var(--primary-gradient);
    border-radius: var(--radius-pill);
}
```

### HTML

- Use semantic HTML5 elements
- Add ARIA labels for accessibility
- Ensure proper heading hierarchy
- Include alt text for images
- Use meaningful IDs and classes

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
```bash
feat: add CSV export with custom delimiters
fix: resolve spacing validation for edge cases
docs: update README with new configuration options
style: improve button hover animations
```

## Pull Request Process

1. **Update documentation** if you've changed functionality
2. **Add/update tests** if applicable
3. **Ensure code follows style guidelines**
4. **Update CHANGELOG.md** with your changes
5. **Request review** from maintainers
6. **Address feedback** promptly and professionally

### PR Template
```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] Tested with sample data

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design verified
```

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

---

Thank you for contributing! 🎉