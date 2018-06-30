import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import CommentDetail from './CommentDetail';
import { List } from "react-native-elements";

class CommentList extends Component {

    state = {
        comments: null,
        refreshing: false
    }

    componentWillMount() {
        this.makeRemoteRequest()
    }

    makeRemoteRequest = () => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${this.props.photoId}&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    comments: response.data.comments.comment,
                    refreshing: false
                })
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

    render() {
        if (!this.state.comments) {
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
                    data={this.state.comments}
                    renderItem={({ item }) => (
                        <CommentDetail author={item.realname} comment={item._content} />
                    )}
                    keyExtractor={item => item.id}
                    onRefresh={this.handleRefreshing}
                    refreshing={this.state.refreshing}
                />
            </List>
        );
    }
}

export default CommentList;

//id
//realname
//_content