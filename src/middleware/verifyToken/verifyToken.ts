import OktaJwtVerifier from '@okta/jwt-verifier';
import { RequestHandler } from 'express';

export const verifyToken: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization || '',
        match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        res.set('WWW-Authenticate', 'Bearer realm=resource error="unauthorized", error_description="Bearer token not found');
        return res.status(401).end();
    }

    const oktaJwtVerifier = new OktaJwtVerifier({
        issuer: process.env.OKTA_ISSUER
    });

    return oktaJwtVerifier
        .verifyAccessToken(match[1], 'api://default')
        .then(() => next())
        .catch((err: Error) => {
            res.set('WWW-Authenticate', `Bearer realm=resource, error="unauthorized", error_description="${err.message}"`);
            res.status(401).send(err.message);
        });
};
