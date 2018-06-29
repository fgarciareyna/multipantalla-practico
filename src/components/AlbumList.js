import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { List, ListItem, SearchBar } from "react-native-elements";

class AlbumList extends Component {
  state = { photoset: null };

  componentWillMount() {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1')
      .then(response => this.setState({ photoset: response.data.photosets.photoset }));
  }

  renderAlbums() {
    return this.state.photoset.map(album =>
      <AlbumDetail key={album.id} title={album.title._content}  albumId={album.id}  />
    );
  }

  render() {
    console.log(this.state);


    if (!this.state.photoset) { 
			return (
					<Text>
            Loading...
					</Text>
				);
    }

    return (
      <List>
        <FlatList
        data={this.state.photoset}
        renderItem={({ item }) => (
          <AlbumDetail key={item.id} title={item.title._content}  albumId={item.id}  />
        )}
        keyExtractor={item => item.id}
        />
      </List>
    );
  }
}

export default AlbumList;
