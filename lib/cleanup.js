let started = false;

export function startConnectionCleanup(pool) {
  if (started) return;
  started = true;

  setInterval(async () => {
    try {
      const [rows] = await pool.query(`
        SELECT ID FROM INFORMATION_SCHEMA.PROCESSLIST 
        WHERE TIME > 5 AND COMMAND = 'Sleep' AND USER = '${process.env.DATABASE_USER}'
      `);

      for (const row of rows) {
        await pool.query(`KILL ${row.ID}`);
        console.log(`Killed connection ID: ${row.ID}`);
      }
    } catch (error) {
      console.error('Cleanup error:', error.message);
    }
  }, 30000);
}
