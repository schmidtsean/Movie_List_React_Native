import React, {useEffect, useState} from 'react';
import { Image, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator, View} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';

const placeholderImage = require('../assets/images/placeholder.jpg');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);



  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true)
    });
  }, [movieId]);

  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <Image 
            resizeMode='cover'
            style={styles.image} 
            source={
              movieDetail.poster_path 
              ?   {uri: 'https://image.tmdb.org/t/p/w500/' + movieDetail.poster_path} 
              :   placeholderImage
          }
        />
        <View style={styles.container}>
          <Text style={styles.movietitle}>{movieDetail.title}</Text>
          {movieDetail.genres && ( 
            <View style={styles.genresContainer}>
              {movieDetail.genres.map(genre => {
                return(
                  <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
              )
            })}
             
            </View>)}
            <StarRating maxStars={5} rating={movieDetail.vote_average / 2}/> 
        </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size='large'/>}
    </React.Fragment>    
  );
};

const styles = StyleSheet.create ({

  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },

  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },

  image: {
    height: height / 2,
    
  },
  movietitle: {

    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    
  },

  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
 
});

export default Detail;