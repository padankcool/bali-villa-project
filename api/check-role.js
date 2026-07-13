// File: api/check-role.js

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    try {
        const { email } = req.body; // Token user baru tidak perlu kita gunakan lagi di sini
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_KEY;

        // PERUBAHAN UTAMA: Menggunakan 'Bearer ${key}' agar server Vercel bertindak sebagai sistem internal berizin penuh
        const response = await fetch(`${url}/rest/v1/user_roles?email=eq.${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 
                'apikey': key, 
                'Authorization': `Bearer ${key}` 
            }
        });
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Gagal terhubung ke Database: " + error.message });
    }
}
