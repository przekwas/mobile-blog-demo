import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';

import BlogForm from '../components/BlogForm';

interface Props { }
interface State { }

export default class PostBlog extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        title: 'Write A Blog'
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <BlogForm />
            </View>
        );
    }
}