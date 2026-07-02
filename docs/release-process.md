# Release Process

## Preview

Every pull request should produce a preview deployment after CI passes.

## Production

1. Confirm required Issues are complete.
2. Confirm all checks pass on `main`.
3. Review product claims, forms, downloads, privacy text, and analytics consent.
4. Create a semantic version tag and GitHub Release.
5. Deploy from the protected release commit.
6. Run smoke tests for navigation, product discovery, RFQ, downloads, metadata, and mobile layout.

## Rollback

Retain the previous production deployment and redeploy it if a launch-blocking defect or content risk is found.
