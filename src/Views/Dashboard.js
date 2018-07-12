import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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