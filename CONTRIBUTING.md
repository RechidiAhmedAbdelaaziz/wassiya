# Contributing to Wassiya.fr

Thank you for considering contributing to Wassiya.fr! This project aims to help Muslims create their Islamic wills easily and privately.

## How to Contribute

### Reporting Issues

-   Use GitHub Issues to report bugs or suggest features
-   Provide detailed information about the issue
-   Include steps to reproduce if reporting a bug

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes**

    - Follow the existing code style
    - Write clear, commented code
    - Test your changes thoroughly

4. **Commit your changes**

    ```bash
    git commit -m "feat: add new feature description"
    ```

    Use conventional commit messages:

    - `feat:` for new features
    - `fix:` for bug fixes
    - `docs:` for documentation changes
    - `style:` for formatting changes
    - `refactor:` for code refactoring
    - `test:` for adding tests
    - `chore:` for maintenance tasks

5. **Push to your fork**

    ```bash
    git push origin feature/your-feature-name
    ```

6. **Create a Pull Request**
    - Describe your changes clearly
    - Reference any related issues

## Development Guidelines

### Code Style

-   Use TypeScript for type safety
-   Follow React best practices
-   Use functional components and hooks
-   Keep components small and focused
-   Write meaningful variable and function names

### Component Structure

```tsx
// Good component structure
interface ComponentProps {
  // Props with proper types
}

export const Component: React.FC<ComponentProps> = ({ props }) => {
  // Hooks at the top
  // Event handlers
  // Render logic

  return (
    // JSX
  );
};
```

### Islamic Content

When adding or modifying Islamic content:

-   Ensure accuracy by referencing authentic sources
-   Include references (Quran verses, Hadith sources)
-   Be respectful and culturally sensitive
-   Verify with knowledgeable Muslims when uncertain

### Privacy & Security

-   Never add features that send data to external servers
-   Maintain the privacy-first architecture
-   No tracking or analytics without explicit opt-in
-   Keep all data in local storage only

### Testing

-   Test all form validations
-   Verify PDF generation with different data
-   Test on different screen sizes
-   Ensure accessibility features work

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── forms/          # Form components
├── types/          # TypeScript definitions
├── store/          # State management
├── utils/          # Utility functions
└── assets/         # Static assets
```

## Questions?

Feel free to open an issue for questions or discussions.

## Code of Conduct

-   Be respectful and inclusive
-   Focus on constructive feedback
-   Help create a welcoming environment
-   Remember this is a service for the Muslim community

JazakAllahu Khairan (May Allah reward you with goodness) for your contributions!
