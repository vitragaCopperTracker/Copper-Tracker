import { query } from '../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Fetching most followed stocks from database...');
    
    // Query to fetch most followed stocks from our database
    const result = await query(`
      SELECT 
        id,
        name,
        ticker,
        open_price,
        close_price,
        intraday_percentage,
        current_price,
        intraday_change,
        seven_day_change,
        seven_day_percentage,
        volume,
        country,
        stock_exchange,
        stock_type
      FROM api_app_mostfollowedstocks 
      ORDER BY 
        CASE 
          WHEN stock_type = 'most_watched' THEN 1
          WHEN stock_type = 'north_american_leaders' THEN 2
          WHEN stock_type = 'global_market_leaders' THEN 3
          ELSE 4
        END,
        volume DESC
      LIMIT 50
    `);

    console.log(`Found ${result.rows.length} most followed stock records`);

    // Transform the data to match frontend expectations
    const stocks = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      ticker: row.ticker,
      open_price: parseFloat(row.open_price || 0),
      close_price: parseFloat(row.close_price || 0),
      intraday_percentage: parseFloat(row.intraday_percentage || 0),
      current_price: parseFloat(row.current_price || 0),
      intraday_change: parseFloat(row.intraday_change || 0),
      seven_day_change: parseFloat(row.seven_day_change || 0),
      seven_day_percentage: parseFloat(row.seven_day_percentage || 0),
      volume: parseInt(row.volume || 0),
      country: row.country,
      stock_exchange: row.stock_exchange,
      stock_type: row.stock_type
    }));

    // Group stocks by category
    const groupedStocks = {
      most_watched: stocks.filter(stock => stock.stock_type === 'most_watched').slice(0, 10),
      north_american_leaders: stocks.filter(stock => stock.stock_type === 'north_american_leaders').slice(0, 10),
      global_market_leaders: stocks.filter(stock => stock.stock_type === 'global_market_leaders').slice(0, 10)
    };

    res.status(200).json({
      success: true,
      data: groupedStocks,
      total_stocks: stocks.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database error:', error);
    
    // Fallback data structure
    const fallbackData = {
      most_watched: [],
      north_american_leaders: [],
      global_market_leaders: []
    };
    
    res.status(200).json({
      success: false,
      data: fallbackData,
      error: error.message,
      message: 'Using fallback data - database error',
      timestamp: new Date().toISOString()
    });
  }
}