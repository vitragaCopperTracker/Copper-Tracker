import { query } from '../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing most followed stocks database connection...');
    
    // Test if the table exists and get sample data
    const result = await query(`
      SELECT 
        COUNT(*) as total_count,
        COUNT(CASE WHEN stock_type = 'most_watched' THEN 1 END) as most_watched_count,
        COUNT(CASE WHEN stock_type = 'north_american_leaders' THEN 1 END) as north_american_count,
        COUNT(CASE WHEN stock_type = 'global_market_leaders' THEN 1 END) as global_count
      FROM api_app_mostfollowedstocks
    `);
    
    // Get a sample of data
    const sampleResult = await query(`
      SELECT 
        name, ticker, stock_type, current_price, intraday_percentage, stock_exchange
      FROM api_app_mostfollowedstocks 
      ORDER BY volume DESC 
      LIMIT 5
    `);

    const stats = {
      database_connected: true,
      table_exists: true,
      total_stocks: parseInt(result.rows[0].total_count),
      most_watched_count: parseInt(result.rows[0].most_watched_count),
      north_american_count: parseInt(result.rows[0].north_american_count),
      global_count: parseInt(result.rows[0].global_count),
      sample_data: sampleResult.rows,
      timestamp: new Date().toISOString()
    };

    console.log('Most followed stocks database stats:', stats);
    res.status(200).json(stats);
    
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      database_connected: false,
      table_exists: false,
      error: error.message,
      error_code: error.code,
      timestamp: new Date().toISOString()
    });
  }
}