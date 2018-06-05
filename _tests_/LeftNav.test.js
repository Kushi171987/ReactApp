// import React from 'react';
// import renderer from 'react-test-renderer';
// import LeftNav from '../src/Views/LeftNav'; 

// test('Button Component testing...', () => {
//    const component = renderer.create(
//       <LeftNav> </LeftNav>
//    )
// });


// dependencies
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

// components
import InputForm from './InputForm';

describe('<InputForm />', () => {
  let props, wrapper

  beforeEach(() => {
    props = {
      handleFormSubmit: () => {
      },
    };
    wrapper = shallow(<InputForm {...props} />);
  });

  it('should have a `<form>` element', () => {
    expect(
      wrapper.find('form').length
    ).toBe(1);
  });

  describe('<form />', () => {
    it('`<form>` element should have a onSubmit attribute', () => {
      expect(
        wrapper.props().onSubmit
      ).toBeDefined();
    });

    it('onSubmit attribute should be of type `function`', () => {
      expect(
        typeof wrapper.props().onSubmit === 'function'
      ).toBe(true);
    });

    it('`<form>` element should have an `<input />` element', () => {
      expect(
        wrapper.find('form').childAt(0).type()
      ).toBe('input');
    });

    describe('<input />', () => {

      it('`<input>` element should be of type `text`', () => {
        expect(
          wrapper.find('form').childAt(0).props().type
        ).toBe('text');
      });

      it('`<input>` element should have a placeholder attribute with value `Name`', () => {
        expect(
          wrapper.find('form').childAt(0).props().placeholder
        ).toBe('Name');
      });

      it('`<input>` element value should be empty', () => {
        expect(
          wrapper.find('form').childAt(0).props().value
        ).toBe('');
      });

      it('`<input>` element value should be empty', () => {
        expect(
          wrapper.find('form').childAt(0).props().value
        ).toBe('');
      });

      it('`<input>` element should have an onChange attribute', () => {
        expect(
          wrapper.find('form').childAt(0).props().onChange
        ).toBeDefined();
      });

      it('onChange attribute should be of type `function`', () => {
        expect(
          typeof wrapper.find('form').childAt(0).props().onChange === 'function'
        ).toBe(true);
      });

      it('should update the state when a value is input', () => {
        const name = 'Blerch';
        const input = wrapper.find('form').childAt(0);
        input.simulate('change', {
          target: {
            name: 'name',
            value: name,
          }
        });
        expect(
          wrapper.state().fields.name
        ).toBe(name);
      });

      it('should display an error when no value is input', () => {
        const handleFormSubmit = spy();
        wrapper = mount(<InputForm handleFormSubmit={handleFormSubmit} />);
        wrapper.find('form').simulate('submit');
        expect(
          wrapper.state().fieldErrors.name
        ).toBe('Please enter your name.');
      });

    });

    it('`<form>` element should have an `<p>` element', () => {
      expect(
        wrapper.find('form').childAt(1).type()
      ).toBe('p');
    });

    describe('<p>', () => {
      it('`<p>` element should have a className', () => {
        expect(
          wrapper.find('p').hasClass('error')
        ).toBe(true);
      });

      it('`<p>` element should be null when passed validationError: false', () => {
        expect(
          wrapper.text()
        ).toBe('');
      });

      it('`<p>` element should be `Please enter your name` when passed validationError: true', () => {
        const handleFormSubmit = spy();
        wrapper = mount(<InputForm handleFormSubmit={handleFormSubmit} />);
        wrapper.find('form').simulate('submit');
        expect(
          wrapper.text()
        ).toBe('Please enter your name.');
      });    

    });

    it('`<form>` element should have an `<input type="submit" />` element', () => {
      expect(
        wrapper.find('form').childAt(2).type()
      ).toBe('input');
    });

    describe('<input type="submit" />', () => {
      it('`<input>` element should be of type `submit`', () => {
        expect(
          wrapper.find('form').childAt(2).props().type
        ).toBe('submit');
      });

      it('`<input />` element should have a className', () => {
        expect(
          wrapper.find('form').childAt(2).hasClass('btn')
        ).toBe(true);
      });

      it('`<input />` element should have a value attribute', () => {
        expect(
          wrapper.find('form').childAt(2).props().value
        ).toBe('Submit');
      });

    });

  });

});