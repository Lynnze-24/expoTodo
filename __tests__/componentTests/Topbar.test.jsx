import { render, fireEvent } from '@testing-library/react-native';
import Topbar from '../../components/Topbar';
import { TaskProvider } from '../../hooks/TaskContext';

import { Keyboard} from 'react-native'
jest.mock('react-native-uuid');
import uuid from 'react-native-uuid';
import renderer from 'react-test-renderer';
import {describe} from '@jest/globals';

// mock  functions 
    const addToTask = jest.fn();
    const task = jest.fn();
    const removeFromTask = jest.fn();
    const toggleCheck = jest.fn();
    Keyboard.dismiss = jest.fn();


it('renders correctly', () => {
        const comp = renderer.create((<TaskProvider >
            <Topbar/>
        </TaskProvider>)).toJSON();
        expect(comp).toMatchSnapshot();
});



it('should render component correctly',()=>{
    
    const { getByPlaceholderText,getByTestId}  = render(
           <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
               <Topbar/>
           </TaskProvider>
            );

            getByPlaceholderText('Write a todo');
    getByTestId('plusButton');  // will throw error if there is no child components


})


it('should change text correctly when user types',()=>{
    
    const { getByPlaceholderText}  = render(
           <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
               <Topbar/>
           </TaskProvider>
            );

          const textInput = getByPlaceholderText('Write a todo');
          
           fireEvent.changeText(textInput,'go shopping');
           
           expect(textInput).toHaveProp('value','go shopping');
          
})





describe('when user clicks plus button',()=>{
    it('should show error message if no input',()=>{
    
        const { getByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
                const plusBtn = getByTestId('plusButton');
                const textInput = getByTestId('textInput');
                fireEvent.changeText(textInput,'');
                fireEvent.press(plusBtn);
                getByTestId('errorMessage'); //checking error message is there or not
    
    })
    
    it('should create new todo if input is valid and not show error message',()=>{
        
        const { getByTestId,queryByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
                const plusBtn = getByTestId('plusButton');
                const textInput = getByTestId('textInput');
               
                fireEvent.changeText(textInput,'go shopping');
                fireEvent.press(plusBtn);
               
                let newItem = {
                    id:uuid.v4(),
                    isChecked:false,
                    name:'go shopping'
                }
                
                expect(addToTask).toHaveBeenCalledWith(newItem);
                expect(queryByTestId('errorMessage')).toBe(null); //checking error message is there or not
                
    })

    it('should reset textInput and dismiss keyboard if input is valid ',()=>{
    
        const { getByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
                const plusBtn = getByTestId('plusButton');
                const textInput = getByTestId('textInput');
                fireEvent.changeText(textInput,'go shopping');
                fireEvent.press(plusBtn);
                
                expect(textInput).toHaveProp('value','');
                expect(Keyboard.dismiss).toHaveBeenCalled();
    })
    
    
    
    it('should hide error message after successfully creating new todo',()=>{
        
        const { getByTestId,queryByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
                const plusBtn = getByTestId('plusButton');
                const textInput = getByTestId('textInput');
                fireEvent.changeText(textInput,'');
                fireEvent.press(plusBtn);
                getByTestId('errorMessage'); //invalid input so show error message
                fireEvent.changeText(textInput,'go shopping');
                fireEvent.press(plusBtn);
              
                let newItem = {
                    id:uuid.v4(),
                    isChecked:false,
                    name:'go shopping'
                }
                
                expect(addToTask).toHaveBeenCalledWith(newItem);
                expect(queryByTestId('errorMessage')).toBe(null);   //checking error message is there or not
                
    })
})


describe('when user clicks enter key',()=>{
    it('should show error message if no input',()=>{
    
        const { getByTestId,queryByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
                
                const textInput = getByTestId('textInput');
                
                fireEvent.changeText(textInput,'');
                fireEvent(textInput,'submitEditing');
                queryByTestId('errorMessage'); //checking error message is there or not
    
    })
    
    it('should create new todo if input is valid and not show error message',()=>{
        
        const { getByTestId,queryByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
               
                const textInput = getByTestId('textInput');
               
                fireEvent.changeText(textInput,'go shopping');
                fireEvent(textInput,'submitEditing');
               
                let newItem = {
                    id:uuid.v4(),
                    isChecked:false,
                    name:'go shopping'
                }
                
                expect(addToTask).toHaveBeenCalledWith(newItem);
                expect(queryByTestId('errorMessage')).toBe(null); //checking error message is there or not
                
    })

    it('should reset textInput and dismiss keyboard if input is valid ', ()=>{
    
        const { getByTestId,queryByText}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
                
                const textInput = getByTestId('textInput');
                fireEvent.changeText(textInput,'go shopping');
                fireEvent(textInput,'submitEditing');
                expect(queryByText('go shopping')).toBe(null);
                expect(Keyboard.dismiss).toHaveBeenCalled();
    })
    
    
    
    it('should hide error message after successfully creating new todo',()=>{
        
        const { getByTestId,queryByTestId}  = render(
               <TaskProvider val={{task,addToTask,removeFromTask,toggleCheck}}>
                   <Topbar/>
               </TaskProvider>
                );
                
                const textInput = getByTestId('textInput');
                fireEvent.changeText(textInput,'');
                fireEvent(textInput,'submitEditing');
                queryByTestId('errorMessage'); //invalid input so show error message
                fireEvent.changeText(textInput,'go shopping');
                fireEvent(textInput,'submitEditing');
              
                let newItem = {
                    id:uuid.v4(),
                    isChecked:false,
                    name:'go shopping'
                }
                
                expect(addToTask).toHaveBeenCalledWith(newItem);
                expect(queryByTestId('errorMessage')).toBe(null);   //checking error message is there or not
                
    })
})








