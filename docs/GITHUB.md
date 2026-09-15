# GitHub transfer

No Git remote, GitHub connector or authenticated `gh` client was available in this session. No repository was created and no source was pushed.

The ZIP contains the complete current source plus a Git bundle preserving committed history. It excludes credentials, dependency caches and build output. After extracting:

```sh
git clone ad4growth.bundle ad4growth
cd ad4growth
npm ci --include=dev
npm run build
```

Create an **empty private** repository named `ad4growth` in your GitHub account (no initial README/license/gitignore). Copy its actual SSH URL, then:

```sh
git remote add origin git@github.com:YOUR_ACCOUNT/ad4growth.git
git push -u origin HEAD
```

Replace YOUR_ACCOUNT with the actual owner; this is not a pre-existing repository address. If SSH is not configured, use the HTTPS clone URL and GitHub credential manager instead. For subsequent commits configure your own `git config user.name` and `git config user.email`. The prepared production commit is explicitly authored by the Codex automation identity, not impersonating the site owner.
