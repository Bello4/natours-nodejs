const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION Shutting down...');
    process.exit(1);
});

dotenv.config({ path: './config.env'});
const app = require('./app');
//console.log(process.env);
//NwXXceTgWuhg9K5G
//const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const PASSWORD = process.env.DATABASE_PASSWORD
const DB = 'mongodb+srv://bello:<PASSWORD>@cluster0.qon07.mongodb.net/natours?retryWrites=true&w=majority';
mongoose.connect(DB, {
//mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('DB connection successfull!'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLE REJECTION Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

