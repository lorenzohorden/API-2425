import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import getAccessToken from './scripts/token.js';


const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));






app.get('/', async (req, res) => {
  const token = await getAccessToken();
  console.log(token)
  return res.send(renderTemplate('server/views/index.liquid', {  }));
});


// app.get('/plant/:id/', async (req, res) => {
//   const id = req.params.id;
//   const item = data[id];
//   if (!item) {
//     return res.status(404).send('Not found');
//   }
//   return res.send(renderTemplate('server/views/detail.liquid', { title: `Detail page for ${id}`, item }));
// });

app.get('/recommendation/', async (req, res) => {
  const { genre } = req.query;

  const searchQuery = `q=genre%3A${genre}&type=track`

  const accessToken = await getAccessToken();

  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?${searchQuery}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const searchData = await searchResponse.json();
  console.log(searchData.tracks.items[0]);
  const randomNumber = Math.floor(Math.random() * 20);
  const data = searchData.tracks.items[randomNumber]
  return res.send(renderTemplate('server/views/result.liquid', { track: data }));
})









const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

