# Publish Opera Add-on — GitHub Action

A GitHub Action to upload, verify, and publish browser extensions to Opera Add-ons.

This action wraps the [ext-opera-upload](https://github.com/fatidian1/ext-opera-upload/) library and exposes a simple workflow interface for CI/CD pipelines.


## Stack
- Language/runtime: Node.js (Action runs on `node20`)
- Type system/bundler: none (plain CommonJS)
- Package manager: npm (`package-lock.json` present)
- Entry point: `index.js` (declared in `action.yml`)


## Overview
Use this action in your workflows to:
- upload a `.zip`/`.crx` package to Opera Add-ons
- verify the uploaded package
- publish the verified package

The specific operation is selected via the `action` input: `upload`, `verify`, or `publish`.

## IMPORTANT
Before you create an issue, please check a list of the known limitations below.

I recommend manual execution of the action (because of random recaptcha checks).

## Known Limitations
- reCAPTCHA Enterprise challenges cannot be solved automatically, the action aborts to avoid hanging pipelines.
- Accounts that rely solely on Google SSO are not supported; a password-based login must be enabled for the Opera account.

## Requirements
- A repository with your Opera extension package artifact (e.g., created earlier in the workflow).
- Opera Developer account credentials (email and password) with access to the target package.
- Password authentication is enabled and 2FA is disabled.
- The package ID assigned to your extension in Opera Add-ons.


## Usage
Minimal example that publishes on tag push:

```yaml
name: Publish to Opera Add-ons

on:
  push:
    tags:
      - "*"

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Build or prepare your extension package here and output a .zip
      # - run: npm ci && npm run build

      - name: Publish to Opera Add-ons
        uses: fatidian1/opera-addon@v1.0.0
        with:
          package-id: ${{ secrets.OPERA_PACKAGE_ID }}
          package-path: path/to/your-extension.zip
          email: ${{ secrets.OPERA_EMAIL }}
          password: ${{ secrets.OPERA_PASSWORD }}
          action: publish # or upload | verify
```

Notes:
- It is recommended to pass sensitive values via GitHub Secrets.
- If you only want to upload without publishing, set `action: upload`.
- If you want to run verification separately, set `action: verify`.


## Inputs (Action parameters)
Defined in `action.yml`:

- `package-id` (required): Package ID in Opera Add-ons
- `package-path` (required): Path to the `.zip` or `.crx` file to upload
- `email` (required): Opera Developer account email
- `password` (required): Opera Developer account password
- `action` (required, default: `publish`): One of `publish`, `upload`, or `verify`

### How to get the `package-id`?
1. Go to https://addons.opera.com/developer/
2. Click on your extension
3. Copy the package ID from the URL: `https://addons.opera.com/developer/package/` `PACKAGE_ID` `/`

## Environment variables / Secrets
While the action does not consume environment variables directly, you should provide sensitive inputs via GitHub Secrets and map them in `with:` as shown above. Common secrets you may define in your repository:
- `OPERA_PACKAGE_ID`
- `OPERA_EMAIL`
- `OPERA_PASSWORD`


## Scripts (package.json)
- `npm run format` — Format source and workflow files with Prettier
- `npm run format:check` — Check formatting with Prettier
- `npm test` — Placeholder (no tests yet)


## Local development
This is a plain JavaScript Action, so there is no compilation step. To contribute or modify locally:
- Node.js 20.x recommended (to mirror the runtime specified in `action.yml`)
- Install dependencies: `npm ci`
- Modify code
- Run formatter: `npm run format`

Entry point is `index.js`. The action uses `@actions/core` and [ext-opera-upload](https://github.com/fatidian1/ext-opera-upload/) under the hood.


## Project structure
- `action.yml` — Action definition (inputs, runtime, branding)
- `index.js` — Action implementation (reads inputs, validates action, invokes [ext-opera-upload](https://github.com/fatidian1/ext-opera-upload/))
- `.github/workflows/publish.yml` — Release workflow for GitHub Releases on tag push
- `prettier.config.cjs` — Prettier configuration
- `package.json`, `package-lock.json` — npm metadata and lockfile
- `LICENSE` — Project license (see below)


## License
MIT License

Copyright (c) 2025 Tymoteusz Abramek


## Security
- Store credentials (email, password) and package ID as GitHub Secrets.
- Opera developer account needs to have password authentication enabled and 2FA disabled.


## Support / Issues
Please open issues at: https://github.com/fatidian1/opera-addon/issues


## Acknowledgements
- Built on top of [ext-opera-upload](https://github.com/fatidian1/ext-opera-upload/)
