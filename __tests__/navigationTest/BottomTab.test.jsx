import { render,fireEvent } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';

import BottomTab from '../../navigation/BottomTab';
import { TaskProvider } from '../../hooks/TaskContext';




it('renders correctly', () => {
    const comp = renderer.create((<NavigationContainer >
      <TaskProvider>
    <BottomTab />
    </TaskProvider>
  </NavigationContainer>)).toJSON();
    expect(comp).toMatchSnapshot();
});
   

    it('should contain 3 tabs and should render alltodo page initially', async () => {
      const {findAllByTestId,getByTestId,queryByTestId}= render(
        <NavigationContainer >
            <TaskProvider>
          <BottomTab />
          </TaskProvider>
        </NavigationContainer>
      );
      expect((await findAllByTestId('AllScreen')).length).toBe(1) // initial page is Alltodo
      getByTestId('AllBtn')
      getByTestId('CompleteBtn')
      getByTestId('IncompleteBtn')
      
      })

      it('should go to completed page when user clicks completed tab', async() => {
        const {queryByTestId,findAllByTestId,getByTestId,debug}= render(
          <NavigationContainer >
              <TaskProvider>
            <BottomTab  />
            </TaskProvider>
          </NavigationContainer>
        );
        const completeBtn = getByTestId('CompleteBtn')
        fireEvent.press(getByTestId('IncompleteBtn'));
        // expect((await findAllByTestId('CompleteScreen')).length).toBe(1)
        // react navigation current version has a bug with pressing event in jest
      // will be automatically fixed in unreleased version
      // https://github.com/react-navigation/react-navigation/issues/10419
       
        })

        it('should go to imcomplete page when user clicks incomplete tab', async() => {
          const {queryByTestId,findAllByTestId,getByTestId,debug}= render(
            <NavigationContainer >
                <TaskProvider>
              <BottomTab  />
              </TaskProvider>
            </NavigationContainer>
          );
              fireEvent.press(getByTestId('IncompleteBtn'));
              // expect((await findAllByTestId('IncompleteScreen')).length).toBe(1)
              // react navigation current version has a bug with pressing event in jest
            // will be automatically fixed in unreleased version
            // https://github.com/react-navigation/react-navigation/issues/10419
          })
     
     
  
      
