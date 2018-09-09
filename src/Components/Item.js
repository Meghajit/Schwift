import React from 'react';
import {Card, Icon, Ref} from 'semantic-ui-react';
import {Draggable} from 'react-beautiful-dnd';

const Item = (props) => {
    return (
        <Draggable draggableId = {(props.id).toString()} index = {props.index}>
            {(provided) => (
                <Ref innerRef={provided.innerRef}>
                    <Card {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="board-item">
                        <Card.Content>
                            <Icon name='delete'
                                  onClick={() => props.deleteItem(props.index)}
                                  style={{float: 'right',
                                      marginTop: '-10px',
                                      marginRight: '-10px',
                                      cursor: 'default'
                                  }}
                            />
                            <Card.Header>{props.header}</Card.Header>
                            <Card.Meta>{props.metadata}</Card.Meta>
                            <Card.Description>{props.content}</Card.Description>
                        </Card.Content>
                    </Card>
                </Ref>
            )}
        </Draggable> 
    )
};

export default Item;