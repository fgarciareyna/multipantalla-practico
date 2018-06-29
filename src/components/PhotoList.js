import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import { List } from "react-native-elements";

class PhotoList extends Component {
  state = { photos: null };

  componentWillMount() {
    console.log(this.props)
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${this.props.albumId}&user_id=${this.props.userId}&format=json&nojsoncallback=1`)
      .then(response => this.setState({ photos: response.data.photoset.photo }));
  }

  render() {
    if (!this.state.photos) {
      return (
        <View style={{ flex: 1 }}>
          <Text>
            Loading...
					</Text>
        </View>
      );
    }

    return (
      <List>
        <FlatList
        data={this.state.photos}
        renderItem={({ item }) => (
          <PhotoDetail key={item.title} title={item.title} imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} />
        )}
        keyExtractor={item => item.id}
        />
      </List>
    );
  }
}

export default PhotoList;
