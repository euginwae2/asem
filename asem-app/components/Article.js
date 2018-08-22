import React from 'react';
import {View , Text , Image, StyleSheet} from 'react-native';

export default class Article extends React.Component
{
    constructor(props){
        super(props);
    }
    render()
    {
        return(
            <View style={style.Article}>
                <Image style={style.ArticleImage} source={{uri: this.props.imageSource}}/>
                <Text style={style.ArticleTitle}>{this.props.title}</Text>
            </View>
        )
    }
}
const style = StyleSheet.create({
    Article: {
        margin: 20,
        borderWidth: 1,
        borderColor: '#000000',
        height: 160,
    },
    ArticleImage: {
        height: 120,
        resizeMode: 'cover',
    },
    ArticleTitle: {
        height: 40,
        padding: 5,
    }

})