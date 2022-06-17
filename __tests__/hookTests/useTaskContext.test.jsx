import { render, fireEvent } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import Topbar from '../../components/Topbar';
import { TaskProvider, useTaskContext } from '../../hooks/TaskContext';
import All from '../../screens/todo/All';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');




it('should be empty for task when initialize', () => {
    const {queryAllByTestId}= render(
    <TaskProvider >
        <Topbar/>
      <All/>
   </TaskProvider>)
    
    expect(queryAllByTestId('task').length).toBe(0)
  });

it('should add new item when user clicks plus button with valid input', () => {
  const {getByTestId,queryAllByTestId}= render(
  <TaskProvider >
      <Topbar/>
    <All/>
 </TaskProvider>)
 const plusBtn = getByTestId('plusButton');
 const textInput = getByTestId('textInput');
 fireEvent.changeText(textInput,'go shopping');
 act(() => {
   
    fireEvent.press(plusBtn);
  });
 expect(queryAllByTestId('task').length).toBe(1)
});

describe('should change behaviour when user clicks delete according to platform', () => {

    let Platform;
    beforeEach(() => {
        Platform = require('react-native').Platform;
    });

    describe('ios tests', () => {
        beforeEach(() => {
            Platform.OS = 'ios';
        });

        it('should open alertBox in ios', async() => {
            const initialArr = [{
                id:'aaa',
                isChecked:false,
                name:'go shopping'
            }];
            const {getByTestId,queryAllByTestId,queryByText,getByText}= render(
            <TaskProvider mock={initialArr } >
               
              <All mock={true}/>
           </TaskProvider>)
            expect(queryAllByTestId('task').length).toBe(1)
           const deleteBtn = getByTestId('delete')
           fireEvent.press(deleteBtn)
           expect(Alert.alert).toHaveBeenCalled()
          });
        
        
        
    });

    describe('android tests', () => {
        beforeEach(() => {
            Platform.OS = 'android';
        });

        it('should open alertBox in android', async() => {
            const initialArr = [{
                id:'aaa',
                isChecked:false,
                name:'go shopping'
            }];
            const {getByTestId,queryAllByTestId,queryByText}= render(
            <TaskProvider mock={initialArr } >
               
              <All mock={true}/>
           </TaskProvider>)
            expect(queryAllByTestId('task').length).toBe(1)
           const deleteBtn = getByTestId('delete')
           fireEvent.press(deleteBtn)
           expect(Alert.alert).toHaveBeenCalled()
           
          });
        
        
        
    });
    describe('should delete directly in web', () => {
        beforeEach(() => {
            Platform.OS = 'web';
        });

        it('should delete directly in web', async() => {
            const initialArr = [{
                id:'aaa',
                isChecked:false,
                name:'go shopping'
            }];
            const {getByTestId,queryAllByTestId,debug}= render(
            <TaskProvider mock={initialArr } >
               
              <All mock={true}/>
           </TaskProvider>)
            
           const deleteBtn = getByTestId('delete')
           fireEvent.press(deleteBtn)
           expect(queryAllByTestId('task').length).toBe(0)
          });
        
        
        
    });

});

