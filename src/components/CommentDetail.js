import React from 'react';
import { Text, View } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const CommentDetail = ({ author, comment }) => {
    const {
        headerContentStyle,
        headerTextStyle
    } = styles;

    return (
        <Card>
            <CardSection>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{author}</Text>
                </View>
            </CardSection>

            <CardSection>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{comment}</Text>
                </View>
            </CardSection>
        </Card>
    );
};


const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    }
};

export default CommentDetail;