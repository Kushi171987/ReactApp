import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, List,  ListItem, ListItemText, InputLabel, Input } from '@material-ui/core';


class LeftNav extends Component {
	constructor(props){
		super(props);
		this.state = {name: '', items: []};
	}

	handleChange = event => {
		if(event.target) {
			this.setState({ name: event.target.value });
		}
	};

	onPressEnter = (event) => {
      if (event.key === 'Enter') {
         if(this.state.name) {
            let items = this.state.items || [];
            items.push(this.state.name);		
            this.setState({
               items: items,
               name: ''
            });
         }
      }
	}

	render() {
		const { classes } = this.props;
		return (
			<div className='LeftNav'>
				<InputLabel htmlFor="name-simple">Name </InputLabel>
          	<Input id="name-simple" value={this.state.name} onKeyPress={this.onPressEnter} onChange={this.handleChange}/>
				<List className={classes.root} subheader={<li />}>
				{
					this.state.items.length > 0 &&
						this.state.items.map((item, i) => (
							<ListItem key={`item-${item}`}>
								<ListItemText primary={item} onClick={e => {this.props.onClickState(item)}}/>
							</ListItem>
						))
				}
				</List>
      	</div>
		)
	}
}

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.paper,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 800,
	},
	listSection: {
		backgroundColor: 'inherit',
	},
	ul: {
		backgroundColor: 'inherit',
		padding: 0,
	},
});

LeftNav.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftNav);
