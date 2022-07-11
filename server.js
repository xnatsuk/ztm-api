const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('This is working!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/*
/ -> res = this is working
/login -> POST = success/fail
/register -> POST = user object
/profile/:userId -> GET = user object
/image -> PUT = user object


*/