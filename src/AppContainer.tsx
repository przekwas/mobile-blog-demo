import * as React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import { Icon } from 'react-native-elements';

import AllBlogs from './screens/AllBlogs';
import SingleBlog from './screens/SingleBlog';
import Login from './screens/Login';
import AuthLoading from './screens/AuthLoading';
import PostBlog from './screens/PostBlog';

const AuthStack = createStackNavigator(
    {
        Login
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#0091ea'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

const BlogStack = createStackNavigator(
    {
        AllBlogs,
        SingleBlog,
    },
    {
        initialRouteName: 'AllBlogs',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#43005B'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }
);

const AppTab = createBottomTabNavigator(
    {
        Blogs: BlogStack,
        New: createStackNavigator(
            {
                PostBlog
            },
            {
                defaultNavigationOptions: {
                    headerStyle: {
                        backgroundColor: '#43005B'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }
            }
        )
    },
    {
        initialRouteName: 'Blogs',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                let { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Blogs') {
                    iconName = 'rss';
                } else if (routeName === 'New') {
                    iconName = 'pencil';
                }
                return (
                    <Icon
                        color={`${tintColor}`}
                        type='font-awesome'
                        name={`${iconName}`}
                        size={25} />
                );
            }
        }),
        tabBarOptions: {
            activeBackgroundColor: '#43005B',
            inactiveBackgroundColor: '#43005B',
            activeTintColor: 'white',
            inactiveTintColor: 'gray'
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        App: AppTab,
        Auth: AuthStack,
        AuthLoading
    },
    {
        initialRouteName: 'AuthLoading',
    }
));