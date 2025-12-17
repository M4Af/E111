# E111
-----------------------------------------------------------------------------------------

Password Manager
-----------------------------------------------------------------------------------------
Project description
-----------------------------------------------------------------------------------------
Password Manager is a web application built with Node.js, Express, EJS, and MongoDB, designed to securely store and manage user passwords.
Passwords are encrypted AES-256 (not hashed) using AES-256, which allows them to be safely decrypted and displayed to the user when needed and also hide password.

The application supports full CRUD operations, filtering, sorting, dynamic routing, and follows a clean architecture.
MongoDB is run inside a Docker container.

Features:
-----------------------------------------------------------------------------------------

-Password encryption (AES-256) with decryption on demand

-Show / hide password toggle in details view

-Full CRUD (Create, Read, Update, Delete)

-Filtering:

Title

Email

-Sorting by:

Date (oldest → newest)

Date (newest → oldest)

Title A–Z

Title Z–A

Dynamic routing (/passwords/:id, /edit/:id)

Validation:

Email format validation

Password strength validation

-Error handling with custom error pages

-Responsive, CSS design

-MongoDB running in Docker


Technologies
-----------------------------------------------------------------------------------------
-Node.js

-Express.js

-EJS

-MongoDB

-MongoDB Compass

-Docker

-Crypto (AES-256 encryption)

-HTML

-CSS

Database Setup

The project uses MongoDB running in Docker.

Run MongoDB container:

docker run --name mongo_password_manager -p 27017:27017 -d mongo:6.0

MongoDB Compass:

Create Connection which should be named -> mongo_password_manager

Explanation:

mongo_password_manager –> container name

27017:27017 –> MongoDB default port

mongo:6.0 –> MongoDB version

No login/password required

Database and Collection:

Database name: passwords

Collection name: passwords


Installation
-----------------------------------------------------------------------------------------
Clone the repository:

git clone https://github.com/M4Af/E111.git


Go to project directory:

cd password_manager


Install dependencies:

npm install express

npm install ejs

npm install mongodb


Running the Application
-----------------------------------------------------------------------------------------


Start the application in VS Code:

npm start


Open in browser:

http://localhost:3000


Endpoints:
-----------------------------------------------------------------------------------------
/

/add

/add

/passwords/:id

/edit/:id

/edit/:id

/delete/:id


License
-----------------------------------------------------------------------------------------
This project is licensed under the MIT License.

See the LICENSE file for details.



Author
Maksymilian Kręgiel
-----------------------------------------------------------------------------------------

