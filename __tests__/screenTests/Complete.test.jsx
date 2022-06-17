import { render } from '@testing-library/react-native';
import Complete from '../../screens/todo/Complete';
import { TaskProvider } from '../../hooks/TaskContext';

// mock  functions 
const addToTask = jest.fn();
const task = [{
    id:'aaa',
    isChecked:false,
    name:'go shopping'
},{
    id:'bbb',
    isChecked:true,
    name:'read books'
}];
const removeFromTask = jest.fn();
const toggleCheck = jest.fn();

import renderer from 'react-test-renderer';
it('renders correctly', () => {
    const comp = renderer.create((<TaskProvider >
        <Complete/>
     </TaskProvider>)).toJSON();
    expect(comp).toMatchSnapshot();
});


it('should render component correctly',()=>{
    // will render both checked and unchecked
    const { getByText,getByTestId,queryByText}  = render(
           <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
              <Complete/>
           </TaskProvider>
            );
             
             const completedtask= getByText('read books')
             getByTestId('CompleteScreen')
             expect(completedtask).toHaveStyle({
                textDecorationLine:'line-through'
             })// checked so should have completed style
             expect(queryByText('go shopping')).toBe(null); // should not render incomplete task

})

it('should render empty text component when there is no task',()=>{
    
    const task = [];
    const { getByText,getByTestId}  = render(
           <TaskProvider mock={true} val={{task,addToTask,removeFromTask,toggleCheck}}>
             <Complete/>
           </TaskProvider>
            );
            getByTestId('emptyTask')
            getByText('There is no completed task')

})
