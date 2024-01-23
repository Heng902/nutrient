const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
//express
const express = require('express');
const app = express();
//express router
const userRouter = require('./routes/user');
const allContentsRouter = require('./routes/allContents');
const eatRouter = require('./routes/eat');
const needRouter = require('./routes/need');
app.use('/user', userRouter);
app.use('/allContents', allContentsRouter);
app.use('/eat', eatRouter)
app.use('/need', needRouter)


//紀錄請求日誌
app.use(logger('dev'));
//將 json 解析為 object
app.use(express.json());
//解析表單數據
app.use(express.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  res.json({
    ERROR: "URL ERROR"
  });
  res.status(404);
  res.end();
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
