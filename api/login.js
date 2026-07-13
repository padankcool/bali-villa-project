export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { email, password } = req.body;

    const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { 'apikey': process.env.SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error_description || "Password salah." });
    return res.status(200).json(data);
}
