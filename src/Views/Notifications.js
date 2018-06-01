import React, {Component} from 'react';

class Notifications extends Component {
   constructor(props){
      console.log('constructor', props);
      super(props);
      this.state = {};
   }

   static getDerivedStateFromProps(props, state){
      console.log('getDerivedStateFromProps', props, state);
      return state;
   }

   /*UNSAFE_componentWillMount(){
      console.log('UNSAFE_componentWillMount');
   }*/

   componentDidMount(){
      console.log('componentDidMount');
   }

   shouldComponentUpdate(nextProps, nextState){
      console.log('shouldComponentUpdate', nextProps, nextState);
      return true;
   }

   /*UNSAFE_componentWillReceiveProps(nextProps){
      console.log('UNSAFE_componentWillReceiveProps', nextProps);
   }*/
   
   /*UNSAFE_componentWillUpdate(){
      console.log('UNSAFE_componentWillUpdate');
   }*/

   componentDidUpdate(){
      console.log('componentDidUpdate');
   }

  /* getSnapshotBeforeUpdate(prevProps, prevState){
      console.log('getSnapshotBeforeUpdate');
   }*/

   componentDidCatche(){
      console.log('componentDidCatche');
   }

   componentWillUnmount(){
      console.log('componentWillUnmount');
   }

   render() {
      console.log('render');
      // const items = [
      //    {
      //       term: 'A',
      //       description: 'Letter-A'
      //    },{
      //          term: 'B',
      //          description: 'Letter-B'
      //    },{
      //          term: 'C',
      //          description: 'Letter-C'
      //    },{
      //          term: 'D',
      //          description: 'Letter-D'
      //    }
      // ];

      return(
         <div style={{margin: '10px'}}>
            <h2 style={{display: 'inline-block'}}>Notifications:</h2> <h3 style={{display: 'inline-block'}}>{this.props.message}</h3>
         </div>
            // <dl>
            //     {items.map(item => (
            //         <React.Fragment key={item.id}>
            //             <dt>{item.term}</dt>
            //             <dd>{item.description}</dd>
            //         </React.Fragment>
            //     ))}
            // </dl>
      )
   }
}

export default Notifications;