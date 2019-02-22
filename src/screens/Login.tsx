import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { json, SetAccessToken, getUser } from '../utils/api';

interface Props extends NavigationScreenProps { }
interface State {
    email: string;
    password: string;
}

export default class Login extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        headerTitle: "Login"
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    async handleLogin() {
        try {

            let result = await json('https://deployed-blog-demo.herokuapp.com/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });

            if (result) {
                await SetAccessToken(result.token, { userid: result.userid, role: result.role });
                let user = await getUser();
                if(user && user.role === 'admin') {
                    this.props.navigation.navigate('AllBlogs');
                } else {
                    Alert.alert('Invalid Credentials!');
                }
            }

        } catch (e) {
            console.log(e);
            Alert.alert('Problem loggin in?  Contact your admin!');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Input
                        textContentType="emailAddress"
                        containerStyle={{ marginVertical: 5 }}
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })} />
                    <Input
                        secureTextEntry={true}
                        textContentType="password"
                        containerStyle={{ marginVertical: 5 }}
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })} />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        raised
                        title="Login"
                        containerStyle={{ margin: 10 }}
                        buttonStyle={{ backgroundColor: '#AE3CD7' }}
                        onPress={() => this.handleLogin()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});