# Deployment & Publishing Documentation

This document outlines the Continuous Integration (CI), Continuous Deployment (CD), and Package Publishing workflows for the GFED Medusa Storefront project. It is designed to help developers understand how code moves from development to production and how to manage the infrastructure.

## Overview

The project uses **GitHub Actions** for automation and **Render** for hosting the application services.

- **CI (Continuous Integration):** Runs on Pull Requests to ensure code quality (Build, Lint, Type Check).
- **CD (Continuous Deployment):** Triggered on pushes to the `main` branch. It builds Docker images, pushes them to GitHub Container Registry (GHCR), and promotes them through environments on Render (`smoke` -> `qa` -> `production`).
- **MFE Versioning:** Uses [Changesets](https://github.com/changesets/changesets) to manage semantic versioning of micro frontends. Developers add changesets to PRs, and a release PR is created at the end of each sprint to bump versions.
- **Package Publishing:** Uses [Changesets](https://github.com/changesets/changesets) to version and publish packages to npm automatically.

## Infrastructure (Render)

The infrastructure is defined as code in `render.yaml` (Render Blueprint).

### Environments

The setup includes three distinct environments defined in the Render Blueprint:

1.  **Smoke (`smoke`)**: The first stage of deployment.
2.  **QA (`qa`)**: The quality assurance environment for broader testing.
3.  **Production (`production`)**: The live environment.

### Services

Each environment consists of three web services corresponding to the micro frontends:
- `sf-home`
- `sf-account`
- `sf-products`
- ...and others

**Note:** The `render.yaml` initializes these services with a placeholder image `traefik/whoami`. The actual application images are deployed via the GitHub Actions pipeline.

### Environment Variables

Environment variables are managed via **Environment Groups** in the Render Dashboard. You must create these groups manually before applying the Blueprint:
- `sf-prod-env-group`
- `sf-smoke-env-group`
- `sf-qa-env-group`
- ...and others

## CI/CD Workflows

All workflows are located in `.github/workflows/`.

### 1. Verification (CI)
*   **Files:** `ci-home.yaml`, `ci-account.yaml`, `ci-products.yaml` (reusing `_ci-run.yaml`).
*   **Trigger:** Pull Requests affecting specific apps or shared packages.
*   **Steps:**
    1.  Checkout code.
    2.  Setup Node.js & pnpm.
    3.  Load environment variables from `.env.template`.
    4.  Install dependencies.
    5.  Run `build`, `lint`, and `check-types` scripts.

### 2. Deployment (CD)
*   **File:** `deploy.yaml`.
*   **Trigger:** Push to `main`.
*   **Process:**
    1.  **Detect Changes:** Identifies which apps (`home`, `account`, `products`) have changed using `dorny/paths-filter`.
    2.  **Build Docker Images:** Builds the modified apps and pushes images to **GitHub Container Registry (GHCR)** tagged with the commit SHA.
    3.  **Deployment Chain:**
        *   **Smoke:** Deploys the new image to the `smoke` environment.
        *   **QA:** If `smoke` succeeds, a reviewer's approval is required to deploy QA
        *   **Production:** If `qa` succeeds, a reviewer's approval is required to deploy Prod.
*   **Mechanism:** The workflow uses the Render API to update the service's image and trigger a deployment, then polls for success.

### 3. Package Publishing
*   **File:** `publish-packages.yaml`.
*   **Trigger:** When a Pull Request is closed/merged into `main`.
*   **Process:**
    1.  Checks if the PR is a "Version Packages" PR created by Changesets.
    2.  Authenticates with npm using `NPM_TOKEN`.
    3.  Runs `pnpm run ci:publish` to publish updated packages to the registry.

### 4. Rollback Deployments
*   **Files:** `rollback.yaml`, `scripts/map-service-name.sh`.
*   **Trigger:** Manual workflow dispatch (on-demand via GitHub Actions UI).
*   **Purpose:** Quickly rollback a deployed microfrontend to a previous version (MFE-only changes). Use `git revert` for commits affecting packages.
*   **Safety Features:** Confirmation required, SHA validation, concurrency control, age warnings.

**See [How to Rollback a Deployment](#how-to-rollback-a-deployment) section below for complete guide.**

## Secrets Configuration

To enable these workflows, the following **GH Secrets** must be configured in the repository settings:

- `RENDER_API_KEY` - API Key from Render User Settings.
    - This must be configured to each environment
- `NPM_TOKEN` - Automation token for publishing to npm.
    - Granular access token
- `GITHUB_TOKEN` - Automatically provided by GitHub.

## Workflows Validation

Before creating a PR for added/modified workflow files, validate them locally to catch errors early.

If you modify `.github/workflows/*.yaml` files:

```bash
pnpm lint:workflows
```

**What it validates:**
- YAML syntax correctness (via yamllint)
- GitHub Actions logic (job dependencies, outputs, expressions) (via actionlint)

**Why it matters:** Catches workflow bugs before they reach CI (like missing job dependencies, invalid expressions, etc.)

**Prerequisites:**
```bash
# Install linters (macOS)
brew install yamllint actionlint
```

---

## Step-by-Step Guide

### How to Deploy an Application

Deployment is fully automated. You do not need to manually trigger builds or deploys.

1.  **Make Changes:** Implement your features or fixes.
2.  **Create a PR:** Push your branch and open a Pull Request.
    *   *The CI checks will run automatically to verify your code.*
3.  **Merge to Main:** Once the PR is approved and checks pass, merge it into `main`.

### How to Publish a Package

We use **Changesets** to manage versioning and publishing.

1.  **Make Changes:** Modify the package code in `packages/`.
2.  **Add a Changeset:** Run the following command in your terminal:
    ```bash
    npx changeset
    ```
    *   Select the packages that have changed.
    *   Choose the semantic version bump (major, minor, patch).
    *   Write a summary of the changes.
3.  **Commit:** Commit the generated changeset file along with your code changes.
4.  **Merge PR:** Create and merge your Pull Request as usual.
5.  **Release PR (Automated):**
    *   A "Version Packages" PR will be automatically created (or updated) by the `Changesets` bot.
    *   This PR consumes the changeset files and updates `package.json` versions and `CHANGELOG.md`.
6.  **Publish:**
    *   When you are ready to publish, checkout the branch and run `pnpm install` locally, push the changes to this branch 
    *   Review and **merge** the "Version Packages" PR.
    *   The `Publish Packages` workflow will trigger and publish the new versions to npm.

### How to Rollback a Deployment

If a deployment introduces a critical bug, you can quickly rollback to a previous version.

#### Quick Rollback (Automatic - Recommended)

1.  **Go to GitHub Actions:**
    *   Navigate to **Actions** → **Rollback Deployment**
    *   Click **Run workflow**

2.  **Configure rollback:**
    *   **App**: Select the microfrontend (home, account, products, checkout)
    *   **Environment**: Select the environment (smoke, qa, production)
    *   **Target Version**: Leave **empty** for automatic rollback to previous version
    *   **Confirm**: Type `rollback`

3.  **Execute:**
    *   Click **Run workflow**
    *   The workflow will automatically find and deploy the previous version

#### Rollback to Specific Version

If you need to rollback to a specific version (not just the previous one):

1.  **Find the target version:**
    *   **Option A - Git Tags: https://github.com/goodfrontend/gfed-medusa-storefront/tags**
        1. Look for the microfrontend you want to rollback.
        2. Take note of the version and use it for the rollback deployment.

    *   **Option B - Docker Images:**
        1. Example for home storefront: `https://github.com/goodfrontend/gfed-medusa-storefront/pkgs/container/gfed-medusa-storefront%2Fsf-home/versions`
        2. Take note of the exact version of the docker image.
        3. Use this version for rollback deployment.

2.  **Trigger rollback:**
    *   Go to **Actions** → **Rollback Deployment**
    *   Enter the **Target Version** you found
    *   Complete other fields and confirm
    *   Run the workflow

### How to Setup a New Environment (Render)

If you are setting this up for the first time:

1.  **Create Env Groups:** In Render Dashboard, create Environment Groups (`sf-prod-env-group`, `sf-smoke-env-group`, `sf-qa-env-group`) and add necessary env vars.
2.  **Connect Repo:** Connect your GitHub repository to Render.
3.  **Create Blueprint:** Create a new Blueprint instance in Render and select the `render.yaml` file from the repository.
4.  **Initial Sync:** Render will create the services defined in `render.yaml` using the placeholder image.
5.  **First Deploy:** Push a commit to `main` to trigger the GitHub Action, which will build the actual app images and deploy them to your new Render services.
