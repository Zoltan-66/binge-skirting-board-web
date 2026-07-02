# Architecture

## Goals

- Fast, accessible, responsive B2B product discovery
- Search-friendly product and category URLs
- Structured product content that can migrate to a CMS
- Secure RFQ workflow without public pricing or checkout
- Traceable technical claims and downloadable documents

## Initial architecture

- Next.js App Router for pages, metadata, image optimisation, and server endpoints
- TypeScript product schema as the first source of truth
- Static generation for public product and category pages
- Server-side RFQ submission with provider adapters
- Object storage for approved downloads and private RFQ uploads

## Planned routes

- `/products`
- `/products/aluminum-skirting`
- `/products/recessed-skirting`
- `/products/led-skirting`
- `/products/solid-wood-skirting`
- `/products/stainless-steel-skirting`
- `/products/trims-profiles`
- `/products/[slug]`
- `/applications`
- `/oem-odm`
- `/downloads`
- `/about`
- `/request-a-quote`

## Decisions pending

- CMS and asset DAM provider
- RFQ email/CRM destination
- Hosting region and analytics platform
- Translation scope and locale routing
