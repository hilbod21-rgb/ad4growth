# AD4GROWTH — original source

Existing website preserved, prepared for independent Node hosting on Contabo. No reconstruction. Design, themes, animations, four languages, assets, contact UI and editorial renderer are retained.

```sh
npm ci --include=dev
cp .env.example .env.local
npm run build
npm start
```

Tested runtime: Node 24.19.0, npm 11.6.0. Production: Next.js 16.2.6, React 19.2.6. Open http://127.0.0.1:3000/de. `npm run dev:node` runs the independent developer server; existing `npm run dev` / `build:sites` / `start:sites` retain the optional Vinext/Sites workflow. Production commands require no Sites service or account.

- [Contabo deployment and remaining launch requirements](docs/CONTABO.md)
- [Blog publishing, pricing and analytics](docs/EDITORIAL-AND-MEASUREMENT.md)
- [Verification record](docs/VERIFICATION.md)
- [GitHub transfer](docs/GITHUB.md)

`lib/config.ts` owns pricing. Launch: Google €490 setup + €490 monthly; ChatGPT €690 + €590, all net B2B. Media budget from €500/month separate. Launch conditions cover the first three projects, managed manually; regular fees are centrally editable.

`/` redirects to `/de`; `/de`, `/en`, `/uk`, `/ru` preserve localized metadata and pages. Blog implementation is preserved and enables per language once a real article is published. No CMS/admin is implemented or required. The unused starter database/auth helpers are preserved but have no imports from live routes and are not production dependencies.

**Not yet commercially launch-ready:** legal identity/privacy details are incomplete, real email credentials and inbox delivery unverified, VPS/GitHub access not supplied. No DNS or remote deployment was performed. Do not mistake a passing build for completion of these requirements.
