inventory_app

# Git Workflow: Syncing Forked Repo with Upstream

This guide explains how to keep your **forked repository** and **local `dev` branch** in sync with the company's main repository (`upstream`).

---

## 1. Initial Setup (One-time)

### Add the company's repository as upstream

This allows you to fetch updates from the main repository:

```bash
git remote add upstream https://github.com/sahils50/transport.git
```

### Verify remotes

Check if `origin` and `upstream` are set correctly:

```bash
git remote -v
```

Expected output:

```
origin    https://github.com/your-username/inventory_app.git (fetch)
origin    https://github.com/your-username/inventory_app.git (push)
upstream  https://github.com/sahils50/inventory_app.git (fetch)
upstream  https://github.com/sahils50/inventory_app.git (push)
```

> **Note:** These steps only need to be done once per repository.

---

## 2. Regular Sync Workflow

Follow these steps whenever you want to update your fork and local `dev` branch:

### Step 1: Fetch updates from upstream

```bash
git fetch upstream
```

### Step 2: Switch to your local `dev` branch

```bash
git checkout dev
```

### Step 3: Merge upstream changes

```bash
git merge upstream/dev
```

> Git will automatically merge if there are no conflicts.
> If there are conflicts, resolve them, then commit the changes.

### Step 4: Push changes to your fork

```bash
git push origin dev
```

This keeps your forked repository updated with the latest changes from upstream.

## All Commands to fetch and sync repository

```bash
git fetch upstream
git checkout dev
git merge upstream/dev
git push origin dev
```

---

## 3. Recommended Workflow Tips

- Always **work on feature branches** instead of `dev`. Example:

```bash
git checkout -b my-new-feature-branch
```

- Sync your local `dev` with upstream **before starting new work** to avoid conflicts.
- Regularly push your changes to your fork to keep it updated.
- If conflicts occur during merge, carefully resolve them before pushing.

---
