import { Express, Request, Response } from "express";

// import handlers
// import callback handler
// import schema
// import schema validator

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
}

export default routes;