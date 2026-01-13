# Developer Guidelines

This document outlines the technical architecture, patterns, and conventions used in this project. It serves as a reference for understanding how the codebase is organized and how to work with it effectively.

## Tech Stack

### Core Framework
- **React 19.2.0** - UI library with TypeScript 5.9.3
- **Vike 0.4.206** - Meta-framework providing SSR/SSG capabilities with Vite
- **Vite 7.2.2** - Build tool and dev server with SWC for fast builds
- **React Router DOM 7.9.6** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Shadcn/ui** - Re-usable component library built on Radix UI primitives
- **Framer Motion 12.23.24** - Animation library
- **Lucide React 0.553.0** - Icon library
- **class-variance-authority** - Component variant management
- **clsx + tailwind-merge** - Conditional class name utilities

### Internationalization
- **i18next 25.6.3** - Core i18n framework
- **react-i18next 16.3.5** - React bindings for i18next
- **i18next-browser-languagedetector 8.2.0** - Automatic language detection

### Build & Development
- **TypeScript 5.9.3** - Static typing
- **@vitejs/plugin-react-swc** - Fast React compilation with SWC

## Project Structure

```
├── pages/                    # Vike page structure (file-based routing)
│   ├── +config.ts          # Vike global configuration (SSR/SSG settings)
│   ├── +Head.tsx          # Global HTML head component (SEO, meta tags)
│   ├── +Layout.tsx        # Root layout wrapper
│   ├── index/             # Route: / (landing page)
│   │   └── +Page.tsx      # Page component
│   └── [route-name]/      # Additional routes follow same pattern
│       └── +Page.tsx
│
├── src/
│   ├── components/
│   │   ├── ui/            # Shadcn/ui base components (Button, Card, etc.)
│   │   └── custom/        # Project-specific components (Navbar, Footer, etc.)
│   │
│   ├── hooks/             # Custom React hooks
│   │   └── useCountries.ts  # Example: data fetching hooks
│   │
│   ├── locales/           # Translation files
│   │   ├── en.json        # English translations (default/fallback)
│   │   └── it.json        # Italian translations
│   │
│   ├── i18n.ts            # i18next configuration
│   ├── lib/
│   │   └── utils.ts       # Utility functions (cn for class merging)
│   │
│   └── index.css          # Global styles with Tailwind directives
│
├── public/                # Static assets (images, favicon, etc.)
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

### Key Architectural Patterns

#### Page Structure (Vike)
Vike uses file-based routing with special files:
- `+Page.tsx` - The main page component (required)
- `+config.ts` - Page-specific configuration (optional)
- `+data.ts` - Data fetching for the page (optional)
- `+Head.tsx` - Page-specific meta tags (optional)
- `+Layout.tsx` - Layout wrapper (optional)

#### Component Organization
- **UI Components** (`src/components/ui/`) - Generic, reusable components from Shadcn/ui. These should remain domain-agnostic.
- **Custom Components** (`src/components/custom/`) - Application-specific components that use UI components as building blocks.

#### TypeScript Configuration
- Path alias: `@/*` maps to `./src/*`
- Use absolute imports: `import { Button } from '@/components/ui/button'`
- Project references separate app and Node.js tooling configs

## Internationalization (i18n)

### Architecture

The i18n system is configured in `src/i18n.ts` with:
- **Default language**: English (`en`)
- **Supported languages**: English (`en`) and Italian (`it`)
- **Fallback mechanism**: Missing translations fall back to English
- **Language detection**: Automatic browser/user preference detection
- **Namespace**: Single namespace configuration

### Adding Translations

Translation files are located in `src/locales/`:

```json
// src/locales/en.json
{
  "navbar": {
    "home": "Home",
    "about": "About"
  },
  "homepage": {
    "hero": {
      "title": "Welcome",
      "subtitle": "Get started"
    }
  }
}
```

Corresponding Italian translations:

```json
// src/locales/it.json
{
  "navbar": {
    "home": "Home",
    "about": "Chi siamo"
  },
  "homepage": {
    "hero": {
      "title": "Benvenuto",
      "subtitle": "Inizia ora"
    }
  }
}
```

### Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('homepage.hero.title')}</h1>
      <p>{t('homepage.hero.subtitle')}</p>
    </div>
  );
}
```

### Translation Key Conventions

- Use **nested structure** to organize translations by feature/page
- Follow the pattern: `feature.component.element`
- Keep keys **descriptive but concise**
- Mirror the component structure in translation keys

### Adding a New Language

1. Create a new JSON file in `src/locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json` and translate values
3. Add the language to `i18n.ts` configuration:
   ```ts
   supportedLngs: ['en', 'it', 'fr']
   ```
4. Update the LanguageSelector component to include the new option

## Styling System

### Tailwind CSS Configuration

The project uses Tailwind CSS 4.x with custom design tokens defined in `tailwind.config.ts`:
- Extended color palette (background, surface, primary)
- Custom animations (fade-in, slide-up, glow-pulse)
- Dark mode support via class strategy

### Component Styling Patterns

#### Using Shadcn/ui Components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

function Example() {
  return (
    <Card>
      <CardHeader>
        <Button variant="default">Click me</Button>
      </CardHeader>
    </Card>
  );
}
```

#### Custom Styling with Variants

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
        outline: 'outline-classes'
      }
    }
  }
);
```

#### Conditional Styling

Always use the `cn()` utility for merging Tailwind classes:

```tsx
import { cn } from '@/lib/utils';

function MyComponent({ isActive }: { isActive: boolean }) {
  return (
    <div className={cn(
      'base-classes',
      isActive && 'active-classes',
      'additional-classes'
    )}>
      Content
    </div>
  );
}
```

### Dark Mode

The app defaults to dark mode (`class="dark"` on HTML element). Use Tailwind's dark modifier:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Adaptive content
</div>
```

## Routing & Pages

### Creating a New Page

1. Create a new directory under `pages/`:
   ```
   pages/
   └── about/
       └── +Page.tsx
   ```

2. The file `pages/about/+Page.tsx` will automatically be served at `/about`

3. Add page-specific configuration in `pages/about/+config.ts`:
   ```tsx
   export default {
     title: 'About - My App',
     description: 'Learn more about us'
   };
   ```

### Dynamic Routes

Use the `@id` pattern for dynamic routes:
```
pages/
└── blog/
    └── @id/
        └── +Page.tsx  // Matches /blog/:id
```

Access route parameters via `pageContext.routeParams`:
```tsx
// +Page.tsx
export { Page };

function Page(pageContext: PageContext) {
  const { id } = pageContext.routeParams;
  return <div>Post: {id}</div>;
}
```

### Data Fetching

Use `+data.ts` for server-side data fetching:
```tsx
// +data.ts
export async function data(pageContext: PageContext) {
  const data = await fetchData();
  return {
    data: {
      items: data
    }
  };
}
```

Access in your page component:
```tsx
// +Page.tsx
export { Page };

function Page(pageContext: PageContext) {
  const { items } = pageContext.data;
  return <div>{/* render items */}</div>;
}
```

## Build & Development

### Development Commands

```bash
npm install         # Install dependencies
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build with SSR/SSG
npm run preview    # Preview production build
```

### Build Configuration

The build is configured in `vite.config.ts`:
- **Path aliases**: `@/*` → `./src/*`
- **Plugins**: React SWC, Tailwind CSS, Vike, custom sitemap generator
- **Output**: Default Vite build with SSG support

### Sitemap Generation

The `vite-plugin-sitemap.ts` automatically generates `sitemap.xml` after build. Add new routes to the sitemap config array.

## Component Development Guidelines

### Creating New UI Components

When adding new Shadcn/ui components:
1. Place in `src/components/ui/`
2. Use class-variance-authority for variants
3. Export from `src/components/ui/index.ts` (if present)
4. Keep components domain-agnostic and reusable

### Creating Custom Components

1. Place in `src/components/custom/`
2. Compose UI components together
3. Use useTranslation for all user-facing text
4. Accept className prop for flexibility:
   ```tsx
   interface MyComponentProps {
     className?: string;
   }

   function MyComponent({ className }: MyComponentProps) {
     return (
       <div className={cn('base-classes', className)}>
         {/* content */}
       </div>
     );
   }
   ```

### Animation Guidelines

Use Framer Motion for animations. Common patterns:

```tsx
import { motion } from 'framer-motion';

