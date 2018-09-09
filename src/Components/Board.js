import React, {Component} from 'react';
import {Button, Grid, Header, Image} from 'semantic-ui-react';
import {DragDropContext} from 'react-beautiful-dnd'
import data from '../Model/Data';
import List from './List';
import myself from '../image/myself.jpg';
import _ from 'lodash';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: window.localStorage.getItem('schwift_board') ?
                JSON.parse(window.localStorage.getItem('schwift_board'))
                :
                data,
        };
        console.log(this.state.data);
    }

    handleSave = () => {
        window.localStorage.setItem('schwift_board', JSON.stringify(this.state.data));
    };

    handleAddItem = (index) => {
        const {data} = this.state;
        const editedBoard = data.boards[index];
        const itemsArray = data.boards[index].items;
        editedBoard.items.push({
            id: itemsArray.length > 0 ? itemsArray[itemsArray.length-1].id + 1 : 0,
            header: 'Header',
            metadata: 'Metadata',
            content: 'Description',
        });
        data.boards[index] = editedBoard;
        this.setState({data});
    };

    handleDeleteItem = (boardIndex, itemIndex) => {
        const {data} = this.state;
        const editedBoard = data.boards[boardIndex];
        editedBoard.items.splice(itemIndex, 1);
        data.boards[boardIndex] = editedBoard;
        this.setState({data});
    };

    handleAddBoard = () => {
      const {data} = this.state;
      data.boards.push({
          id: data.boards.length > 0 ? data.boards[data.boards.length-1].id + 1 : 0,
          name: 'My New Board',
          items: [],
      });
      this.setState({data});
    };

    handleDeleteBoard = (index) => {
        const {data} = this.state;
        data.boards.splice(index, 1);
        this.setState({data});
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
                _.find(this.state.data.boards, {'name': res.source.droppableId}),
                res.source.index,
                res.destination.index
            );
            boards = this.state.data.boards;
            boards.forEach((board, index) => {
                if (board.name === res.source.droppableId) {
                    boards[index] = result;
                }
            });
        } else {
            const result = this.move(
                _.find(this.state.data.boards, {'name': res.source.droppableId}),
                _.find(this.state.data.boards, {'name': res.destination.droppableId}),
                res.source.index,
                res.destination.index
            );
            boards = this.state.data.boards;
            boards.forEach((board, index) => {
                if (board.name === res.source.droppableId) {
                    boards[index] = result.source;
                } else if (board.name === res.destination.droppableId) {
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
                    <Image floated='right' src={myself} circular/>
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
                    <Grid columns='equal'>
                        {data.boards.map((board, index) => (
                            <Grid.Column key={index}>
                                <List id={board.name}
                                      index={index}
                                      items={board.items}
                                      addItem={this.handleAddItem}
                                      deleteItem={this.handleDeleteItem}
                                      deleteBoard={() => this.handleDeleteBoard(index)}
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