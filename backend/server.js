const express = require('express');
require('dotenv').config();
const connectDb = require('./db/dbconnect');
const { createServer } = require('http');
const multer = require('multer');
const socketio = require('./socket');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./documentation/swaggerSetup');

const app = express();
const server = createServer(app);
const io = socketio.init(server);
const adIo = socketio.initAdIo(server, '/socket/adpage');
const chatIo= socketio.initChatIo(server,'/chatIo')
const upload = multer({ dest: 'uploads/' });

// Body parser
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Default route
app.get('/', (req, res, next) => {
  res.send('Server running');
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/ad', require('./routes/ad'));
app.use('/bid', require('./routes/bid'));
app.use('/room', require('./routes/room'));
app.use('/auction', require('./routes/auction'));
app.use('/upload', require('./routes/uploads'));

//payments
const stripe = require('stripe')('sk_test_51OCMaVSDppP0N6lcnnB4xo9E7aLE9DVEQdQxT4qQp4XuOg2kQRZevHhQdYRZ0wUyr7Rp0brxCRURE7jc2hrYwxDR00z9VusPhN');
const { v4: uuidv4 } = require('uuid');
app.post('/payments', async (req, res) => {
 const {amount, token} = req.body
 console.log("amount : "+amount)
 console.log("token : "+ token)
 const idempotencyKey =uuidv4()
 return stripe.customers.create({
  email:token.email,
  source:token.id
 }).then(customer=>{
  stripe.charges.create({
    amount:amount*100,
    currency:'usd',
    

  },{idempotencyKey})
 })
 .then(result=>res.status(200).json(result))
 .catch(error=>console.log(error))
});



// Socket.io setup
const PORT = process.env.PORT || 5000;
io.on('connection', (socket) => {
  //  console.log('### Socket IO client connected');
   socket.on("send_message",(data)=>{
    console.log(data)
    //sockt.to(data.room).emit("recieve_message",data)
    socket.broadcast.emit("recieve_message",data)
   })
   socket.on("join_room",data=>{
    socket.join(data)
   })
  socket.on('disconnect', (reason) => {
    // console.log('### Socket IO client disconnected');
  });

 
});
adIo.on('connect', (socket) => {
  // socket.join('testroom')
  socket.on('joinAd', ({ ad }) => {
    socket.join(ad.toString());
    // console.log(`User joined room ${ad}`);
  });
  socket.on('leaveAd', ({ ad }) => {
    socket.leave(ad.toString());
    // console.log(`Left room ${ad}`);
  });
  socket.on('disconnect', () => {
    // console.log('User has disconnect from ad');
  });
});
chatIo.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    chatIo.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// Connect DB and Initialize server
connectDb();
server.listen(PORT, () => {
  console.log(`### Server running on port ${PORT}`);
});
