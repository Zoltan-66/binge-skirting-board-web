# Development Workflow

## Issue lifecycle

`triage` → `ready` → `in progress` → `review` → `done`

Every Issue includes an outcome, acceptance criteria, dependencies, content/data requirements, and validation notes.

## Pull request lifecycle

1. Branch from current `main`.
2. Open a draft PR after the first meaningful commit.
3. Link the Issue and keep the PR focused.
4. Pass lint, type checking, tests, build, and security checks.
5. Add before/after screenshots for UI changes.
6. Review public claims and accessibility.
7. Squash merge and delete the branch.

## Environments

- Local: contributor machine
- Preview: one deployment per pull request
- Production: protected `main` release

Production deployment should require an approved PR and successful CI.
