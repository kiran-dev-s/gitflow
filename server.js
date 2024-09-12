const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const redis = require('redis');
const dbConfig = require('./config/db');
const indexRouter = require('./app/routers/indexRouter');



const port = 3002;
const app = express();
var client = redis.createClient(6379, process.env.REDIS_IP);

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(cookieParser('your-secret-dontknow'));

;(async function () {
	client.AUTH(process.env.REDIS_PASS, async function (err, result) {
		if (err) {
			console.log('redis connection errr => ', err);
		} else {
			console.log('redis connection reply =>', result);
		}
	})
	const pgClient = await dbConfig.pgPool.connect();
	app.locals.db = pgClient;
	app.locals.redisdb = client;
	app.listen(port, function () {
		console.log('server started at port', port);
	})
})();



app.use('/', indexRouter);




