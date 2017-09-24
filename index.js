import express from 'express';
import bodyParser from 'body-parser';
import urlMetadata from 'url-metadata';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/meta', (req, res) => {
  urlMetadata(req.body.url).then((metadata) => {
     res.jsonp((metadata));
    }, (error) => {
      res.jsonp({ error });
    });
});

app.listen(5000, () => console.info('Server started at port 5000'));
