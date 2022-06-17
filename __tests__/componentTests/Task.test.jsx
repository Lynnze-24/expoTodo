import { render, fireEvent } from '@testing-library/react-native';
import { TaskProvider } from '../../hooks/TaskContext';

import Task from '../../components/Task';
import renderer from 'react-test-renderer';
import {describe} from '@jest/globals';



// mock  functions 
    const addToTask = jest.fn();
    const task = jest.fn();
    const removeFromTask = jest.fn();
    const toggleCheck = jest.fn();

it('renders correctly', () => {
        const comp = renderer.create((<TaskProvider >
             <Task mock={true} name={'go shopping'} isChecked={true} id={'aaa'} key={'aaa'}/>
        </TaskProvider>)).toJSON();
        expect(comp).toMatchSnapshot();
});

it('should render all child components',()=>{
    
        const { getByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                    <Task mock={true} name={'go shopping'} isChecked={true} id={'aaa'} key={'aaa'}/>
               </TaskProvider>
                );
        getByTestId('checkbox')
        getByTestId('todoText')
        getByTestId('delete')
})

it('should render childs correctly according to props',()=>{
   
    
    const {queryByTestId}  = render(
           <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
               <Task mock={true} name={'go shopping'} isChecked={true} id={'aaa'} key={'aaa'}/>
           </TaskProvider>
            );

        // checkbox
            
      expect(queryByTestId('checkbox')).toHaveProp('accessibilityState',{
          checked:true,
          disabled:false
      });  // ischecked is true so accessibilityState.checked should be true
      expect(queryByTestId('todoText')).toHaveTextContent('go shopping') 
      expect(queryByTestId('todoText')).toHaveStyle({
                                             textDecorationLine:'line-through'
                                        }) // should have completed text style since it is checked
});

it('should toggle check when click checkbox',()=>{
    
    const { getByTestId}  = render(
           <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                <Task mock={true} name={'go shopping'} isChecked={true} id={'aaa'} key={'aaa'}/>
           </TaskProvider>
            );
    const checkbox = getByTestId('checkbox')
    fireEvent.press(checkbox);
    expect(toggleCheck).toHaveBeenCalledWith('aaa')
   
})





describe('platform tests', () => {

    let Platform;
    beforeEach(() => {
        Platform = require('react-native').Platform;
    });

    describe('ios tests', () => {
        beforeEach(() => {
            Platform.OS = 'ios';
        });

        it('should use correct function according to Platform',()=>{
    
            const { getByTestId}  = render(
                   <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                        <Task mock={true} name={'go shopping'} isChecked={true} id={'aaa'} key={'aaa'}/>
                   </TaskProvider>
                    );
                    fireEvent.press( getByTestId('delete'))
                             
                    expect(removeFromTask).not.toHaveBeenCalledWith('aaa');
        })
    });

    describe('android tests', () => {
        beforeEach(() => {
            Platform.OS = 'android';
        });

        it('should use correct function according to Platform',()=>{
    
            const { getByTestId}  = render(
                   <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                        <Task mock={true} name={'go shopping'} isChecked={true} id={'aaa'} key={'aaa'}/>
                   </TaskProvider>
                    );
                    
          
                    fireEvent.press( getByTestId('delete'))
                             
                    expect(removeFromTask).not.toHaveBeenCalledWith('aaa');
        })
    });

    describe('web tests', () => {
        beforeEach(() => {
            Platform.OS = 'web';
        });

        it('should use correct function according to Platform',()=>{
    
            const { getByTestId}  = render(
                   <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                        <Task mock={true} name={'go shopping'} isChecked={true} id={'aaa'} key={'aaa'}/>
                   </TaskProvider>
                    );
                   
          
                    fireEvent.press(getByTestId('delete'))
                             
                    expect(removeFromTask).toHaveBeenCalledWith('aaa');
        })
    });

});