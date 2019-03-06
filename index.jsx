import React, { PureComponent } from 'react';

import { Helmet } from 'react-helmet';
import moment from 'moment';
import cn from 'classnames';

import {
  Icon,
  Typography,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';


import './styles.scss';
import 'typeface-roboto';

const imageUrl = 'https://lh3.ggpht.com/7apIhjqBCZbAkOjh33DQqPYLZFrZuIgVuy_ekNSQcbE2E65TbLR94O0APo54r8QG0khh=s180-rw';

class Main extends PureComponent {
  static async getInitialProps() {
    const res = await fetch('/api/weather/ru');
    const json = await res.json();
    return { weather: json };
  }

  render() {
    const { summary } = this.props.weather;

    return (
      <div>
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Helmet>

        <Grid className={cn('container')} container spacing={40} justify="center">
          <Grid item md={4} className={cn('card')}>
            <CardMedia
              className={cn('card-media')}
              image={imageUrl}
              title="weather"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" >
                {moment(Date.now()).format('DD.MM.YYYY')}
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                {summary}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                <Icon color="secondary">favorite</Icon>
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Main;
