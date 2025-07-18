PinBoard App – Sticky Notes
A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to create, drag, edit, and delete virtual sticky notes. Each note can be assigned a color, and the app supports real-time interaction with the backend to store and retrieve notes using a REST API

Features:
Create colorful sticky notes

Drag and reposition notes on the screen

Edit note content

Delete notes

Notes are saved persistently in MongoDB

Choose custom note colors

Layer	                  Technology
Tech                    Stack
Frontend	              React, CSS
Backend	                Node.js, Express.js
Database	              MongoDB + Mongoose

Setup Instructions:
1.Clone the Repository
git clone https://github.com/your-username/pinboard-app.git
cd pinboard-app
2.Backend Setup
cd server
npm install

->Create a .env file in /server:

->env
MONGO_URI=your_mongodb_connection_string
PORT=5000
npm run dev


3. Frontend Setup
cd ../client
npm install
npm start


API Endpoints:
Method	    Route	            Description
GET	        /api/notes	      Get all notes
POST	      /api/notes	      Create a new note
PUT	        /api/notes/:id	  Update an existing note
DELETE	    /api/notes/:id	  Delete a note


pinboard-app/
├── client/       # React frontend
├── server/       # Express backend
│   ├── models/
│   ├── routes/
│   └── .env
└── README.md


Author
Darshan – Student | MERN Stack Enthusiast
GitHub: kkdarshan





