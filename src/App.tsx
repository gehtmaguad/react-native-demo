import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, NavigationScreenProp, NavigationScreenProps } from 'react-navigation';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class HomeScreen extends React.Component<IProps, null> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      header: null
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component<IProps, null> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      title: "DetailsScreen"
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}