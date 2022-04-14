import app from './app';

app.listen(process.env.APP_PORT, () => {
  console.log('🚀 Server started on port 3333!');
});
