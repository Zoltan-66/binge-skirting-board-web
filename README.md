# BINGE Architectural Skirting & Profile Systems

BINGE is a B2B product website for architectural skirting boards, recessed systems, trims, and finishing profiles manufactured in Zhejiang, China.

The website is designed for distributors, importers, architects, fit-out contractors, and procurement teams in Europe, the United Kingdom, Australia, and New Zealand. Its primary conversion goals are catalogue downloads, sample requests, technical drawing requests, and qualified RFQs.

## Project status

The first responsive website implementation is running locally. The Figma Make direction has been migrated into the Next.js App Router with product filtering, responsive navigation, product galleries, technical-resource views, and an RFQ form interface.

## Product scope

- Surface-mounted aluminium skirting
- Recessed, shadow-gap, flush, and plaster-in systems
- LED skirting systems
- Solid wood skirting, including the TG clip-on system
- Stainless-steel skirting
- WPC skirting
- Edge, transition, internal-corner, and external-corner profiles
- Compatible clips, joints, end caps, and corner accessories

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Static product content first, with a CMS migration path
- GitHub Actions for validation and security checks

## Local development

Requirements:

- Node.js 24 LTS
- pnpm 11+

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## RFQ to Zoho CRM

The `/api/rfq` endpoint submits validated RFQs to Zoho CRM Leads. Configure these values locally in `.env.local` and in production as Cloudflare Pages environment variables or secrets:

```bash
NEXT_PUBLIC_SITE_URL=https://www.bingeskirtingboard.com
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_LEADS_MODULE=Leads
```

Use the Zoho accounts and API domains for the CRM account region, for example `.com`, `.eu`, or `.com.au`.

## Search indexing

Set `NEXT_PUBLIC_SITE_URL` to the public production origin before building. The value is used for canonical URLs, hreflang alternates, `robots.txt`, and `sitemap.xml`.

After deployment, submit the generated sitemap in Google Search Console:

```text
https://www.bingeskirtingboard.com/sitemap.xml
```

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Workflow

1. Create or select a GitHub Issue.
2. Branch from `main` using `feat/<issue>-description`, `fix/<issue>-description`, or `content/<issue>-description`.
3. Keep product claims traceable to approved source data.
4. Open a draft pull request early.
5. Pass CI, content review, responsive review, and accessibility checks.
6. Squash merge after approval.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/development-workflow.md](docs/development-workflow.md).

## Documentation

- [Product taxonomy](docs/product-taxonomy.md)
- [Content model](docs/content-model.md)
- [Product specification approval workbook](docs/product-specification-workbook.md)
- [Architecture](docs/architecture.md)
- [Design benchmarks](docs/design-benchmarks.md)
- [Roadmap](docs/roadmap.md)
- [Release process](docs/release-process.md)

## Brand

**BINGE**

*Architectural Skirting & Profile Systems*

Working line: **Profiles Made for Modern Interiors.**

## Repository policy

Original high-resolution source packs must not be committed to Git. Only approved, web-optimised derivatives belong in `public/images`. Do not publish unverified material grades, certifications, fire ratings, waterproof ratings, or sustainability claims.

## Licence

Proprietary. All rights reserved.
