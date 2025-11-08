import express from 'express';
import {
  deleteMediaByID,
  getAllMedia,
  getMediaByID,
  postNewMediaItem,
} from './media.js';

import {
  deleteUserByID,
  getAllUsers,
  getUsersById,
  postNewUserItem,
} from './users.js';


const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const items = [
  {id: 2, name: 'eka'},
  {id: 11, name: 'toka juttu'},
];

// Config for Pug template engine
app.set('views', './views');
app.set('view engine', 'pug');

// parse json from request bodies
app.use(express.json());

// Serve pug template (server root)
app.get('/', (req, res) => {
  const content = {
    title: 'My Pug page',
    text: 'tässä tallennetut itemit',
    items,
  };
  res.render('index', content);
});
// Serve static files ('public' folder -> http server root)
app.use('/', express.static('public'));

// Media endpoints

// Get all media items
app.get('/api/media', getAllMedia);
// get media by id
app.get('/api/media/:id', getMediaByID);
// post new media item
app.post('/api/media', postNewMediaItem);
// delete media
app.delete('/api/media/:id', deleteMediaByID);



// Users endpoints
// TODO: add all based on requirements!!

// Get all users
app.get('/api/users', getAllUsers);
// get user by id
app.get('/api/users/:id', getUsersById);  
// post new user item
app.post('/api/users', postNewUserItem);
// delete user
app.delete('/api/users/:id', deleteUserByID);






// Endpoints for /items API
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/api/items', (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    body = Buffer.concat(body).toString();
    const newItem = JSON.parse(body);

    newItem.id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    items.push(newItem);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newItem));
  });
});

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.put('/api/items/:id', (req, res) => {
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    body = Buffer.concat(body).toString();
    const updatedData = JSON.parse(body);

    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);

    if (item) {
      item.name = updatedData.name;
      res.json({ message: 'Item updated successfully', item });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});