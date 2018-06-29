import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { List } from "react-native-elements";

class AlbumList extends Component {
  state = { 
    photoset: null, 
    user_id: "60216816%40N00",
    refreshing: false 
   };

  componentWillMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=${this.state.user_id}&format=json&nojsoncallback=1`)
    .then(response => this.setState({ 
      photoset: response.data.photosets.photoset, 
      refreshing: false 
    }));
  }

  handleRefreshing = () => {
    this.setState({ 
      refreshing: false 
    },
    () => {
      this.makeRemoteRequest();
    }
  );
  }

  render() {
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
          <AlbumDetail key={item.id} title={item.title._content}  albumId={item.id} userId={this.state.user_id} />
        )}
        keyExtractor={item => item.id}
        onRefresh={this.handleRefreshing}
        refreshing={this.state.refreshing}
        />
      </List>
    );
  }
}

export default AlbumList;
