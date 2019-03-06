import React, { PureComponent } from 'react';

import {
  TextField,
  Button,
  Divider,
} from '@material-ui/core';

import 'typeface-roboto';

class Feedback extends PureComponent {
  static async getInitialProps() {
    const res = await fetch('/api/feedback');
    const { feedbacks } = await res.json();

    return { feedbacks };
  }

  constructor(props) {
    super(props);

    this.state = {
      feedbacks: props.feedbacks,
      name: '',
      feedback: '',
    };
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  handleChange(name) {
    return (event) => {
      this.setState({ [name]: event.target.value });
    };
  };

  async sendFeedback(e) {
    e.preventDefault();

    const { name, feedback, feedbacks } = this.state;
    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ name, text: feedback }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const json = await res.json();

    this.setState({ feedbacks: [...feedbacks, json.feedback] });
  }

  render() {
    const { name, feedback, feedbacks } = this.state;
    return (
      <div>
        <fieldset>
          <form action="post" onSubmit={this.sendFeedback}>
            <div>
              <TextField
                label="Name"
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
                fullWidth
              />
            </div>
            <div>
              <TextField
                label="Message"
                value={feedback}
                onChange={this.handleChange('feedback')}
                margin="normal"
                multiline
                fullWidth
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Send
              </Button>
            </div>
          </form>
        </fieldset>
        <Divider variant="inset" />
        <h2>Previus feedbacks:</h2>
        {feedbacks.map(({ id, name, text }) => (
          <div key={id}>
            <h3>{name}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    );
  }
}


export default Feedback;
