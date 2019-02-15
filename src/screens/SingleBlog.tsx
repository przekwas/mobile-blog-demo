import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { NavigationScreenOptions, NavigationParams } from 'react-navigation';
import { json } from '../utils/api';
import moment from 'moment';

interface Props extends NavigationParams { }
interface State {
    blog: {
        id: number,
        title: string,
        body: string,
        firstname: string,
        lastname: string,
        _created: Date
    };
    tags: {
        name: string
    }[];
}

export default class SingleBlog extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        headerTitle: "Blog Details"
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            blog: {
                id: 0,
                title: "",
                body: "",
                firstname: "",
                lastname: "",
                _created: new Date()
            },
            tags: []
        };
    }

    async componentDidMount() {
        const id = this.props.navigation.getParam('id', 'NO-ID');
        try {
            let blog = await json(`https://deployed-blog-demo.herokuapp.com/api/blogs/${id}`);
            let tags = await json(`https://deployed-blog-demo.herokuapp.com/api/blogtags/${id}`);
            this.setState({ blog, tags });
        } catch (e) {
            console.log(e);
            Alert.alert("You done messed up, Aaron!");
        }
    }

    renderTags() {
        return this.state.tags.map((tag, i) => (
            <Badge
                key={i}
                value={tag.name}
                textStyle={styles.textStyle}
                badgeStyle={styles.badgeStyle} />
        ));
    }

    render() {
        const { title, body, firstname, lastname, _created } = this.state.blog;
        return (
            <View style={styles.container}>
                <Text h2 style={styles.titleStyle}>{title}</Text>
                <Text h4 style={styles.authorStyle}>by {firstname} {lastname}</Text>
                <Text style={styles.dateStyle}>on {moment(_created).format('MMM DD, YYYY')}</Text>
                <View style={styles.tagsContainerStyle}>{this.renderTags()}</View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.bodyTextStyle}>{body}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    titleStyle: {
        marginTop: 15,
        textAlign: 'center',
        color: '#FA6BFF'
    },
    authorStyle: {
        marginTop: 15,
        textAlign: 'center',
        color: '#43005B'
    },
    dateStyle: {
        marginTop: 15,
        marginHorizontal: 20,
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#74FFDE',
        backgroundColor: '#343a40'
    },
    tagsContainerStyle: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    badgeStyle: {
        padding: 15,
        backgroundColor: '#46FFA4',
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'solid'
    },
    textStyle: {
        fontSize: 17,
        color: '#000'
    },
    bodyContainer: {
        marginTop: 25,
        marginHorizontal: 15,
        padding: 5
    },
    bodyTextStyle: {
        color: '#000',
        lineHeight: 25
    }
});