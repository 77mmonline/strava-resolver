export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'No URL' });

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const finalUrl = response.url;
    const id = finalUrl.match(/activities\/(\d+)/)?.[1];
    if (!id) return res.status(404).json({ error: 'No activity ID found in final URL (may require login)' });
    res.json({ id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
