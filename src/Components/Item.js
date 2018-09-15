import React from 'react';
import {Card, Icon, Input, Ref} from 'semantic-ui-react';
import {Draggable} from 'react-beautiful-dnd';

const Item = (props) => {
    return (
        <Draggable draggableId = {(props.id).toString()} index = {props.index}>
            {(provided) => (
                <Ref innerRef={provided.innerRef}>
                    <Card {...provided.draggableProps}
                          {...provided.dragHandleProps}
                            fluid
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
                            <Card.Header>
                                <Input transparent
                                       style={{width: '-webkit-fill-available'}}
                                       value={props.header}
                                       onChange={props.itemHeaderChange}
                                />
                            </Card.Header>
                            <Card.Meta>
                                <Input transparent
                                       style={{width: '-webkit-fill-available'}}
                                       value={props.metadata}
                                       onChange={props.itemMetaDataChange}
                                />
                            </Card.Meta>
                            <Card.Description>
                                <Input transparent
                                       style={{width: '-webkit-fill-available'}}
                                       value={props.content}
                                       onChange={props.itemContentChange}
                                />
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Ref>
            )}
        </Draggable> 
    )
};

export default Item;