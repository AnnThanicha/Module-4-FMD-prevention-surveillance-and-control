# FMD SAT1: introduction and exercise

A small static website for veterinary students. No build step and no dependencies.

- `index.html`: Introduction (five tabs)
- `exercise.html`: Exercise (role, Task 1, Task 2, Task 3)
- `assets/`: stylesheet, script and images

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `fmd-sat1`).
2. Upload everything in this folder to the repository root (drag and drop in the browser works), or push with git:
   ```
   git init
   git add .
   git commit -m "FMD SAT1 teaching site"
   git branch -M main
   git remote add origin https://github.com/<your-user>/fmd-sat1.git
   git push -u origin main
   ```
3. In the repository, open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute the site is at `https://<your-user>.github.io/fmd-sat1/`.

## Before you make the repository public

The figures come from FAO, the Department of Livestock Development, the Swine Health Information Center and WRLFMD/Pirbright (via MSD Veterinary Manual). Check that you may republish them, or replace them. Images are in `assets/images/`.

## Editing

Edit the HTML files directly. Each tab is a `<section role="tabpanel">`. Links such as `exercise.html#b2` open a specific tab.
