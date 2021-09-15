import React, { useState } from 'react';
import { SafeAreaView, View, Image, TextInput, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import Card from '../components/Card';
import { searchMovie } from '../services/services';

const Search = ({navigation}) => {
    const [text, onChangeText] = useState()
    const [searchResults, setSearchResults] =useState()

    const  onSubmit = (query) => {
      searchMovie(query, 'movie').then(data => {
        setSearchResults(data);
      })
    }
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
           
           
            
            <TextInput
              style={styles.input}
              placeholder= {'Search for Movie'}
              onChangeText={onChangeText}
              value={text}
            />

            <TouchableOpacity
                onPress={() => {
                  onSubmit(text)
                }}>
                  <Image style={styles.img}
                    source={require('../assets/images/search.png')} />
            </TouchableOpacity>
           
          </View>
          </View>

          <View style={styles.searchItem}>
            {searchResults && searchResults.length > 0 && (
              <FlatList
                numColumns={3}
                data={searchResults}
                renderItem={({item}) => (
                  <Card navigation={navigation} item={item} />
                )}
                keyExtractor={item => item.id}
                />
            )}

            {searchResults && searchResults.length == 0 && (
              <View style={[styles.empty, {paddingTop: 20}]}>
                <Text> No Result</Text>
              </View>
              )}

          
            
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}


const styles = StyleSheet.create({
  
  input: {
    height: 40,
    width: 340,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
  },

  container: {
    padding: 10,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  img: {
    height: 25,
    width: 25,
    borderRadius: 50
  },

  searchItem: {
    padding: 5,
  }
    
});

export default Search;