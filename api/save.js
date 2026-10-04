import crypto from 'crypto';

function verifyToken(token) {
    if (!token || typeof token !== 'string') return false;
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    
    const [payload, sig] = parts;
    const secret = process.env.ADMIN_SECRET;
    if (!secret) return false;

    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
    
    try {
        const inputBuffer = Buffer.from(sig, 'utf8');
        const expectedBuffer = Buffer.from(expectedSig, 'utf8');
        if (inputBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(inputBuffer, expectedBuffer)) {
            return false;
        }
        
        const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (!decoded.exp || Date.now() > decoded.exp) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

function validateChanges(changes, SHARED_KEYS, baseContent) {
    if (!changes || typeof changes !== 'object' || Array.isArray(changes)) throw new Error('Invalid changes format');
    
    const enChanges = changes.en || {};
    const ukChanges = changes.uk || {};
    
    if (typeof enChanges !== 'object' || Array.isArray(enChanges)) throw new Error('changes.en must be an object');
    if (typeof ukChanges !== 'object' || Array.isArray(ukChanges)) throw new Error('changes.uk must be an object');
    
    // Validate EN
    for (const [key, val] of Object.entries(enChanges)) {
        if (!(key in baseContent.en)) throw new Error(`Unknown key in en: ${key}`);
        if (typeof val !== 'string') throw new Error(`Value for ${key} in en must be a string`);
        if (val.trim() === '') throw new Error(`English text cannot be empty: ${key}`);
    }
    
    // Validate UK
    for (const [key, val] of Object.entries(ukChanges)) {
        if (!(key in baseContent.en)) throw new Error(`Unknown key in uk: ${key}`);
        if (typeof val !== 'string') throw new Error(`Value for ${key} in uk must be a string`);
        if (SHARED_KEYS.includes(key)) throw new Error(`Cannot set Ukrainian value for shared key: ${key}`);
    }
    
    return { enChanges, ukChanges };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token, changes } = req.body;

    if (!verifyToken(token)) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = process.env.GITHUB_OWNER;
    const REPO_NAME = process.env.GITHUB_REPO;
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
        console.error("GitHub environment variables are missing.");
        return res.status(500).json({ error: 'Couldn\'t save, please try again in a minute' });
    }

    const filePath = 'src/content/site.json';
    const sharedKeysPath = 'src/content/sharedKeys.js';
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${GITHUB_BRANCH}`;

    async function fetchGitHub(u) {
        const response = await fetch(u, {
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Admin-Edit-Mode'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch from GitHub');
        return response.json();
    }
    
    let sharedKeys = [];
    try {
        const skUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${sharedKeysPath}?ref=${GITHUB_BRANCH}`;
        const skData = await fetchGitHub(skUrl);
        const skContent = Buffer.from(skData.content, 'base64').toString('utf8');
        // Extract array
        const match = skContent.match(/export const SHARED_KEYS = (\[[\s\S]*?\]);/);
        if (match) {
            sharedKeys = JSON.parse(match[1]);
        }
    } catch(e) {
        console.error("Failed to fetch sharedKeys:", e.message);
    }

    async function attemptSave(retry = 0) {
        try {
            const fileData = await fetchGitHub(url);
            const sha = fileData.sha;
            const baseContentStr = Buffer.from(fileData.content, 'base64').toString('utf8');
            let baseContent;
            try {
                baseContent = JSON.parse(baseContentStr);
            } catch (e) {
                console.error("Failed to parse site.json from GitHub");
                throw new Error("Couldn't save, please try again in a minute");
            }
            
            let enChanges, ukChanges;
            try {
                const validated = validateChanges(changes, sharedKeys, baseContent);
                enChanges = validated.enChanges;
                ukChanges = validated.ukChanges;
            } catch (e) {
                console.error("Validation error:", e.message);
                throw new Error(e.message);
            }
            
            const changedKeysSet = new Set([...Object.keys(enChanges), ...Object.keys(ukChanges)]);
            if (changedKeysSet.size === 0) {
                return res.status(200).json({ success: true });
            }
            
            // Apply changes
            for (const [k, v] of Object.entries(enChanges)) {
                baseContent.en[k] = v;
            }
            for (const [k, v] of Object.entries(ukChanges)) {
                if (v.trim() === "") {
                    delete baseContent.uk[k];
                } else {
                    baseContent.uk[k] = v;
                }
            }
            
            const newJsonStr = JSON.stringify(baseContent, null, 2) + '\n';
            if (newJsonStr.length > 500000) {
                throw new Error("Payload too large");
            }

            const changedKeysArray = Array.from(changedKeysSet);
            let messageKeys = changedKeysArray.slice(0, 5).join(', ');
            if (changedKeysArray.length > 5) messageKeys += ` and ${changedKeysArray.length - 5} more`;

            const updateRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Admin-Edit-Mode'
                },
                body: JSON.stringify({
                    message: `Content update from admin: ${messageKeys}`,
                    content: Buffer.from(newJsonStr).toString('base64'),
                    sha: sha,
                    branch: GITHUB_BRANCH
                })
            });

            if (updateRes.status === 409 && retry === 0) {
                return attemptSave(1);
            }

            if (!updateRes.ok) {
                const errBody = await updateRes.text();
                console.error('Failed to update file:', errBody);
                throw new Error("Couldn't save, please try again in a minute");
            }

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error in save:", error);
            if (!res.headersSent) {
                const msg = error.message.includes("Couldn't save") || error.message.includes("Unknown key") || error.message.includes("empty") || error.message.includes("shared key") ? error.message : "Couldn't save, please try again in a minute";
                return res.status(400).json({ error: msg });
            }
        }
    }

    await attemptSave();
}
