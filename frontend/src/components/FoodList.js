import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import FoodService from '../services/FoodService';

class FoodList extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {food: []};
        //this.remove = this.remove.bind(this);
    }

    componentDidMount() { 
        FoodService.getFood().then((res) => {this.setState({food: res.data})})
    }

    // async remove(id) {
    //     await fetch(`/clients/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(() => {
    //         let updatedClients = [...this.state.clients].filter(i => i.id !== id);
    //         this.setState({clients: updatedClients});
    //     });
    // }

    render() {

        const foods = this.state.food;
        const foodList = foods.map(food => {
            return <tr>
                <td style={{whiteSpace: 'nowrap'}}>{food.name}</td>
                <td>{food.cal}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary">Edit</Button>
                        <Button size="sm" color="danger" /*onClick={() => this.remove(client.id)}*/>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success">Add Food</Button>
                    </div>
                    <h3>Food</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Calories</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {foodList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default FoodList;