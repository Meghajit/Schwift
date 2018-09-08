import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {Container, Ref} from 'semantic-ui-react';
import Item from '../Components/Item';

const List = (props) => {
    return (
        <Droppable droppableId={props.id}>
            {(provided) => (
                <Ref innerRef={provided.innerRef}>
                    <Container>
                        {props.items.mapOf((item, index) => (
                        <Item index = {index} 
                                id = {item.id}
                                key = {item.id} 
                                content = {item.content}
                                metadata = {item.metadata}
                                header = {item.header} 
                            />
                        ))}
                    </Container>
                </Ref>
            )}
        </Droppable>
    )
}

export default List;