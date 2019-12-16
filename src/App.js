// Third-party
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

// Custom
import Stepper from './Stepper.js';
import styles from './styles.js';

import './App.css';

const classes = {
  root: {
    padding: styles.theme.spacing(3,2),
    width: '80vw',
    height: '40vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: styles.theme.spacing(2, 2),
  },
  button: {
    margin: styles.theme.spacing(0, 1),
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      step: 0,
      saved: false,
      need: false,
      want: false,
      payment: false,
      large: false,
      thought: false,
    };
  }

  changeView = (step) => {

    const viewProps = [
      {
        text: "Have I saved for it?",
        value: "saved",
      },
      {
        text: "Do I need it?",
        value: "need",
      },
      {
        text: "Do I really want it?",
        value: "want",
      },
      {
        text: "Does it require monthly payments?",
        value: "payment",
      },
      {
        text: "Is this a large expense for me?",
        value: "large",
      },
      {
        text: "Have I thought about it over night?",
        value: "thought",
      },
    ];

    if (step > viewProps.length - 1) {
      this.showEnd();
    } else {
      const view = 
        <>
          <Typography variant="h5" component="h3">
            {viewProps[step].text}
          </Typography>
          <div style={classes.buttonContainer}>
            <Button variant="contained" color="primary" style={classes.button} 
                    onClick={() =>  {
                      let currStep = this.state.step;  
                      this.setState({ 
                        step: currStep+1,
                        [viewProps[step].value]: true,
                      }, () => this.changeView(currStep+1));
                    }}>
              Yes
            </Button>
            <Button variant="contained" color="primary" style={classes.button} 
                    onClick={() => {
                      let currStep = this.state.step;  
                      this.setState({ 
                        step: currStep+1,
                        [viewProps[step].value]: false,
                      }, () => this.changeView(currStep+1));
                    }}>
              No
            </Button>
          </div>
        </>;
      this.setState({ view: view });
    }
  }

  showEnd = () => {
    let buy = false; 

    if (
        this.state.saved && 
        this.state.need && 
        this.state.want && 
        !this.state.payment && 
        ((this.state.large && this.state.thought) || (!this.state.large))
      ) {
        buy = true;
      }
    
    let view = 
      <>
        <Typography variant="h5" component="h3">
          {buy ? "Go ahead and buy it :)" : "No. Don't Buy."}
        </Typography>
        <div style={classes.buttonContainer}>
          <Button variant="contained" color="default" style={classes.button} 
                  onClick={() =>  {
                    this.setState({ step: 0 }, this.changeView(0));
                  }}>
            Start Over
          </Button>
        </div>
      </>;
    this.setState({ view: view });
  }

  render = () => {
    return (
      <div className="App">
        <Paper style={classes.root}>
          {this.state.view === null ? this.changeView(0) : this.state.view}
          <Stepper 
            step={this.state.step} 
          />
        </Paper>
      </div>
    );
  }
}


