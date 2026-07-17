const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
  });
app.get('/cal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});
app.post('/result',(req,res) =>{
  const{num1,num2,message}=req.body;
  res.send('<h2>your data is successfully submited<h2>');
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});