const express = require('express');
const app=express();
app.get('/',(require,res) => {
    res.send('<h1> Welcome to express!</h><p>This is an html response</p>');

});
app.get('/data',(req,res)=>{
    res.json({
        message:'This is a JSON response',
        status:'success'
    });
});

const PORT = 3000;
app.listen(PORT,() =>{
    console.log(`server is running on http://localhost:${PORT}`);

});