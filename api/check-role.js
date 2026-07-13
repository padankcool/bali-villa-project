export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { email, token } = req.body;

    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/user_roles?email=eq.${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'apikey': process.env.SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    return res.status(200).json(data);
}
