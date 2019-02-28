import * as React from 'react';
import { View, StyleSheet, Alert, Picker } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { getUser, json } from '../utils/api';

interface Props extends NavigationInjectedProps { }
interface State {
    title: string;
    content: string;
    selectedTag: number;
    tags: {
        id: number,
        name: string,
        _created: Date
    }[];
}

class BlogForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            selectedTag: 0,
            tags: []
        };
    }

    async componentDidMount() {
        try {
            let tags = await json('https://deployed-blog-demo.herokuapp.com/api/tags');
            this.setState({ tags });
        } catch (e) {
            console.log(e);
            Alert.alert('Error getting tags.')
        }
    }

    private saving: boolean = false;

    async handleSubmit() {

        if (this.saving) return;

        let newBlog = {
            title: this.state.title,
            body: this.state.content,
            authorid: null
        };

        try {
            this.saving = true;

            let { userid } = await getUser();
            newBlog.authorid = userid;

            let result = await json('https://deployed-blog-demo.herokuapp.com/api/blogs', 'POST', newBlog);

            if (result) {
                this.setState({
                    title: "",
                    content: ""
                });
                this.props.navigation.navigate('AllBlogs');
            }

        } catch (e) {
            console.log(e);
            Alert.alert('Error adding blog!');
        } finally {
            this.saving = false;
        }

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
                <View style={styles.containerStyle}>
                    <Text style={styles.ghettoLabel}>Tag</Text>
                    <Picker
                        selectedValue={this.state.selectedTag}
                        onValueChange={(itemValue) => this.setState({ selectedTag: itemValue })}
                    >
                        {this.state.tags.map(tag => (
                            <Picker.Item key={tag.id} label={`${tag.name}`} value={tag.id} />
                        ))}
                    </Picker>
                </View>
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
            </View >
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
    },
    ghettoLabel: {
        marginHorizontal: 1,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#86939e',
        fontFamily: 'sans-serif'
    }
});

export default withNavigation(BlogForm);