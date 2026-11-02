# Matsapha Roses Football Club website foundation

A responsive, dependency-free multi-page website foundation created from the Matsapha Roses partnership playbook and the supplied club crest.

## Run locally

From this folder, start a small local web server:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

No packages or build step are required.

## Included

- Responsive public website with the club's visual identity
- Club history, mission, vision, values, milestones, activities, and roadmap
- Searchable/filterable team directory
- Reusable data-driven member profile page
- News and gallery foundations
- Contact and partnership enquiry interface
- Sponsorship tier presentation
- Administration dashboard foundation
- Future server/CMS folder structure

## Important production notes

Contact and partnership forms send messages to `admin@matsapharosesfc.com`. On first use, FormSubmit emails that inbox a confirmation link; click it once to activate delivery. The administration page is a visual/content foundation and is not a secure login system yet. Before production, consider a dedicated mail provider, media storage, rate limiting, and audit logging.

Only facts visible in the supplied playbook were used for initial public content. Unknown biographies, positions, statistics, and official photographs are explicitly left for club verification.

## Main structure

```text
.
├── index.html                 Home page
├── club.html                  Team story, impact, and achievements
├── members.html               Searchable profile directory
├── member.html                Data-driven individual profile page
├── news.html                  News and announcements
├── gallery.html               Photo/video gallery foundation
├── contact.html               Contact and partnership enquiries
├── admin/                     CMS dashboard foundation
├── public/
│   ├── assets/
│   │   ├── brand/             Supplied club crest
│   │   └── images/            Future approved team/gallery media
│   ├── scripts/               Shared data and page behaviour
│   └── styles/                Shared responsive design system
├── server/                    Future API/CMS backend structure
├── docs/                      Architecture and content-model notes
└── tests/                     Future automated tests
```

See [docs/architecture.md](docs/architecture.md) and [docs/content-model.md](docs/content-model.md) for the proposed production path.