function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
}
```

For scroll-triggered animations, use viewport detection:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Animates on scroll
</motion.div>
```

## Type Safety

### Type Definitions

- Define component props as interfaces:
  ```tsx
  interface ButtonProps extends VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
    className?: string;
  }
  ```

- Use Vike's PageContext type for pages:
  ```tsx
  import type { PageContext } from 'vike/types';

  function Page(pageContext: PageContext) {
    // ...
  }
  ```

### Utility Types

Common utility types from the project:
- `VariantProps` - Extract variant types from CVA definitions
- `React.ComponentProps` - Extend HTML element props

## Performance Considerations

### Code Splitting
- Vite automatically code-splits by route
- Dynamic imports for heavy components:
  ```tsx
  const HeavyComponent = lazy(() => import('./HeavyComponent'));
  ```

### Image Optimization
- Place images in `public/` directory
- Use Vite's asset import for optimization:
  ```tsx
  import logo from '@/assets/logo.png';
  ```

### Bundle Size
- Tree-shaking is automatic with Vite
- Use ES modules for better tree-shaking
- Avoid large libraries when lightweight alternatives exist

## Common Patterns

### Error Handling

```tsx
try {
  await operation();
} catch (error) {
  console.error('Operation failed:', error);
  // Show user-friendly error message
}
```

### Loading States

```tsx
const [isLoading, setIsLoading] = useState(false);

async function handleSubmit() {
  setIsLoading(true);
  try {
    await submit();
  } finally {
    setIsLoading(false);
  }
}

return <Button disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</Button>;
```

### Environment Variables

- Create `.env` files at project root
- Access via `import.meta.env.VARIABLE_NAME`
- Prefix with `VITE_` for client-side variables

## Troubleshooting

### Common Issues

**Translations not loading**
- Check that JSON files are valid
- Verify language codes match in `i18n.ts` and translation files
- Clear browser cache and restart dev server

**Tailwind styles not applying**
- Ensure `@tailwind` directives are in `src/index.css`
- Check that `content` paths in `tailwind.config.ts` include your files
- Run `npm run build` to regenerate Tailwind cache (v4)

**Vike page not found**
- Verify `+Page.tsx` exists in the route directory
- Check file name is exactly `+Page.tsx` (case-sensitive)
- Restart dev server after adding new pages

**TypeScript errors**
- Ensure `tsconfig.json` path aliases are correct
- Run `npm install` to ensure all @types packages are installed
- Restart TypeScript server in your IDE

## Resources

- [Vike Documentation](https://vike.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [i18next Documentation](https://www.i18next.com/)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
