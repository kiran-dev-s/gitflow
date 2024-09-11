dbName: nodejscrud


CREATE TABLE users(
id SERIAL PRIMARY KEY NOT NULL,
fname VARCHAR(200),
lname VARCHAR(200),
email VARCHAR(200),
phone VARCHAR(200)
)