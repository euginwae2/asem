import React from 'react';
import { FlatList,StyleSheet,} from 'react-native';

import Article from '../components/Article';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props)
  {
    super(props);
  }

  

  render() {
    var data = [{title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    {title: 'Article Title',imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
  ];

  
    return (
        <FlatList
        refreshing = {false}
        onRefresh = {()=>this._fetchNew(data)}
        onEndReachedThreshold = {0.8}
        onEndReached = {()=>this._fetchMore(data)}
        data={data}
        renderItem={({item}) => 
          <Article imageSource={item.imageSource} title={item.title}/>
      }
      />
    );
  }
  
  _fetchNew(data)
  {
    console.log('Fetching New');
    let num = data.length + 1;
    data.unshift({title: 'Article Title '+ num,imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},);
    console.log(data.length)
  };

  _fetchMore(data){
    console.log('Fetch More')
    let num = data.length + 1;
    data.push({title: 'Article Title '+ num,imageSource: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},);
  };
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
