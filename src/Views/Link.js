import { React, Component } from 'react';

const STATUS = {
   HOVERED: 'hovered',
   NORMAL: 'normal',
};

export default class Link extends Component {
   constructor(props) {
      super(props);

      this.state = {
         class: STATUS.NORMAL,
      };
   }

   onMouseEnter = () => {
      this.setState({class: STATUS.HOVERED});
   }

   onMouseLeave = () => {
      this.setState({class: STATUS.NORMAL});
   }

   render() {
      return (
         <a
            className={this.state.class}
            href={this.props.page || '#'}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
         >
            {this.props.children}
         </a>
      );
   }
}
