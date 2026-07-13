export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { tipe_villa } = req.body;

    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/reservasi_villa?select=tanggal_checkin,tanggal_checkout&status=not.eq.Cancelled&tipe_villa=eq.${encodeURIComponent(tipe_villa)}`, {
        method: 'GET',
        headers: { 'apikey': process.env.SUPABASE_KEY, 'Authorization': `Bearer ${process.env.SUPABASE_KEY}` }
    });
    
    const data = await response.json();
    return res.status(200).json(data);
}
