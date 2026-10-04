import crypto from 'crypto';

function signToken() {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return null;
    
    // expiry 7 days
    const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url');
    const hmac = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
    
    return `${payload}.${hmac}`;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || !process.env.ADMIN_SECRET) {
        return res.status(500).json({ error: 'Server misconfigured' });
    }

    if (!password) {
        return res.status(401).json({ error: 'Password required' });
    }

    try {
        const inputBuffer = Buffer.from(password, 'utf8');
        const adminBuffer = Buffer.from(adminPassword, 'utf8');
        
        if (inputBuffer.length === adminBuffer.length && crypto.timingSafeEqual(inputBuffer, adminBuffer)) {
            const token = signToken();
            return res.status(200).json({ token });
        }
    } catch (e) {
        // Fallback or catch block
    }

    // Delay 1s for incorrect password
    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.status(401).json({ error: 'Invalid password' });
}
