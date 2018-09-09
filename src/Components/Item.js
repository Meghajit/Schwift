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
                                       value={props.header}
                                       onChange={(e) => props.itemHeaderChange(e,props.index)}
                                />
                            </Card.Header>
                            <Card.Meta>
                                <Input transparent
                                       value={props.metadata}
                                       onChange={(e) => props.itemMetaDataChange(e,props.index)}
                                />
                            </Card.Meta>
                            <Card.Description>
                                <Input transparent
                                       value={props.content}
                                       onChange={(e) => props.itemContentChange(e,props.index)}
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