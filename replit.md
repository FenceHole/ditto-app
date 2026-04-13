# Chris & Annie

## Overview

Chris & Annie is a private relationship app for couples to connect deeper, share love letters, and grow together through meaningful conversations. The application provides interactive question games with different categories (soul-bearing, fun, dreams, memories, growth) and a shared love journal for writing and exchanging love letters.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens, supporting light/dark mode via CSS variables
- **Font**: Inter (Google Fonts)
- **Theme**: Rose/pink gradient accent colors

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON API with `/api` prefix
- **Build Tool**: esbuild for server bundling, Vite for client

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect (using node-postgres Pool driver)
- **Schema Location**: `shared/schema.ts` and `shared/models/auth.ts` define database tables
- **Tables**:
  - `users` - User accounts (Replit Auth)
  - `sessions` - Session storage
  - `journal_entries` - Love letters and journal entries
- **Migrations**: Managed via `drizzle-kit push` command

### Authentication
- **Provider**: Replit Auth (OIDC-based) via `server/replit_integrations/auth/`
- **Routes**:
  - `/api/login` - Initiates OIDC login flow
  - `/api/logout` - Clears session and redirects to home
  - `/api/callback` - Handles OIDC callback
  - `/api/auth/user` - Returns current authenticated user
- **Frontend Hook**: `client/src/hooks/use-auth.ts` provides `useAuth()` for auth state

### Core Features

1. **Question Games** (`/questions`)
   - Multiple categories: Soul Bearing, Fun & Playful, Dreams & Future, Our Memories, Growing Together
   - Answer questions together and reveal answers
   - Track answered questions per session

2. **Love Journal** (`/love-journal`)
   - Write love letters with titles
   - Share or keep private
   - View letters from partner
   - View your sent letters

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route page components
│   │   │   ├── dashboard.tsx
│   │   │   ├── questions.tsx
│   │   │   ├── love-journal.tsx
│   │   │   ├── landing.tsx
│   │   │   └── profile.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── replit_integrations/  # Auth integration
├── shared/           # Shared types and schemas
│   ├── schema.ts     # Drizzle schema
│   └── models/auth.ts # User and session models
```

### API Endpoints

- `GET /api/journal/entries` - Get all journal entries
- `POST /api/journal/entries` - Create new journal entry (requires auth)
  - Body: `{ title, content, isShared }`

### Key Design Decisions

1. **Monorepo Structure**: Client and server share types via `shared/` directory

2. **Theme System**: Rose/pink gradients for romantic feel, supports light/dark mode

3. **Privacy First**: Journal entries can be shared or kept private
