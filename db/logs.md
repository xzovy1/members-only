`CREATE TABLE users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR (255), first_name VARCHAR (255), last_name VARCHAR (255), password VARCHAR (255), member_status BOOLEAN DEFAULT false, admin BOOLEAN DEFAULT false );`

`CREATE TABLE messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR (255), body TEXT, date_time TIMESTAMP DEFAULT now(), fk_users INTEGER references users(id) );`

