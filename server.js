const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/selectedText', (req, res) => {
  var text = req.body.selText.trim();
  console.log(text);
  var result = '';

  if(text != '' && text!=null){
    var arr = text.split(" ");
    switch(req.body.opt){
      case 'Single':
        
        arr0 = arr[0];
        if(arr0.indexOf('.') > -1){
          return res.status(200).send({'result' :'token can not have .'});
        }else if(arr0.indexOf(',') > -1){
          return res.status(200).send({'result' :'token can not have ,'});
        }
        else{
           result = arr0;
           return res.status(200).send({'result' :result});
        }
      case 'Multiple':
      return res.status(200).send({'result' :text});
      case 'Vowel':
        vowelArr = ['A','a','E','e','I','i','O','o','U','u']
        arr0 = arr[0];
        letter = arr0.charAt(0);
        if(vowelArr.includes(letter)){
          result = arr0+':Backy';
        }else{
          result = arr0+':Kola';
        }
        return res.status(200).send({'result' :result});

       
    }    

  }else{

}
});

app.listen(port, () => console.log(`Listening on port ${port}`));