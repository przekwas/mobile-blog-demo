import * as React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
    AsyncStorage,
} from 'react-native';
import { getAccessToken } from '../utils/api';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps { }
interface State { }

export default class AuthLoadingScreen extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.testAccessToken();
    }

    async testAccessToken() {
        try {
            let token = await getAccessToken();
            this.props.navigation.navigate(token ? 'App' : 'Auth');
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}