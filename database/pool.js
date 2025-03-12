const { Pool } = require("pg");

const connectionString =
  "postgresql://postgres.nzsxzigvqeidfyfldyff:proTyberanec1@aws-0-eu-west-2.pooler.supabase.com:6543/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { pool };
