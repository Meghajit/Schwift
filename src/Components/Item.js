import React from 'react';
import {Card} from 'semantic-ui-react';
import {Draggable} from 'react-beautiful-dnd';

const Item = (props) => {
    return (
        <Draggable droppableId = {props.id} index = {props.index}>
            {(provided) => (
                <Ref innerRef={provided.innerRef}>
                    <Card header= {props.header}
                            meta={props.metadata}
                            description={props.content}
                    />
                </Ref>
            )}
        </Draggable> 
    )
}

export default Item;