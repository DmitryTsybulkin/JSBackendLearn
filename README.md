### Node js & express project

- Run node.js server: `node node/server.js`

It's running on 8080 port. Node.js app is representing the "_chat room_": clients can connect to server and share messages.

- Build docker image to run express app: `docker build -t <your username>/node-express-app .`
- Run docker container: `docker run <your username>/node-express-app`

By default, the express app is running on 3000 port