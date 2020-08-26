import serverless from 'serverless-http';
import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => console.info(`started server on ${port}`));

module.exports.handler = serverless(app);
