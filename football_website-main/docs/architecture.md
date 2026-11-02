# Architecture notes

## Current foundation

The current build is intentionally dependency-free. Shared club information is held in `public/scripts/data.js`; reusable navigation, footer, accessibility helpers, and reveal behaviour are held in `public/scripts/common.js`. Page-specific scripts render roster search, profile details, the contact form preview, and dashboard counts.

This structure makes the concept easy to review immediately while keeping a clean migration path to a database-backed application.

## Recommended production layers

### Public website

- Server-rendered or statically generated pages for performance and discoverability
- Responsive image processing for player and gallery media
- Accessible navigation, forms, filters, and media captions
- Searchable team, news, event, and achievement content

### Content API

- REST or GraphQL endpoints under `/api`
- Server-side validation for all editable records
- Draft, scheduled, and published content states
- Image/file metadata stored separately from binary media
- Contact enquiries delivered through an approved email provider and stored with retention rules

### Administration

- Authenticated login only; never expose the preview dashboard as a production admin area
- Roles such as administrator, editor, and media contributor
- Strong password policy plus multi-factor authentication where available
- Server-side authorization on every write action
- Audit trail for profile, article, result, and gallery changes
- File type, file size, and malware checks for uploads

### Data and operations

- Relational database for profiles, teams, seasons, competitions, appearances, and content
- Object storage for photographs and video
- Daily backups with restore testing
- HTTPS, secure cookies, CSRF protection, rate limiting, and security headers
- Error monitoring, uptime monitoring, and privacy-aware analytics

## Folder responsibilities

- `public/assets/brand`: approved brand assets
- `public/assets/images/members`: official player/staff portraits
- `public/assets/images/gallery`: match, training, activity, and event media
- `public/styles`: shared design system
- `public/scripts`: presentation-layer data and behaviour for the current prototype
- `admin`: administration interface foundation
- `server/config`: environment and service configuration
- `server/controllers`: request orchestration
- `server/middleware`: authentication, authorization, validation, logging, and error handling
- `server/models`: persistent domain models
- `server/routes`: API route definitions
- `server/services`: email, storage, search, and other integrations
- `server/uploads`: local-only development uploads; production media should use object storage
- `tests`: future unit, integration, accessibility, and browser tests

## Suggested delivery sequence

1. Verify club copy, management roles, squad lists, and contact/social links.
2. Collect approved portraits, match images, results, and biographies.
3. Select the production stack, database, hosting, email, and media storage.
4. Implement authentication, role-based CMS workflows, and the content API.
5. Migrate the starter data into the database.
6. Add automated accessibility, security, and browser testing.
7. Complete stakeholder review and production launch.
