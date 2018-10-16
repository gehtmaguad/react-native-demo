import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createStackNavigator, NavigationScreenProp, NavigationScreenProps } from 'react-navigation';
import { action, observable } from "mobx";
import { observer } from "mobx-react";

class Store {
  @observable color: string = "white";

  @action setColor = (color: string) => {
    this.color = color
  }
}
const store: Store = new Store();

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

@observer
class HomeScreen extends React.Component<IProps, null> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      header: null
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: store.color }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component<IProps, { color: string }> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      title: "DetailsScreen"
    };
  }

  state = {
    color: store.color
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ color: text })}
          value={this.state.color}
        />
        <Button
          title="Submit new color"
          onPress={() => {
            store.setColor(this.state.color);
            this.props.navigation.goBack();
          }}
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