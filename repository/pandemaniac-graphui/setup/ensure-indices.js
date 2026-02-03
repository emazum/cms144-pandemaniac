db.teams.createIndex({ name: 1 }, { unique: true });
db.graphs.createIndex({ name: 1 }, { unique: true });
db.attempts.createIndex({ team: 1, graph: 1 }, { unique: true });
