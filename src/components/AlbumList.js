import React, { Component } from 'react';
import { FlatList, Text, View, Picker } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { List } from "react-native-elements";

class AlbumList extends Component {
  state = {
    photoset: null,
    user_id: "60216816%40N00",
    hasAlbums: false,
    refreshing: false
  };

  componentWillMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=${this.state.user_id}&format=json&nojsoncallback=1`)
      .then(response => {
        if (response.data.photosets.photoset) {
          this.setState({
            photoset: response.data.photosets.photoset,
            hasAlbums: true,
            refreshing: false
          })
        } else {
          this.setState({
            photoset: null,
            hasAlbums: false,
            refreshing: false
          })
        }
      });
  }

  handleRefreshing = () => {
    this.setState({
      refreshing: true
    },
      () => {
        this.makeRemoteRequest();
      }
    );
  }

  updateUser(user) {
    this.setState({ user_id: user });
    this.handleRefreshing();
  }

  renderUsers = () => {
    return (
      <View>
        <Picker
          style={{ width: '95%' }}
          selectedValue={this.state.user_id}
          onValueChange={this.updateUser.bind(this)}>
          <Picker.Item label="User 60216816@N00" value="60216816%40N00" />
          <Picker.Item label="User 137290658@N08" value="137290658%40N08" />
          <Picker.Item label="User 22020982@N05" value="22020982%40N05" />
          <Picker.Item label="User 132822455@N05" value="132822455%40N05" />
        </Picker>
      </View>
    );
  };

  render() {
    if (!this.state.hasAlbums) {
      return (
        <View>
          <Text>
            No Images Found
					</Text>
        </View>
      );
    }

    if (!this.state.photoset) {
      return (
        <View>
          <Text>
            Loading...
					</Text>
        </View>
      );
    }

    return (
      <List>
        <FlatList
          data={this.state.photoset}
          renderItem={({ item }) => (
            <AlbumDetail key={item.id} title={item.title._content} albumId={item.id} userId={this.state.user_id} />
          )}
          keyExtractor={item => item.id}
          onRefresh={this.handleRefreshing}
          refreshing={this.state.refreshing}
          ListHeaderComponent={this.renderUsers}
        />
      </List>
    );
  }
}

export default AlbumList;
