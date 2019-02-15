import { createStackNavigator, createAppContainer } from 'react-navigation';

import AllBlogs from './screens/AllBlogs';
import SingleBlog from './screens/SingleBlog';

const AppNavigator = createStackNavigator(
    {
        // screens
        AllBlogs,
        SingleBlog
    },
    {
        //generic styling
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

export default createAppContainer(AppNavigator);