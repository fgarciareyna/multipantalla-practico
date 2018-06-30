import React from 'react';
import { Text, View } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const CommentDetail = ({ author, comment }) => {
    const {
        headerTextStyle,
        commentTextStyle
    } = styles;

    return (
        <Card>
            <CardSection>
                <View>
                    <Text style={headerTextStyle}>{author}</Text>
                </View>
            </CardSection>

            <CardSection>
                <View>
                    <Text style={commentTextStyle}>{comment}</Text>
                </View>
            </CardSection>
        </Card>
    );
};


const styles = {
    headerTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    commentTextStyle: {
        fontSize: 14,
        textAline: 'justify'
    }
};

export default CommentDetail;