export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { email, password, full_name } = req.body;
    
    const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: { 'apikey': process.env.SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, options: { data: { full_name } } })
    });
    
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error_description || data.message || "Gagal mendaftar." });
    return res.status(200).json(data);
}  
