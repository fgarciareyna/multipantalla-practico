import React from 'react';
import { Text, View } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const CommentDetail = ({ author, comment }) => {
    const {
        headerContentStyle,
        bodyContentStyle,
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
                <View style={bodyContentStyle}>
                    <Text style={headerTextStyle}>{comment}</Text>
                </View>
            </CardSection>
        </Card>
    );
};


const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#CFEFFA',
        flex: 1
    },
    bodyContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#D7F7F2',
        flex: 1
    },
    headerTextStyle: {
        fontSize: 18
    }
};

export default CommentDetail;