import * as React from 'react';
import { View, Image } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './src/logic/RootReducer.js';
import thunk from 'redux-thunk';
import ApplicationHome from "./src/ApplicationHome";
import EStyleSheet from 'react-native-extended-stylesheet';
console.disableYellowBox = true;
import * as Font from 'expo-font';

EStyleSheet.build();

export default class App extends React.Component {
    constructor() {
        super();
        state = {
            fontLoaded: false,
        }
    }
    componentDidMount() {
        Font.loadAsync({
            'cinzel-decor': require('./assets/fonts/CinzelDecorative-Regular.ttf'),
            'inconsolata': require('./assets/fonts/Inconsolata-Regular.ttf'),

        });
    }
    render() {
        return (
            <Provider store={createStore(RootReducer, applyMiddleware(thunk))}>
                <View>
                    <ApplicationHome />
                </View>
            </Provider>
        );
    }
}


