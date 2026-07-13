export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    try {
        const { tipe_villa } = req.body;
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_KEY;

        const response = await fetch(`${url}/rest/v1/reservasi_villa?select=tanggal_checkin,tanggal_checkout&status=not.eq.Cancelled&tipe_villa=eq.${encodeURIComponent(tipe_villa)}`, {
            method: 'GET',
            headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
        });
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Gagal terhubung ke Database: " + error.message });
    }
}
