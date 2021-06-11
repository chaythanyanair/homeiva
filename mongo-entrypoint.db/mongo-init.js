var rootUser = _getEnv('MONGO_ROOT_USERNAME');
var rootPassword = _getEnv('MONGO_ROOT_PASSWORD');
var user = _getEnv('MONGO_USERNAME');
var password = _getEnv('MONGO_PASSWORD');
var rootDb = _getEnv('MONGO_ROOT_DATABASE');
var host = _getEnv('MONGO_HOSTNAME');
var port = _getEnv('MONGO_PORT');
var mongoDb = _getEnv('MONGO_DB');

var connectionUrl = `mongodb://${rootUser}:${rootPassword}@${host}:${port}/${rootDb}`;

var db = connect(connectionUrl)

db = db.getSiblingDB(mongoDb);

db.createUser({user: user, pwd: password, roles: [{role:"root", db:"admin"}]})

db.createCollection('users');
db.createCollection('apartments');



