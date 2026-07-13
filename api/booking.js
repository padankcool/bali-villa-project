// File: api/booking.js (Berjalan di Server Vercel, bukan di Browser)

export default async function handler(req, res) {
    // 1. Pastikan hanya menerima permintaan POST (Pengiriman Data)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Tidak Diizinkan' });
    }

    // 2. Ambil Kunci Rahasia dari Brankas Vercel secara diam-diam
    const urlSupabase = process.env.SUPABASE_URL;
    const keySupabase = process.env.SUPABASE_KEY;

    try {
        // 3. Server Vercel yang akan menembak ke Supabase (Kustomer tidak akan tahu)
        const response = await fetch(`${urlSupabase}/rest/v1/reservasi_villa`, {
            method: 'POST',
            headers: { 
                'apikey': keySupabase, 
                'Authorization': `Bearer ${keySupabase}`, 
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(req.body) // Data dari form kustomer
        });

        // 4. Cek apakah database Supabase menerima datanya
        if (response.ok || response.status === 201) {
            return res.status(200).json({ message: 'Booking Berhasil Disimpan!' });
        } else {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Terjadi Kesalahan Server Internal' });
    }
}
