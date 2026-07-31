# Pro Plan Features

Production-ready backend foundation with complete authentication, authorization,
operations, documentation, and developer tooling. Built for teams that want to
ship business features without rebuilding backend infrastructure from scratch.

## Full-Featured Authentication

Complete and secure authentication flow covering public registration, email
verification, login, JWT access tokens, rotating refresh tokens, CSRF
protection, password changes, email changes, logout, and session management.

- Argon2id password hashing with configurable security parameters
- Separate access and refresh token secrets, expiry, issuer, and audience
- HTTP-only refresh cookies and signed CSRF tokens
- Refresh-token rotation with replay detection
- Session listing, individual revocation, and logout from all sessions
- Automatic token invalidation after password or account-status changes
- Active, suspended, and pending-verification account states
- Verification-token expiry and resend protection

## Full-Featured RBAC

Flexible role-based access control for system roles, custom roles, permissions,
and user-specific access requirements.

- Built-in `SUPER_ADMIN`, `ADMIN`, and `USER` roles
- Custom role and permission management
- Role permission assignment
- Per-user `ALLOW` and `DENY` permission overrides
- Effective-permission resolution on authenticated requests
- Permission-based and super-admin-only route protection
- Protected system roles and permissions
- Last-active-super-admin safeguards

## Full-Featured User Management

Complete self-service and administrative user lifecycle management from account
creation through suspension, deletion, and restoration.

- Current-user profile and effective-permission discovery
- Self-service profile and email updates
- Managed user creation
- Paginated user listing with search and filters
- Role and status filtering
- User profile and status updates
- Verified email-change workflow
- Soft delete and account restoration
- Self-management and super-admin safety rules

## Docker Configuration

Containerized local and production-oriented setup with a multi-stage Docker
build and Docker Compose services.

- Optimized dependency, build, and runtime stages
- API, PostgreSQL, and Mailpit services
- PostgreSQL health checks and persistent volumes
- Service dependency orchestration
- Runtime log volume
- Reproducible Node.js and pnpm versions

## Nginx Configuration

Ready-to-customize reverse-proxy configuration for serving the API behind
Nginx.

- Upstream connection keepalive
- Forwarded host, IP, protocol, and request-ID headers
- Per-IP request limiting with burst support
- Dedicated liveness routing
- Connection, send, and read timeouts
- Proxy buffering configuration

## Husky & Commitlint

Automated Git workflow checks that keep commits and changed files consistent
before they reach CI.

- Husky Git hooks
- Conventional Commit validation
- Commitlint configuration
- Lint-staged integration
- Automatic ESLint and Prettier checks for staged files

## GitHub CI

Continuous integration workflow for validating every pull request and main
branch update.

- Frozen-lockfile dependency installation
- Formatting and lint checks
- TypeScript type checking
- PostgreSQL migration verification
- Unit, coverage, and end-to-end tests
- Production build verification
- Production dependency security audit
- Concurrency control with stale-run cancellation

## Environment Configuration & Validation

Centralized, typed environment configuration validated at application startup
with Joi.

- Defaults and validation for application, database, authentication, email,
  logging, CORS, rate limiting, and cookies
- Required secret and connection checks
- Production-only HTTPS and secure-cookie enforcement
- `SameSite=None` cookie safety validation
- Configurable database SSL and pool size
- Separate development, test, and production loading behavior

## Modular Monolith Architecture

Clear module ownership without the operational complexity of distributed
services.

- Independent authentication, users, and RBAC business modules
- Presentation, application, domain, infrastructure, and public API layers
- Explicit ports and adapters for cross-module communication
- Shared libraries for common HTTP, configuration, database, logging, mail, and
  observability concerns
- Transaction boundaries kept close to business operations
- Modules can evolve independently inside one deployable application

## NestJS Monorepo Workspace

NestJS workspace that keeps the API application and reusable libraries in one
repository.

- Application and library projects managed by Nest CLI
- TypeScript path aliases for public module APIs
- Shared build and testing configuration
- Strict TypeScript compiler settings
- Webpack production build
- Build-time copying of email assets

## ESLint Boundaries Configuration

Enforced architectural boundaries prevent accidental coupling and internal
imports between modules.

- Explicit app, module, shared-library, script, and test boundaries
- Public API enforcement for cross-module imports
- Module-specific dependency policies
- Test-only dependency rules
- Unknown and ignored dependency detection
- Integrated with the standard ESLint workflow

## OpenAPI + Scalar Documentation

Interactive and machine-readable API documentation generated directly from the
application contracts.

- OpenAPI JSON document
- Scalar API reference
- Bearer token, refresh cookie, and CSRF authentication schemes
- Request, response, validation, pagination, and error schemas
- Endpoint tags, descriptions, badges, parameters, and status responses
- Configurable documentation availability
- Content Security Policy nonce for the Scalar interface

## Rate Limiter

Global and endpoint-specific throttling protects the API from excessive traffic
and common authentication abuse.

- Configurable global request limit and time window
- Stricter limits for registration, login, and verification resend
- Standard `429 Too Many Requests` responses
- Additional verification-email cooldown and hourly limits
- Nginx edge-level rate limiting configuration

## Audit Log

Traceable RBAC administration history with before-and-after state for sensitive
access changes.

- Role, permission, role-assignment, and user-override events
- Actor, action, target, timestamp, and request-ID capture
- Before-and-after JSON snapshots
- Paginated audit history
- Filtering by actor, action, target, and date range
- Super-admin-only access

## Winston Logging

Structured application and HTTP logging for local development and production
operations.

- Readable colored development logs
- Structured JSON production logs
- Request method, path, status, and duration logging
- Correlated request IDs across responses, logs, and audit records
- Daily combined and error log files
- Size-based rotation, compression, and seven-day retention
- Safe server-error and email-delivery failure reporting

## Health Check

Public health endpoints for containers, load balancers, and orchestration
platforms.

- Lightweight liveness check
- PostgreSQL readiness check with timeout
- Heap-memory readiness threshold
- Health routes outside the versioned API prefix
- Docker and Nginx health-check integration

## Database Migration & Seeder

Explicit PostgreSQL schema management and repeatable initial-data setup.

- TypeORM migration create, generate, show, run, and revert commands
- Schema synchronization disabled for production safety
- Transactional migration execution
- PostgreSQL UUID extension setup
- User, verification, session, RBAC, and audit tables
- Idempotent system role and permission seeding
- Automatic default-role assignment for new users
- Bootstrap super-admin command

## Complete Fumadocs Documentation

Structured product and developer documentation designed for a searchable,
production-ready Fumadocs site.

- Getting started and local setup
- Architecture and module-boundary guide
- Environment and application configuration
- Authentication and session-management guide
- User-management and RBAC guide
- API overview and OpenAPI usage
- Database migration and seeding guide
- Deployment and operations guide
- Testing and troubleshooting guide
