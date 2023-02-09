const fs = require('fs');

const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
//   console.log(req);
  
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is assignment</title></head>');
    res.write("<body> <h1> Hello there! </h1> <form action='/create-user' method='POST'> <input type='text' name='username' placeholder='username'><button type='submit'>Submit</button></form></body>");
    res.write('</html>');
    return res.end();
};

if(url === '/users'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>This is assignment</title></head>');
    res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul></body>');
    res.write('</html>');
    return res.end();
  };

  if(url === '/create-user' && method === 'POST'){
    const body = [];
    req.on('data', chunk => {
        console.log(chunk);
        body.push(chunk);
      });
      return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        console.log(message)
        fs.writeFile('message.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
      });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
}; 

exports.handler = reqHandler;
