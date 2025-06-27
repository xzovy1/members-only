# Members Only
## Screenshots
![login](/login.png)
![dashboard](/dashboard.png)
![ciphered](/ciphered-messages.png)
![messages](/messages.png)
![signup](/signup.png)
## Goals
- practice:
    - authentication using bcryptjs, and passport.js
    - databases using postgres and node-pg
    - validation (client and server side)
    - backend using express.js
## Database setup
- users: usernames, passwords, first name , last name, and membership status
- messages: title, body and timestamp

### DB schema
#### Users table
- primary key
- username
- first name
- last name
- password
- membership status (non-member or member).

#### Messages table
- primary key
- message title
- message body
- creation date
- fk_users

## UI/UX
- landing on sign-up/ sign-in form
    - sanitized and validated.
    - confirm password field validated with a custom validator
- gaining membership: 
    - members gain membership through a 'skill-testing' question. if their answer aligns with a variety of answers they are allowed in. ✅
- only members can create a new message(only shown when logged in) ✅
- all messages are displayed on the homepage. 
    - only display author and date to other club-members. 
    - perhaps encrypt / cipher the messages for non-members using atbash or something simple.
- only admin can delete messages ✅
