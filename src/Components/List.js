import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {Header, Icon, Message, Ref} from 'semantic-ui-react';
import Item from '../Components/Item';

const List = (props) => {
    return (
        <Droppable droppableId={props.id}>
            {(provided) => (
                <Ref innerRef={provided.innerRef}>
                    <Message {...provided.droppableProps}
                             className="board">
                        <Header as='h2' textAlign='center'>{props.id}</Header>
                        <Icon name='add'
                              onClick={() => props.addItem(props.index)}
                              style={{float: 'right', marginTop: '-40px', marginRight: '15px'}}
                        />
                        <Icon name='delete'
                              onClick={() => props.deleteBoard()}
                              style={{float: 'right', marginTop: '-40px', marginRight: '-12px'}}
                        />
                        {props.items.map((item, index) => (
                            <Item index={index}
                                  id={item.id}
                                  key={item.id}
                                  content={item.content}
                                  metadata={item.metadata}
                                  header={item.header}
                                  deleteItem={(itemIndex) => props.deleteItem(props.index, itemIndex)}
                            />
                        ))}
                        {provided.placeholder}
                    </Message>
                </Ref>
            )}
        </Droppable>
    )
};

export default List;