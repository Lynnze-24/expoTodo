import { render, fireEvent } from '@testing-library/react-native';
import All from '../../screens/todo/All';
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
        <All/>
     </TaskProvider>)).toJSON();
    expect(comp).toMatchSnapshot();
});


it('should render component correctly',()=>{
    // will render both checked and unchecked
    const { getByText,getByTestId}  = render(
           <TaskProvider mock={true} val={{task,addToTask,removeFromTask,toggleCheck}}>
              <All/>
           </TaskProvider>
            );
             const task1= getByText('go shopping')
             const task2= getByText('read books')
             getByTestId('AllScreen')
             expect(task1).not.toHaveStyle({
                textDecorationLine:'line-through'
             }) // not checked so should not have completed style
             expect(task2).toHaveStyle({
                textDecorationLine:'line-through'
             }) // checked so should have completed style

})


it('should render empty text component when there is no task',()=>{

    const task = [];
    const { getByText,getByTestId}  = render(
           <TaskProvider mock={true} val={{task,addToTask,removeFromTask,toggleCheck}}>
              <All/>
           </TaskProvider>
            );
            getByTestId('emptyTask')
            getByText('There is no task')

})
