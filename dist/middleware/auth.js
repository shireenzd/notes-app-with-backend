"use strict";
// import jwt from 'jsonwebtoken'
// export const auth = (req: any, res: any, next: any) => {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
//     // get Authorization header from request
//     const authHeader = req.get('Authorization')
//     // extract token from authHeader
//     const token = authHeader?.split(' ')[1]
//     if (!token) {
//         return res.status(400).json({ error: 'Missing token in auth header!' })
//     }
//     try {
//         const decoded = jwt.verify(token, 'some-secret-no-one-knows-except-this-backend');
//         // pass the decoded object to the next handler
//         req.decoded = decoded
//     } catch (error) {
//         res.json({error: 'Failed to verify JWT!'})
//     }
//     next();
// }
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    // get Authorization header from request
    const authHeader = req.get('Authorization');
    // extract token from authHeader
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({ error: 'Missing token in auth header!' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'some-secret-no-one-knows-except-this-backend');
        // pass the decoded object to the next handler
        req.decoded = decoded;
        next();
    }
    catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ error: 'Failed to verify JWT!' });
    }
};
exports.auth = auth;
