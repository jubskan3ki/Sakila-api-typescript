import { DefaultErrorHandler } from './middlewares/error-handler.middleware';
import { RegisterRoutes } from '@routes/routes';
import { configDotenv } from 'dotenv';
import Express, { json } from 'express';
import { join } from 'path';

configDotenv();
const PORT = process.env.PORT || 5050;

const app = Express();
app.use(json());

RegisterRoutes(app);

// Server des fichiers statiques
app.use('/public', Express.static(join('assets')));

// Charger les middlewares
app.use(DefaultErrorHandler);

// Lancer le serveur
app.listen(PORT, () => {
	console.info('API Listening on port ' + PORT);
});
