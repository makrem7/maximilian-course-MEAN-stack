const http= require('http');
const app= require('./backend/app.js');

const port = 3000; 
app.set('port',port);

const server = http.createServer(app)

server.listen(3000)