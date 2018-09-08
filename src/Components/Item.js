import React from 'react';
import {Card, Ref} from 'semantic-ui-react';
import {Draggable} from 'react-beautiful-dnd';

const Item = (props) => {
    return (
        <Draggable draggableId = {(props.id).toString()} index = {props.index}>
            {(provided) => (
                <Ref innerRef={provided.innerRef}>
                    <Card {...provided.draggableProps}
                          {...provided.dragHandleProps}
                            header= {props.header}
                            meta={props.metadata}
                            description={props.content}
                    />
                </Ref>
            )}
        </Draggable> 
    )
};

export default Item;