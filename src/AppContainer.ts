import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import AllBlogs from './screens/AllBlogs';
import SingleBlog from './screens/SingleBlog';
import Login from './screens/Login';
import AuthLoading from './screens/AuthLoading';

const AppStack = createStackNavigator(
    {
        // screens
        AllBlogs,
        SingleBlog,
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
);

const AuthStack = createStackNavigator(
    {
        Login
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
        AuthLoading
    },
    {
        initialRouteName: 'AuthLoading'
    }
));