module.exports = (req, res) => {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!key) {
    res.status(500).json({ error: 'Missing SUPABASE_PUBLISHABLE_KEY env var' });
    return;
  }
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    url: 'https://unekjzsfsdgzlytjkino.supabase.co',
    key,
  });
};
