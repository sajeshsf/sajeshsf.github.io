# Source Code

This directory contains all the source code for the portfolio website.

## Structure

```
src/
├── components/    # Reusable UI components (see components/README.md)
├── pages/         # Page-level components (see pages/README.md)
├── data/          # Content data files (see data/README.md)
├── utils/         # Helper functions and hooks (see utils/README.md)
├── config/        # Configuration and constants (see config/README.md)
├── assets/        # Static assets like SVG images (see assets/README.md)
├── App.jsx        # Main application component
├── main.jsx       # Application entry point
└── index.css      # Main stylesheet
```

## Entry Point

- **main.jsx**: React application entry point that renders the App component
- **App.jsx**: Main application component that handles routing and layout

## Styling

- **index.css**: Main stylesheet with CSS variables, Bento Box grid system, and responsive design utilities

## Component Architecture

The application uses a component-based architecture:

- **Components**: Reusable UI elements (buttons, cards, grids, etc.)
- **Pages**: Complete page-level components (HomePage, AboutPage, etc.)
- **Layout**: Wrapper components for consistent page structure
- **SEO**: Dynamic meta tag management component

## Data Flow

1. Data is stored in `data/` directory as JavaScript modules
2. Components import and use this data to render content
3. Pages compose components and data to create full pages
4. Utils provide helper functions for data transformation and routing

## Development Guidelines

- Use PropTypes for type checking
- Follow React best practices (hooks, functional components)
- Maintain accessibility (ARIA labels, semantic HTML)
- Ensure responsive design for all screen sizes
- Use CSS variables for theming

## Related Documentation

- [Components](components/README.md) - Component documentation
- [Pages](pages/README.md) - Page documentation
- [Data](data/README.md) - Data structure documentation
- [Utils](utils/README.md) - Utilities and hooks documentation
- [Config](config/README.md) - Configuration documentation
