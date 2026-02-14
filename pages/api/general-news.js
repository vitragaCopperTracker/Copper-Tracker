import { query } from '../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Fetching general news from database...');
    
    // Query to fetch general news from our database
    const result = await query(`
      SELECT 
        id,
        source,
        title,
        url,
        content,
        summary,
        image_url,
        date,
        created_at,
        updated_at
      FROM api_app_generalnews 
      ORDER BY created_at DESC
      LIMIT 50
    `);

    console.log(`Found ${result.rows.length} general news records`);

    // If no data found, return empty array instead of error
    if (!result.rows || result.rows.length === 0) {
      console.log('No general news found in database');
      return res.status(200).json([]);
    }

    // Transform the data to match frontend expectations
    const generalNews = result.rows.map(row => ({
      id: row.id,
      source: row.source,
      title: row.title,
      url: row.url,
      content: row.content,
      summary: row.summary,
      image_url: row.image_url,
      date: row.date,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));

    res.status(200).json(generalNews);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch general news', 
      error: error.message 
    });
  }
}
