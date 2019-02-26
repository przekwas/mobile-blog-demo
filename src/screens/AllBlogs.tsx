import * as React from 'react';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';
import { json } from '../utils/api';

import BlogPreviewCard from '../components/BlogPreviewCard';

interface Props { }
interface State {
    blogs: {
        id: number,
        title: string,
        body: string,
        firstname: string,
        lastname: string,
        _created: Date
    }[];
}

export default class AllBlogs extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        title: "Blogs",
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            blogs: []
        };
    }

    async componentDidMount() {
        try {
            let blogs = await json('https://deployed-blog-demo.herokuapp.com/api/blogs');
            this.setState({ blogs });
        } catch (e) {
            console.log(e);
            Alert.alert("You done messed up, Aaron!");
        }
    }

    renderBlogs() {
        return this.state.blogs.map(blog => {
            return <BlogPreviewCard key={blog.id} blog={blog} />
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderBlogs()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});