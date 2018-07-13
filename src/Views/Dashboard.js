import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Drawer, AppBar, Toolbar, Typography, Divider } from '@material-ui/core';

import LeftNav from './LeftNav';
import Container from './Container';


const drawerWidth = 260;

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   appFrame: {
      height: '100%',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
   },
   appBar: {
         zIndex: theme.zIndex.drawer + 1,
   },
   //   'appBar-left': {
   //     marginLeft: drawerWidth,
   //   },
   'appBar-right': {
      marginRight: drawerWidth,
   },
   drawerPaper: {
      position: 'relative',
      width: drawerWidth,
   },
   toolbar: theme.mixins.toolbar,
   content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 0.1,
   },
});

class Dashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {selectedItem: undefined, anchor: 'left'};
	}

	onSelectState = (item) => {
		this.setState({selectedItem: item});
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

   componentDidCatche(error, info){
      console.log('componentDidCatche', error, info);
   }

   componentWillUnmount(){
      console.log('componentWillUnmount');
   }

   render() {
      const { classes } = this.props;
      const { anchor } = this.state;

      const drawer = (
         <Drawer
            variant="permanent"
            classes={{
               paper: classes.drawerPaper,
            }}
            anchor={anchor}
         >
            <div className={classes.toolbar} />
            <Divider />
            <LeftNav onClickState={this.onSelectState}/> 
         </Drawer>
      );

      return (
         <div className={classes.root}>
            <div className={classes.appFrame}>
               <AppBar
                  position="absolute"
                  className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
               >
                  <Toolbar>
                     <Typography variant="title" color="inherit" noWrap>
                        {this.state.selectedItem || "Title"}
                     </Typography>
                  </Toolbar>
               </AppBar>
               {drawer}
               <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Container item={this.state.selectedItem}/>
               </main>
            </div>
         </div>
      );
   }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);