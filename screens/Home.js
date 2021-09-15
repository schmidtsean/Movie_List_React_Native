import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {getPopularMovies, getUpcomingMovies, getTopRated, getFamilyMovies, getDocumentaryMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimentions = Dimensions.get('screen')
const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [topRated, setTopRated] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getTopRated(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    
    getData()
      .then(
      ([
        upcomingMoviesData, 
        popularMoviesData, 
        topRatedData, 
        familyMoviesData, 
        documentaryMoviesData,
      ]) => {
        const moviesImagesArray = [];
        upcomingMoviesData.forEach(movie => {
          moviesImagesArray.push('https://image.tmdb.org/t/p/w500/'+movie.poster_path)
        });

          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setTopRated(topRatedData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        }
    )
    .catch(() => {
      setError(true)
    })
    .finally(() => {
      setLoaded(true);
    });
  
  },
   []);

  
  
  
  return (
    <React.Fragment>
    {loaded && !error && (
      <ScrollView>
        { moviesImages && (
          <View style={styles.sliderContainer}>
            <SliderBox 
              images={moviesImages} 
              dotStyle={styles.sliderStyle}
              sliderBoxHeight={dimentions.height / 1.5} 
              autoplay={true} 
              circleLoop={true} />
          </View>
        )}
        {popularMovies && (
          <View style={styles.carousel}>
            <List navigation={navigation} title="Popular Movies" content={popularMovies}/>
          </View>
          )}
        {topRated && (
          <View style={styles.carousel}>
            <List navigation={navigation} title="Top Rated" content={topRated}/>
          </View>
          )}
        {familyMovies && (
          <View style={styles.carousel}>
            <List navigation={navigation} title="Family Movies" content={familyMovies}/>
          </View>
          )}
        {documentaryMovies && (
          <View style={styles.carousel}>
            <List navigation={navigation} title="Documentaries" content={documentaryMovies}/>
          </View>
          )}
        
        </ScrollView>
      )} 
        {!loaded &&(<ActivityIndicator size='large' color='red' />)}
        {error && <Error />}
    </React.Fragment>
  );
  
 
};


const styles = StyleSheet.create({
  
  sliderContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  sliderStyle: {
    height: 0
  },
  carousel: {
    flex: 1, 
    alignItems: "center",
  },

})

export default Home;