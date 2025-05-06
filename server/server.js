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

let genres
let oldSongs1 = []
let oldSongs2 = []
let answers = []
let score = 0
app.get('/recommendation/', async (req, res) => {
   genres = req.query.genre; // getting the genres out of the query

  // put the result for each genre in array
  const tracks = []
  oldSongs1 = []
  for (const genre of genres) {
    const searchQuery = `q=genre%3A${genre}&type=track`;
    const accessToken = await getAccessToken();

    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await searchResponse.json();
    const randomInt = Math.floor(Math.random() * 10) + 1;
    const track = data.tracks.items[randomInt];
    tracks.push(track);
    oldSongs1.push(track)
  }

  console.log(oldSongs2)
  return res.send(renderTemplate('server/views/result.liquid', { tracks, genres, score, oldSongs2, answers }));
})


app.get('/answer', async (req, res) => {
  answers = []
  for (let i = 0; i < 3; i++) { 
    answers.push(req.query[`genre-${i+1}`])
  }
  console.log(answers)
  console.log(genres)

  // check if answer is correct then add 1 to score
  for (let i = 0; i < 3; i++) {
    if(answers[i] == genres[i]) {
      score += 1;
    } 
  }

  oldSongs2 = []
  oldSongs2 = oldSongs1

  console.log(`score is: ${score}`)
  return res.redirect(`/recommendation/?genre=${genres[0]}&genre=${genres[1]}&genre=${genres[2]}`)
})









const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

