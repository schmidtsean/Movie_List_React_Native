import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';


class NavBar extends React.PureComponent {
  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView>
        <View style={styles.mainNav}>
          <Image 
            style={styles.img}
            source={require('../assets/images/logo.png')} />
          <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
            <Image style={styles.img}
            source={require('../assets/images/search.png')} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: 'white'
  },

  mainNav: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 40,
    padding: 5,
  }
});

export default NavBar;