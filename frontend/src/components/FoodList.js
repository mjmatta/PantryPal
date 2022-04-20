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
        this.addEmployee = this.addEmployee.bind(this);
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

    remove(id) {
        FoodService.deleteFood(id);
        this.setState({food: this.state.food.filter(food => food.id !== id)});
    }

    addEmployee(){
        this.props.history.push('/myfood/_add');
    }

    render() {

        const foods = this.state.food;
        const foodList = foods.map(food => {
            return <tr>
                <td style={{whiteSpace: 'nowrap'}}>{food.name}</td>
                <td>{food.buy}</td>
                <td>{food.exp}</td>
                <td>{food.cal}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary">Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(food.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" onClick={this.addEmployee}>Add Food</Button>
                    </div>
                    <h3>Food</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="18%">Name</th>
                            <th width="18%">Buy Date</th>
                            <th width="18%">Expiration Date</th>
                            <th width="18%">Calories</th>
                            <th width="28%">Actions</th>
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