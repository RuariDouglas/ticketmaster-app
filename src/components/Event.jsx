import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Event({ event }) {
  return (
    <Card sx={{ maxWidth: 100 }}>
      <CardMedia
              image={event.images[0].url}
              height="140"
              width="120"
              component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            {event.name}
        </Typography>
      </CardContent>
    </Card>
  );
}