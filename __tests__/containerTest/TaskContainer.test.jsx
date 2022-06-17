import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native-paper';
import TaskContainer from '../../containers/TaskContainer';
import cusTheme from '../../theme/Theme';
import renderer from 'react-test-renderer';
it('renders correctly', () => {
    const comp = renderer.create((<TaskContainer></TaskContainer>)).toJSON();
    expect(comp).toMatchSnapshot();
});

it('should wrap child components correctly',()=>{
    
    const { getByText,getByTestId}  = render(
           <TaskContainer>
               <Text>Hello</Text>
           </TaskContainer>
           
            );
            getByText('Hello') // testing if child is inside
            const taskCon =   getByTestId('TaskCon')
           expect(taskCon).toHaveStyle({
            backgroundColor:cusTheme.bg,
            flex:1,
            paddingHorizontal:20
          }); // testing if con have correct styles

})
