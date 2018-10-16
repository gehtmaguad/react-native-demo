# react-native demo

## Get started

* install expo-cli

  ```bash
  markus@marho:~$ npm install -g expo-cli
  ```

* install node if you haven\'t yet (for example via nvm)
  ```bash 
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
  nvm install node
  ```
* scaffold a new react-native project with expo
  ```bash
  markus@marho:~$expo init
  ? Choose a project name: react-native-demo
  ? Choose a template: blank
  [11:35:41] Extracting project files...
  [11:35:42] Customizing project...
  Your project is ready at /home/markus/react-native-demo
  To get started, you can type:
  
  cd react-native-demo
  expo start
  ```

* cd into this folder
  ```bash
  markus@marho:~$ cd react-native-demo
  ```

* start expo client

  ```bash 
  markus@marho:~$ expo start
  ```

## Add typescript

* add typescript and react-native-typescript-transformer as dev dependency

  ```bash
  yarn add --dev typescript react-native-typescript-transformer
  ```

* add typings

  ```bash
  yarn add --dev @types/react
  ```

* add tsconfig.json with minimal config

  ```
  {
      "compilerOptions": {
          "target": "es2015",
          "module": "es2015",
          "jsx": "react-native",
          "moduleResolution": "node",
          "allowSyntheticDefaultImports": true
      }
  }
  ```

* reference the file in the packager options of the expo config in app.json

  ```
      "packagerOpts": {
        "sourceExts": [
          "ts",
          "tsx"
        ],
        "transformer": "node_modules/react-native-typescript-transformer/index.js"
      },
  ```

* add App.tsx

  ```
  import React from 'react';
  import {
    Text,
    View
  } from 'react-native';
  
  export default class App extends React.Component {
  
    render() {
      return (
        <View>
          <Text>
            Hello
            </Text>
        </View>
      )
    }
  
  }
  ```

* Modify App.js to reference App.tsx

  ```
  import App from './src/App'
  export default App
  ```

## Add react-navigation

* Add dependency

  ```
  yarn add react-navigation
  ```

* Create a stack navigator and a screen component

  ```
  import React from 'react';
  import { View, Text } from 'react-native';
  import { createStackNavigator } from 'react-navigation';
  
  class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      );
    }
  }
  
  export default createStackNavigator({
    Home: {
      screen: HomeScreen
    },
  });
  ```

* Add a second screen component and handling navigation between those two screens

```
import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, NavigationScreenProp } from 'react-navigation';

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
```

## Add state management with mobx

* Add dependencies

  ```
  yarn add mobx mobx-react
  ```

* Set experimentalDecorators to true in tsconfig.json

  ```
          "experimentalDecorators": true,
  ```

* Setup a store

  ```
  class Store {
    @observable color: string = "white";
  
    @action setColor = (color: string) => {
      this.color = color
    }
  }
  const store: Store = new Store();
  ```

* Interact with the store from the DetailsScreen

  ```
    state = {
      color: store.color
    };
  ```

  ```
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState({ color: text })}
            value={this.state.color}
          />
  ```

* Interact with the store from the HomeScreen

  ```
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: store.color }}>
  ```

* For the full source code take a look into this repo.

## Create your apk or ipa

* Configure app.json: add android and ios part

  ```
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "demo.react.native",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "demo.react.native",
      "versionCode": 1
    }
  ```
* Start the build for android
    ```
    expo build:android
    ```

* Start the build for ios
    ```
    expo build:android
    ```

## Submit it to the store

* This task is not automated yet - so apk or ipa file must be uploaded to the store by yourself.
