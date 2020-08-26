import OktaJwtVerifier from '@okta/jwt-verifier';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './verifyToken';

jest.mock('@okta/jwt-verifier');

describe('verifyToken', () => {
    it('should return 401 when bearer token is not present in the header', async () => {
        const mockStatus = jest.fn(() => ({ end: jest.fn() })),
            mockSet = jest.fn();
        verifyToken(
            (<unknown>{ headers: { authorization: '' } }) as Request,
            (<unknown>{ status: mockStatus, set: mockSet }) as Response,
            undefined
        );
        expect(mockStatus).toHaveBeenCalledWith(401);
    });

    it('should call next function on success', async () => {
        OktaJwtVerifier.mockImplementation(() => ({
            verifyAccessToken: () => Promise.resolve()
        }));
        const mockNext: NextFunction = jest.fn();
        await verifyToken((<unknown>{ headers: { authorization: 'Bearer Token' }, body: {} }) as Request, undefined, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });

    it('should return expected error message on failure', async () => {
        OktaJwtVerifier.mockImplementation(() => ({
            verifyAccessToken: () => Promise.reject({ message: 'Something went wrong' })
        }));

        const mockSend = jest.fn(),
            mockSet = jest.fn(),
            mockStatus = jest.fn(() => ({ send: mockSend }));

        await verifyToken(
            (<unknown>{ headers: { authorization: 'Bearer Token' }, body: {} }) as Request,
            (<unknown>{ status: mockStatus, set: mockSet }) as Response,
            undefined
        );
        expect(mockStatus).toHaveBeenCalledWith(401);
        expect(mockSet).toHaveBeenCalledWith(
            'WWW-Authenticate',
            'Bearer realm=resource, error="unauthorized", error_description="Something went wrong"'
        );
        expect(mockSend).toHaveBeenCalledWith('Something went wrong');
    });
});
