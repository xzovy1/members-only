`CREATE TABLE users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR (255), first_name VARCHAR (255), last_name VARCHAR (255), password VARCHAR (255), member_status BOOLEAN DEFAULT false, admin BOOLEAN DEFAULT false );`

`CREATE TABLE messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR (255), body TEXT, date_time TIMESTAMP DEFAULT now(), fk_users INTEGER references users(id) );`

after `npm install connect-pg-simple` :

`CREATE TABLE "session" ( "sid" varchar NOT NULL COLLATE "default", "sess" json NOT NULL, "expire" timestamp(6) NOT NULL ) WITH (OIDS=FALSE); ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE CREATE INDEX "IDX_session_expire" ON "session" ("expire");`