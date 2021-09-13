import React, {useEffect, useState} from 'react';
import { Image, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator, View, Modal, Pressable} from 'react-native';
import {getMovie} from '../services/services';
import dateformat from 'dateformat';

const placeholderImage = require('../assets/images/placeholder.jpg');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisable, setModalVisable] = useState(false);


  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true)
    });
  }, [movieId]);

  const showVideo = () => {
    setModalVisable(!modalVisable)
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
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
            <Text style={styles.vote}>Rating: {movieDetail.vote_average / 2} / 5</Text>
            {movieDetail.genres && ( 
              <View style={styles.genresContainer}>
                
                {movieDetail.genres.map(genre => {
                  return(
                    <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                )
              })}
              
              </View>)}
              
              <Text style={styles.overview}>{movieDetail.overview}</Text>

              <Text style={styles.release}>{'Release Date: ' + dateformat(movieDetail.release_date, 'mm / dd / yyyy')}</Text>
          </View>
          </ScrollView>
        
        </View>
      )}
      {!loaded && <ActivityIndicator size='large'/>}
    </React.Fragment>    
  );
};

const styles = StyleSheet.create ({

  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
     
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
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
  },

  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },

  overview: {
    padding: 15,
    textAlign: 'center',
  },

  release: {
    fontWeight: 'bold',
  },

  vote: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },


 
});

export default Detail;