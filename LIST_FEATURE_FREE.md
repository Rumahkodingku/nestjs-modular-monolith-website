# Feature List — nestjs-modular-monolith-free

## Authentication

- [x] User registration with email, password, and display name
- [x] Password hashing with **Argon2id** (64 MiB memory, 3 iterations, 1 parallelism)
- [x] User login with email/password — Argon2id verification
- [x] JWT access token generation (HS256, configurable `secret` + `expiry` via env)
- [x] JWT Bearer token extraction and validation (`passport-jwt` strategy)
- [x] `JwtAuthGuard` — `AuthGuard('jwt')` from `@nestjs/passport`
- [x] Password change — verify current password, hash and persist new one
- [x] Duplicate email detection on register → **409 Conflict**
- [x] Invalid credentials → **401 Unauthorized** (generic message)
- [x] Password excluded from all API responses (`@Exclude()` on entity)

## RBAC (Role-Based Access Control)

- [x] Two built-in roles: `ADMIN`, `USER` (seeded)
- [x] `Role` entity — UUID PK, unique name, timestamps (`created_at`, `updated_at`)
- [x] `RbacUserRole` entity — composite PK `(userId, roleId)`, `assigned_at`
- [x] `RolesGuard` — global guard (`APP_GUARD`), checks `@Roles()` metadata on handlers/classes
- [x] `@Roles(...roles)` decorator — route-level role requirements
- [x] ADMIN-only routes return **403** for users without the `ADMIN` role
- [x] Routes without `@Roles()` allow **any authenticated** user
- [x] Routes without `@Roles()` block **unauthenticated** requests
- [x] Automatic `USER` role assignment on registration
- [x] Role repository — `findOneBy`, `findByIds` (QueryBuilder)
- [x] User-Role repository — `findByUserId`, `create`, `save`
- [x] Public service interface pattern — `RBAC_PUBLIC_SERVICE` injection token
- [x] Duplicate role assignment prevention

## Users

- [x] `User` entity — UUID PK, unique `email`, `display_name`, `password` (excluded), `created_at`, `updated_at`
- [x] Current user profile — `GET /api/v1/users/me`
- [x] Update display name — `PATCH /api/v1/users/me` with `@MaxLength(100)` validation
- [x] Paginated user listing (ADMIN only) — `GET /api/v1/users` with `{ data, meta: { total, page, limit, totalPages } }`
- [x] Get user detail (ADMIN only) — `GET /api/v1/users/:id` with role enrichment
- [x] User repository — `findOneBy`, `findOneByOrFail`, `create`, `save`, `findAndCount`
- [x] Public service interface pattern — `USERS_PUBLIC_SERVICE` injection token
- [x] Role enrichment from RBAC module on user responses

## Database

- [x] TypeORM + PostgreSQL via `@nestjs/typeorm` `forRootAsync`
- [x] `autoLoadEntities: true` — entities discovered from `forFeature()` registrations
- [x] `synchronize` disabled in production, configurable via `DB_SYNC` env
- [x] Standalone `DataSource` for CLI tools (`data-source.ts`) with dotenv
- [x] Migration CLI scripts: `generate`, `show`, `run`, `revert` (via `tsx` + TypeORM CLI)

## Configuration

- [x] Centralized `.env` loading via `@nestjs/config`
- [x] **Joi** validation schema at bootstrap — 12 environment variables validated
- [x] Conditional JWT secret validation (min 32 characters in `production`)
- [x] Typed `ConfigService` with getters: `port`, `nodeEnv`, `database`, `jwt`, `cors`
- [x] Sensible defaults for all env vars in development

## Swagger / OpenAPI

- [x] Swagger UI at `/api/docs` via `SwaggerModule.setup()`
- [x] Raw OpenAPI JSON at `/api/docs-json`
- [x] JWT Bearer auth scheme configured globally
- [x] `@ApiTags` on all controllers (`Auth`, `Users`, `Health`)
- [x] `@ApiOperation` summary on every endpoint
- [x] `@ApiResponse` with HTTP status codes on every endpoint
- [x] `@ApiBearerAuth()` on all JWT-protected endpoints
- [x] `@ApiProperty` with examples on all DTO fields

## Health Checks

- [x] **Liveness** — `GET /health/live` → `200 { status: "ok" }` (no DB access)
- [x] **Readiness** — `GET /health/ready` → pings DB via `SELECT 1`, returns `200` or `503`
- [x] Health routes live **outside** the `/api/v1` prefix

## API Infrastructure

- [x] Global prefix: `/api/v1`
- [x] Global `ValidationPipe` — `whitelist`, `forbidNonWhitelisted`, `transform`
- [x] Global `AllExceptionsFilter` — unified error shape `{ message, error, statusCode }`
- [x] CORS — origin from `CORS_ORIGIN` env, defaults to `*`
- [x] No stack traces in production error responses

## Seeder

- [x] Idempotent role seeding — `ADMIN`, `USER` (skips if already present)
- [x] Idempotent admin user seeding — configurable via `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars
- [x] Argon2id password hashing in seeder (matching auth service params)
- [x] Error handling — logs errors and exits with code 1

## Docker

- [x] Multi-stage `Dockerfile` — builder (pnpm build) + runtime (node:22-alpine)
- [x] `docker-compose.yml` — Postgres 17 + API service, `depends_on` with healthcheck
- [x] PostgreSQL `pg_isready` healthcheck
- [x] Named volume `pgdata` for persistent data
- [x] `.dockerignore` — excludes `node_modules`, `dist`, `.git`, `coverage`

## Testing

- [x] 7 unit test spec files (33 test cases total):
    - Auth: register success/duplicate, login success/not-found/wrong-password, change-password success/unauthorized
    - RBAC: assign-role success/missing-role/duplicate, get-roles single/multiple/empty
    - Users: findByEmail, findById, create, updatePassword, updateDisplayName, findAll pagination
    - Config: config-defined, port, database-config, jwt-config, cors-config
    - Database: service-defined
    - Common: service-defined
    - ApiController: getHello
- [x] 1 E2E test — smoke test `GET /api/v1` returns `200` and `"Hello World!"`
- [x] Jest path aliases (`moduleNameMapper`) synced with `tsconfig.json`
- [x] Separate E2E Jest config with adjusted path resolution

## Architecture Patterns

- [x] NestJS monorepo — 1 app (`api`) + 7 libraries
- [x] Modular boundaries — public service interfaces with injection tokens
- [x] Custom repository classes wrapping TypeORM `Repository`
- [x] Cross-module communication only via `public/` interfaces (no direct internal imports)
- [x] Barrel exports (`index.ts`) at every library root
- [x] Path aliases (`@modules/*`, `@shared/*`) in both `tsconfig.json` and Jest config

## Stubs / Placeholders

- `CommonService` / `CommonModule` — empty class with no methods
- `DatabaseService` — empty class (TypeORM connection lives in `DatabaseModule` directly)
