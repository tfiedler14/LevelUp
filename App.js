import * as React from 'react';
import { View, Image } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './src/logic/RootReducer.js';
import thunk from 'redux-thunk';
import ApplicationHome from "./src/ApplicationHome";
import EStyleSheet from 'react-native-extended-stylesheet';
console.disableYellowBox = true;

EStyleSheet.build();

export default function App() {
    return (
        <Provider store={createStore(RootReducer, applyMiddleware(thunk))}>
            
                <View>
                    <ApplicationHome />
                </View>
            
        </Provider>
    );
}
