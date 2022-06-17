jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// jest.mock('react-native-uuid');


import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);
import  '@testing-library/jest-native/extend-expect';
import { toBeEmpty, toHaveTextContent,toHaveProp,toHaveStyle} from '@testing-library/jest-native';


expect.extend({ toBeEmpty, toHaveTextContent,toHaveProp,toHaveStyle });




