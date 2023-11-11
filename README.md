## Getting Started

[![ci](https://github.com/HackatonBerlin/berlin-latino-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/HackatonBerlin/berlin-latino-hub/actions/workflows/ci.yml)

> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project structure

- Project bootstrapped with create-next-app with
  - Typescript
  - Eslint config
  - App router (Not pages!)
  - Tailwind CSS
  - SQL with Postgres hosted in Vercel
- Setup automatic deployment with [Vercel](https://berlin-latino-hub.vercel.app/)
- Add Prettier support for auto sorting of attributes
- Github workflow as CI
- Dependabot for checking outdated dependencies

## Getting Started

- Clone repository: `git clone https://github.com/HackatonBerlin/berlin-latino-hub.git`
- Make sure node version is `18`, or you can use [nvm](https://github.com/nvm-sh/nvm) to set it up automatically
- Install dependencies with `npm`: `npm install`
- Open vercel Storage and select the db: `https://vercel.com/hackaton-berlin/berlin-latino-hub/stores`
  - Create a file called `.env.local` with the content of the tab called `.env.local`
- Start the project: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Helpful scripts

Located at [`./scripts`](./scripts/):

- `seed-db`: Populate table with initial information.
- `clean-up-db`: Wipe content from table.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
