import { createStackNavigator, createAppContainer } from 'react-navigation';

import AllBlogs from './screens/AllBlogs';
import SingleBlog from './screens/SingleBlog';
import Login from './screens/Login';

const AppNavigator = createStackNavigator(
    {
        // screens
        AllBlogs,
        SingleBlog,
        Login
    },
    {
        //generic styling
        initialRouteName: 'Login',
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

export default createAppContainer(AppNavigator);