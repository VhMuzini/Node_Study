import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

// Routes
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes';

const app: express.Application = express();

const server: http.Server = http.createServer(app);
const port: number = 3000;

const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// Server configuration
app.use(express.json());
app.use(cors());
app.use(expressWinston.logger(loggerOptions));

// Routes
routes.push(new UsersRoutes(app));

const runningMsg: string = `Server running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {

    res.status(200).send(runningMsg);
});

server.listen(port, () => {

    routes.forEach((route: CommonRoutesConfig) => {

        debugLog(`Routes configured for ${route.getName()}`);
    });

    console.log(runningMsg);
});