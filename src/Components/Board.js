import React, {Component} from 'react';
import {Button, Grid, Header, Icon} from 'semantic-ui-react';
import {DragDropContext} from 'react-beautiful-dnd'
import data from '../Model/Data';
import List from './List';
import _ from 'lodash';

const initialState = {
    boards: [],
};

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: window.localStorage.getItem('schwift_board') ?
                JSON.parse(window.localStorage.getItem('schwift_board'))
                :
                data,
        };
    }

    handleSave = () => {
        window.localStorage.setItem('schwift_board', JSON.stringify(this.state.data));
    };

    handleAddItem = (index) => {
        const {data} = this.state;
        const editedBoard = data.boards[index];
        editedBoard.items.push({
            id: new Date().getTime(),
            header: 'Header goes here',
            metadata: 'Insert your metadata here',
            content: 'Put your Description here',
        });
        data.boards[index] = editedBoard;
        this.setState({data});
    };

    handleDeleteItem = (boardIndex, itemIndex) => {
        const {data} = this.state;
        if(data.boards[boardIndex].items.length===1) {
            const editedBoard = data.boards[boardIndex];
            editedBoard.items.splice(itemIndex, 1);
            data.boards[boardIndex] = editedBoard;
        }
        const editedBoard = data.boards[boardIndex];
        editedBoard.items.splice(itemIndex, 1);
        data.boards[boardIndex] = editedBoard;
        this.setState({data});
    };

    handleItemHeaderChange = (e, itemIndex, boardIndex) => {
        const {data} = this.state;
        data.boards[boardIndex].items[itemIndex].header = e.target.value;
        this.setState({data});
    };

    handleItemMetaDataChange = (e, itemIndex, boardIndex) => {
        const {data} = this.state;
        data.boards[boardIndex].items[itemIndex].metadata = e.target.value;
        this.setState({data});
    };

    handleItemContentChange = (e, itemIndex, boardIndex) => {
        const {data} = this.state;
        data.boards[boardIndex].items[itemIndex].content = e.target.value;
        this.setState({data});
    };

    handleAddBoard = () => {
        const {data} = this.state;
        data.boards.push({
            id: new Date().getTime(),
            name: "My New Board",
            items: [],
        });
        this.setState({data});
    };

    handleDeleteBoard = (index) => {
        const {data} = this.state;
        if (data.boards.length===1) {
            this.setState({data: initialState});
        }
        else {
            data.boards.splice(index, 1);
            this.setState({data});
        }
    };

    reorder = (object, sourceIndex, destinationIndex) => {
        let modList = object;
        const [removed] = modList.items.splice(sourceIndex, 1);
        modList.items.splice(destinationIndex, 0, removed);
        return modList;
    };

    move = (sourceList, destList, sourceIndex, destIndex) => {
        let source = sourceList;
        let destination = destList;
        const [removed] = source.items.splice(sourceIndex, 1);
        destination.items.splice(destIndex, 0, removed);
        return {
            source: source,
            destination: destination,
        };
    };

    onDragEnd = (res) => {
        if (!res.destination || !res.source) {
            return;
        }
        let boards = [];
        if (res.source.droppableId === res.destination.droppableId) {
            const result = this.reorder(
                _.find(this.state.data.boards, {'id': parseInt(res.source.droppableId, 10)}),
                res.source.index,
                res.destination.index
            );
            boards = this.state.data.boards;
            boards.forEach((board, index) => {
                if (board.id === res.source.droppableId) {
                    boards[index] = result;
                }
            });
        } else {
            const result = this.move(
                _.find(this.state.data.boards, {'id': parseInt(res.source.droppableId, 10)}),
                _.find(this.state.data.boards, {'id': parseInt(res.destination.droppableId, 10)}),
                res.source.index,
                res.destination.index
            );
            boards = this.state.data.boards;
            boards.forEach((board, index) => {
                if (board.id === res.source.droppableId) {
                    boards[index] = result.source;
                } else if (board.id === res.destination.droppableId) {
                    boards[index] = result.destination;
                }
            });
        }

        this.setState({
            data: {
                ...this.state.data,
                boards: boards,
            }
        });
    };

    render() {
        const {data} = this.state;
        return (
            <div>
                <Header as='h1' textAlign='center' style={{marginBottom: '3%'}}>
                    Schwift
                    <Icon  inverted color='orange' loading name='snowflake' />
                </Header>
                <Button.Group floated='right' style={{marginTop: '-4%', marginRight: '8%'}}>
                    <Button positive size='large'
                            onClick={this.handleAddBoard}>
                        Add Board
                    </Button>
                    <Button color='orange'
                            size='large'
                            onClick={this.handleSave}>
                        Save Schwift
                    </Button>
                </Button.Group>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Grid columns='equal' centered style={{margin:'0px'}}>
                        {data.boards.map((board, index) => (
                            <Grid.Column key={index}>
                                <List style={{textAlign:'center'}}
                                      id={board.id}
                                      name={board.name}
                                      index={index}
                                      items={board.items}
                                      addItem={() => this.handleAddItem(index)}
                                      deleteItem={(itemIndex) => this.handleDeleteItem(index, itemIndex)}
                                      deleteBoard={() => this.handleDeleteBoard(index)}
                                      itemHeaderChange={(e, itemIndex) => this.handleItemHeaderChange(e, itemIndex, index)}
                                      itemMetaDataChange={(e, itemIndex) => this.handleItemMetaDataChange(e, itemIndex, index)}
                                      itemContentChange={(e, itemIndex) => this.handleItemContentChange(e, itemIndex, index)}
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