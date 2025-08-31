[简体中文](./README_HANS.md)

<p align="center">
  <img width="450" src="https://user-images.githubusercontent.com/31800695/138593031-536f9b8c-714c-4c4f-8725-63ea105fcca0.png">
  <p align="center">💻📌 Update a pinned gist to show your most used programming languages</p>
  <p align="right"><i>
  Fork of <a href="https://github.com/Aveek-Saha/lang-stats-box">Aveek-Saha/lang-stats-box</a> with enhancements.
  </i></p>
</p>

# github-lang-box
[![npm](https://img.shields.io/npm/v/github-activity-box.svg?style=flat-square&color=444)](https://www.npmjs.com/package/github-lang-box)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/maxchang3/github-lang-box/ci.yml?style=flat-square&label=CI)](https://github.com/maxchang3/github-lang-box/actions)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat-square&logo=biome)](https://biomejs.dev)
[![License](https://img.shields.io/github/license/maxchang3/github-lang-box?style=flat-square)](LICENSE)

## ✨ Enhancements

- 🔑 Uses `/user/repos` endpoint to fetch all repositories (including private ones)
- 🎨 Supports language exclusions, and repository filtering
- 📦 Published to npm with binary support for easy use via `npx` or `pnpx`
- ✅ Updated dependencies and completely rewritten in TypeScript

> [!important]
> Since this package uses the `/user/repos` endpoint, Fine-grained access tokens **must** have the `metadata:read` permission.

## Usage

### Use as a CLI

```bash
# Run directly with npx/pnpx
npx github-lang-box [options]

# Or install globally
npm install -g github-lang-box
github-lang-box [options]
```

**Options:**
- `--dry` - Preview the output without updating the gist

**Required Environment Variables:**
| Variable     | Description                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| GH_TOKEN     | GitHub access token with `gist` and `metadata:read` scopes                                                |
| GIST_ID      | The ID from your gist URL: <br> `https://gist.github.com/username/`**`8335e85451541072dd25fda601129f7d`** |
| GH_USERNAME  | Your GitHub username                                                                                      |
| EXCLUDE      | (Optional) Comma-separated list of languages to exclude <br> Example: `Jupyter Notebook,CSS,TeX,PHP`      |
| EXCLUDE_REPO | (Optional) Comma-separated list of repositories to exclude <br> Example: `username/repo1,username/repo2`  |

### GitHub Action Setup

#### Prerequisites

1. Create a new public GitHub Gist at https://gist.github.com/
2. Generate an access token with `gist` and `metadata:read` scopes at https://github.com/settings/tokens?type=beta

#### Workflow Configuration

Create `.github/workflows/lang-box.yml` in your repository

```yaml
name: Update gist with most used programming languages
on:
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * *"
jobs:
  language-box:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        name: Install pnpm
        id: pnpm-install
        with:
          version: 10
          run_install: true

      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Update
        run: pnpm dlx github-lang-box@2
        env:
          GH_USERNAME: your-username
          GIST_ID: your-gist-id
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
          # You can also use hardcoded values instead of variables
          # EXCLUDE: Jupyter Notebook,CSS,TeX,PHP
          # EXCLUDE_REPO: username/repo1,username/repo2
          EXCLUDE: ${{ vars.EXCLUDE }}
          EXCLUDE_REPO: ${{ vars.EXCLUDE_REPO }}
```

#### Add Repository Secrets and Variables

1. Go to your repository **Settings** > **Secrets and variables** > **Actions**.
2. Add a repository secret:
   - `GH_TOKEN`: Your GitHub access token (requires `gist` and `metadata:read` scopes).
3. (Optional) Add repository variables as needed (`EXCLUDE`, `EXCLUDE_REPO`).

  
## Credits

- Inspired by [@matchai's bird-box](https://github.com/matchai/bird-box)
- Forked from [@Aveek-Saha's lang-stats-box](https://github.com/Aveek-Saha/lang-stats-box)
