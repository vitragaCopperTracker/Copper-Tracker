const { Pool } = require('pg');

const pool = new Pool({
  host: 'caboose.proxy.rlwy.net',
  port: 10900,
  database: 'railway',
  user: 'postgres',
  password: 'ggvIZCDjTkrrNVBQokzkStyKHzJkqltR',
  ssl: {
    rejectUnauthorized: false
  }
});

async function checkGeneralNewsTable() {
  let client;
  try {
    client = await pool.connect();
    console.log('Connected to database successfully!\n');

    // Check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'api_app_generalnews'
      );
    `);
    
    console.log('Table exists:', tableCheck.rows[0].exists);

    if (tableCheck.rows[0].exists) {
      // Count records
      const countResult = await client.query('SELECT COUNT(*) FROM api_app_generalnews');
      console.log('Total records:', countResult.rows[0].count);

      // Get sample data
      const sampleData = await client.query(`
        SELECT id, source, title, date, created_at 
        FROM api_app_generalnews 
        ORDER BY created_at DESC 
        LIMIT 5
      `);
      
      console.log('\nSample records:');
      sampleData.rows.forEach((row, index) => {
        console.log(`\n${index + 1}. ${row.title}`);
        console.log(`   Source: ${row.source}`);
        console.log(`   Date: ${row.date}`);
        console.log(`   Created: ${row.created_at}`);
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

checkGeneralNewsTable();
