import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {Header, Message, Ref} from 'semantic-ui-react';
import Item from '../Components/Item';

const List = (props) => {
    return (
        <Droppable droppableId={props.id}>
            {(provided) => (
                <Ref innerRef={provided.innerRef}>
                    <Message {...provided.droppableProps}
                             className="board">
                        <Header as='h2' textAlign='center'>{props.id}</Header>
                        {props.items.map((item, index) => (
                        <Item index = {index}
                                id = {item.id}
                                key = {item.id}
                                content = {item.content}
                                metadata = {item.metadata}
                                header = {item.header}
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