import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const items = [
  { id: 10, name: 'Item1' },
  { id: 27, name: 'Item2' },
];

const server = http.createServer((req, res) => {
  console.log(`HTTP request: ${req.method} ${req.url}`);

  // GET root
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my REST API!');

  // GET all items
  } else if (req.method === 'GET' && req.url === '/items') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));

  // GET random item 
  } else if (req.method === 'GET' && req.url === '/items/random') {
    if (items.length > 0) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(randomItem));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('No items available');
    }

  // GET items count
  } else if (req.method === 'GET' && req.url === '/items/count') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count: items.length }));

  // GET item by ID 
  } else if (req.method === 'GET' && req.url.split('/')[1] === 'items') {
    const requestedID = parseInt(req.url.split('/')[2]);
    const foundItem = items.find(item => item.id === requestedID);

    if (foundItem) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(foundItem));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Item not found');
    }

  // POST new item
  } else if (req.method === 'POST' && req.url === '/items') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('req body', body);
      const newItem = JSON.parse(body);
      newItem.id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
      items.push(newItem);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newItem));
    });

  // PUT update existing item
  } else if (req.method === 'PUT' && req.url.split('/')[1] === 'items') {
    const requestedID = parseInt(req.url.split('/')[2]);
    const foundItemIndex = items.findIndex(item => item.id === requestedID);

    if (foundItemIndex !== -1) {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const updatedData = JSON.parse(body);
        items[foundItemIndex].name = updatedData.name;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items[foundItemIndex]));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Item not found');
    }

  // DELETE item
  } else if (req.method === 'DELETE' && req.url.split('/')[1] === 'items') {
    const requestedID = parseInt(req.url.split('/')[2]);
    const foundItemIndex = items.findIndex(item => item.id === requestedID);

    if (foundItemIndex !== -1) {
      items.splice(foundItemIndex, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Item not found');
    }

  // Default 404
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
