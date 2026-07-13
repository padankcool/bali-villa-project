export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    try {
        const { email, password, full_name } = req.body;
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_KEY;

        const response = await fetch(`${url}/auth/v1/signup`, {
            method: 'POST',
            headers: { 'apikey': key, 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, options: { data: { full_name } } })
        });
        
        const data = await response.json();
        if (!response.ok) return res.status(response.status).json({ error: data.error_description || data.message || "Gagal mendaftar." });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Gagal terhubung ke Database: " + error.message });
    }
}
