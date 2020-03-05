import React from 'react';
import { Image, Item } from 'semantic-ui-react';

export const Notification = ({ channel, msg }) => (
  <Item>
    <Item.Content>
      <Image
        floated="left"
        size="small"
        src={msg.author.picture}
        avatar
      />
      <Item.Header as="h3">{msg.author.name}</Item.Header>
      <Item.Meta>{channel.title}</Item.Meta>
      <Item.Description>{msg.text}</Item.Description>
    </Item.Content>
  </Item>
);
