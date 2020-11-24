const orango = require("orango");
const { EVENTS } = orango.consts;
const db = orango.get("test");

// we are connected, but orango has not initialized the models
db.events.once(EVENTS.CONNECTED, (conn) => {
  console.log("🥑  Connected to ArangoDB:", conn.url + "/" + conn.name);
});

// everything is initialized and we are ready to go
db.events.once(EVENTS.READY, () => {
  console.log("🍊  Orango is ready!");
});

module.exports.createConnect = async () => {
  try {
    await db.connect({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
    // everything is initialized and we are ready to go
    console.log("Are we connected?", db.connection.connected); // true
  } catch (e) {
    console.log("Error:", e.message);
  }
};
module.exports.Database = db;
