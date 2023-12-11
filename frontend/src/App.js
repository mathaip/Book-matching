// App.js

import React, { useState } from 'react';
import { AppBar,Button, Toolbar, Typography, Container, Grid, Select, MenuItem, Card, CardMedia, CardContent, Box } from '@mui/material';
import dragonTattoo from './assets/images/dragon_tattoo.jpeg'
import  book_thief from './assets/images/book_thief.jpg'
import da_vinci_codi from './assets/images/da_vinci_code.webp'
import dune from './assets/images/dune.jpg'
import enders_game from './assets/images/enders_game.jpg'
import gone_girl from './assets/images/gone_girl.jpg'
import got from './assets/images/got.jpg'
import hobbit from './assets/images/hobbit.jpg'
import light from './assets/images/light.jpg'
import neuromancer from './assets/images/neuromancer.jpg'
import notebook from './assets/images/notebook.jpeg'
import outlander from './assets/images/outlander.jpg'
import pillars from './assets/images/pillars.jpg'
import potter from './assets/images/potter.jpg'
import pride from './assets/images/pride.jpg'









function App() {
  const [readingLevel, setReadingLevel] = useState('');
  const [genre, setGenre] = useState('');
  const [response, setResponse] = useState()
  const [bookName, setBookName] = useState()
  const [bookGenre, setBookGenre] = useState('')
  const [bookImage, setBookImage] =useState()
  const [bookReadingLevel, setBookReadingLevel]=useState('')
  const [bookVector, setBookVector] = useState()
  const [userVector, setUserVector] = useState()
  // Placeholder data for book
  const bookImageMapping = {
    "The Girl with the Dragon Tattoo": dragonTattoo,
    "The Book Thief": book_thief,
    "The Da Vinci Code": da_vinci_codi,
    "Dune": dune,
    "Ender's Game": enders_game,
    "Gone Girl": gone_girl,
    "A Game of Thrones": got,
    "The Hobbit": hobbit,
    "All the Light We Cannot See": light,
    "Neuromancer": neuromancer,
    "The Notebook": notebook,
    "Outlander": outlander,
    "The Pillars of the Earth": pillars,
    "Harry Potter and the Sorcerer's Stone": potter,
    "Pride and Prejudice": pride,
};

  const bookMatchAPI =async()=>{
    try {

      const url = 'http://127.0.0.1:8080/match';

      const requestBody = {
        method: 'POST', // specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // specify the content type if sending JSON
          // Add any other headers if needed
        },
        body: JSON.stringify({
          // your request data goes here
          answer1: readingLevel,
          answer2: genre,
        }),
      };

      const response = await fetch(url, requestBody);

      const data = await response.json();
      
      const result = data.result
      setBookName(result.matched_book_title)
      console.log(bookName)
      setBookGenre(result.matched_book_genre)
      setBookReadingLevel(result.matched_book_reading_level)
      setUserVector(result.user_input_vector_score)
      setBookVector(result.matched_book_vector_score)
      const matchedBookImageUrl = bookImageMapping[bookName];
      console.log(matchedBookImageUrl);
      setBookImage(matchedBookImageUrl)
// Now you can use matchedBookImageUrl to display the image on your frontend
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Book Recommendation System by Mathai</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This empty Toolbar is used to offset the content below the AppBar */}
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Find a book for you</Typography>
            <Box mt={2}>
              <Typography>Reading Level:</Typography>
              <Select
                value={readingLevel}
                onChange={(e) => setReadingLevel(e.target.value)}
                fullWidth
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </Box>
            <Box mt={2}>
              <Typography>Genre:</Typography>
              <Select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                fullWidth
              >
                <MenuItem value="Fantasy">Fantasy</MenuItem>
                <MenuItem value="Mystery">Mystery</MenuItem>
                <MenuItem value="Science-fiction">Science Fiction</MenuItem>
                <MenuItem value="Historical Fiction">Historical Fiction</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>   
              </Select>

            </Box>
            <Box mt={2}>

            <Button onClick={bookMatchAPI} variant="outlined">Submit</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="fitContent"
                image={bookImage}
                alt={bookName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {bookName} -- {bookGenre} -- {bookReadingLevel}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;