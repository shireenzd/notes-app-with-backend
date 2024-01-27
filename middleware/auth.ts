// import jwt from 'jsonwebtoken'
// export const auth = (req: any, res: any, next: any) => {

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

import jwt from 'jsonwebtoken';

export const auth = (req: any, res: any, next: any) => {
    // get Authorization header from request
    const authHeader = req.get('Authorization');

    // extract token from authHeader
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ error: 'Missing token in auth header!' });
    }

    try {
        const decoded = jwt.verify(token, 'some-secret-no-one-knows-except-this-backend');
        // pass the decoded object to the next handler
        req.decoded = decoded;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ error: 'Failed to verify JWT!' });
    }
};

