import { render, fireEvent } from '@testing-library/react-native';
import EmptyTask from '../../components/EmptyTask';
import renderer from 'react-test-renderer';


it('renders correctly', () => {
        const comp = renderer.create(<EmptyTask/>).toJSON();
        expect(comp).toMatchSnapshot();
});

it('should render all child components',()=>{
    
    const { getByText,getByTestId}  = render(
        <EmptyTask text='hello'/>
            );
    getByTestId('emptyTask')
    getByText('hello')
})