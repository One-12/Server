import './LoadEnv'; // Must be the first import
import app from '@server';
import { logger } from '@shared';
import { MongooseConnect } from './connection';

// Start the server
const port = Number(process.env.PORT || 3000);

MongooseConnect();

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
