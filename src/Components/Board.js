import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import {DragDropContext} from 'react-beautiful-dnd'
import data from '../Model/Data';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
        }
    }

    onDragEnd = (res) => {
        console.log(res);
    }

    render() {
        const {data} = this.state;
        console.log(data);
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Grid columns='equal'>
                        {data.boards.map((board) => (
                            <Grid.Column>
                               <Board id={board.id}
                                    items={board.items} 
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </DragDropContext>
            </div>
        )
    }
}

export default Board;