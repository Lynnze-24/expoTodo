import { render, fireEvent } from '@testing-library/react-native';
import DeviceTestComponent from '../../testHelpers/DeviceTestComponent';
import {describe} from '@jest/globals';

describe('platform tests', () => {

    let Platform;
    beforeEach(() => {
        Platform = require('react-native').Platform;
    });

    describe('ios tests', () => {
        beforeEach(() => {
            Platform.OS = 'ios';
        });

        it('should return correct values according to Platform',()=>{
    
            const { getByText,queryByText}  = render(
                        <DeviceTestComponent/>
                    );
            getByText('ios')
            expect(queryByText('web')).toBe(null)
            expect(queryByText('android')).toBe(null)
                    // should only have ios value
        })
    });

    describe('android tests', () => {
        beforeEach(() => {
            Platform.OS = 'android';
        });

        it('should return correct values according to Platform',()=>{
    
            const { getByText,queryByText}  = render(
                        <DeviceTestComponent/>
                    );
                    getByText('android')
                    expect(queryByText('web')).toBe(null)
                    expect(queryByText('ios')).toBe(null)
                            // should only have android value
                    
        })
    });
    describe('web tests', () => {
        beforeEach(() => {
            Platform.OS = 'web';
        });

        it('should return correct values according to Platform',()=>{
    
            const { getByText,queryByText}  = render(
                        <DeviceTestComponent/>
                    );
                    getByText('web')
                    expect(queryByText('android')).toBe(null)
                    expect(queryByText('ios')).toBe(null)
                            // should only have web value 
        })
    });

});