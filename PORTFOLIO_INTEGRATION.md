# Portfolio link (external demo)

The board runs as its **own Next.js app**, not inside the portfolio site:

- Demo app: `PortProjects/demos/project-management-board/web`
- Portfolio: `PortProjects/my-website`

## Local development

1. Portfolio (port 3000): `cd my-website && npm run dev`
2. Board demo (port 3001): `cd demos/project-management-board/web && npm install && npm run dev`
3. On the portfolio **Career → Projects** page, **Try live demo** opens `http://localhost:3001`.

## Production

Deploy the demo app to its own host (separate Vercel project, subdomain, etc.), then set in the portfolio:

```env
NEXT_PUBLIC_PROJECT_MANAGEMENT_BOARD_DEMO_URL=https://your-board-demo.example.com
```

The portfolio only links out; it does not bundle board routes or assets.
