import React, { Component } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import { List } from "react-native-elements";

class PhotoList extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshing = this.handleRefreshing.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  state = {
    photos: null,
    refreshing: false
  };

  componentWillMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = () => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${this.props.albumId}&user_id=${this.props.userId}&format=json&nojsoncallback=1`)
      .then(response => this.setState({
        photos: response.data.photoset.photo,
        refreshing: false
      }));
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

  sortByName = () => {
    this.setState({
      photos: this.state.photos.sort((a, b) => a.title > b.title)
    })
  }

  sortByDate = () => {
    this.setState({
      photos: this.state.photos.sort((a, b) => a.id > b.id)
    })
  }

  renderHeader = () => {
    return (<View>
      <Button
        onPress={this.sortByName}
        title="By Name"
      />
      <Button
        onPress={this.sortByDate}
        title="By Date"
      />
    </View>);
  };

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
            <PhotoDetail key={item.title} title={item.title} imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} photoId={item.id} />
          )}
          keyExtractor={item => item.id}
          onRefresh={this.handleRefreshing}
          refreshing={this.state.refreshing}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}

export default PhotoList;
