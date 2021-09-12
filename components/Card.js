import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/images/placeholder.jpg');

const propTypes = {
  item: PropTypes.object,
}

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', {movieId: item.id})} 
        style={styles.Container}
      >
        <Image 
          resizeMode='cover'
          style={styles.image} 
          source={
            item.poster_path 
            ?   {uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path} 
            :   placeholderImage
          }
        />
        {!item.poster_path && (<Text style={styles.movieName}>{item.title}</Text>)}
      </TouchableOpacity>
          
    );
  }
}

const styles = StyleSheet.create ({
  Container: {
    padding: 5,
    position: 'relative',
    height: 200,
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  }
})

Card.PropTypes = propTypes 

export default Card;