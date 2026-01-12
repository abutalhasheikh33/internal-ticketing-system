import { Express, Router } from "express";

export function registerRoutes(
    app: Express,
    routes: Array<{ prefix: string; router: Router }>
) {
    routes.forEach(({ prefix, router }) => {
        app.use(`/api/v1${prefix}`, router);
    });
}
