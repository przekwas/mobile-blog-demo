import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import AllBlogs from './screens/AllBlogs';
import SingleBlog from './screens/SingleBlog';
import Login from './screens/Login';
import AuthLoading from './screens/AuthLoading';

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

const AppStack = createStackNavigator(
    {
        // screens
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

export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
        AuthLoading
    },
    {
        initialRouteName: 'AuthLoading',
    }
));