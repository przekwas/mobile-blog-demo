import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface Props extends NavigationInjectedProps { }
interface State {
    title: string;
    content: string;
}

class BlogForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            content: ""
        };
    }

    async handleSubmit() {


    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    label="Title"
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    leftIcon={{ type: 'font-awesome', name: 'exclamation', color: '#43005B' }}
                    placeholder="Blog title ..."
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}
                />
                <Input
                    label="Content"
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    multiline
                    numberOfLines={5}
                    leftIcon={{ type: 'font-awesome', name: 'file-text', color: '#43005B' }}
                    placeholder="Blog content ..."
                    value={this.state.content}
                    onChangeText={(text) => this.setState({ content: text })}
                />
                <Button
                    raised
                    title="Submit"
                    containerStyle={{ margin: 10 }}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => this.handleSubmit()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 5,
        marginVertical: 10
    },
    containerStyle: {
        marginVertical: 5,
        padding: 5,
        borderWidth: 2,
        borderColor: '#43005B',
        borderStyle: 'solid',
        borderRadius: 10
    },
    buttonStyle: {
        backgroundColor: '#AE3CD7',
        borderWidth: 2,
        borderColor: '#43005B'
    }
});

export default withNavigation(BlogForm);