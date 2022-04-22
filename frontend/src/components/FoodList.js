import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import FoodService from '../services/FoodService';

class FoodList extends Component {

    constructor(props) {
        super(props);
        this.state = {food: []};
        //this.remove = this.remove.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount() { 
        FoodService.getFood().then((res) => {this.setState({food: res.data}, () => {console.log(this.state.food)})});
    }

    remove(id, category) {
        var i = 0;
        switch(category) {
            case "Pantry":
                i=0;
                break;
            case "Fridge":
                i=1;
                break;
            case "Freezer":
                i=2;
                break;
        }
        FoodService.deleteFood(id);
        console.log("Deleting food " + category);
      //  this.setState({food: this.state.food.filter(food => food.id !== id)});
        this.setState(() => {

            var newState = []
            for (let j = 0; j < 3; j++) {
                if(i == j) {
                    newState.push(this.state.food[j].filter(f => f.id !== id));
                } else {
                    newState.push(this.state.food[j]);
                }
            }
            this.setState({food: newState});
        });
    }

    addEmployee(){
        this.props.history.push('/myfood/_add');
    }

    edit(i) {
        this.props.history.push('/myfood/' + i)
    }

    render() {
        
        const foods = this.state.food;
        console.log(foods)
        var pantryList = null;
        var fridgeList = null;
        var freezerList = null;
        if(!(foods[0] === undefined || foods[0].length == 0)) {
            pantryList = foods[0].map(food => {
                    return <tr>
                        <td style={{whiteSpace: 'nowrap'}}>{food.name}</td>
                        <td>{food.buyDate}</td>
                        <td>{food.expirationDate}</td>
                        <td>{food.calories}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" color="primary" onClick={() => this.edit(food.id)}>Edit</Button>
                                <Button size="sm" color="danger" onClick={() => this.remove(food.id, food.category)}>Delete</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
            });
        }
        if(!(foods[1] === undefined || foods[1].length == 0)) {
            fridgeList = foods[1].map(food => {
                return <tr>
                    <td style={{whiteSpace: 'nowrap'}}>{food.name}</td>
                    <td>{food.buyDate}</td>
                    <td>{food.expirationDate}</td>
                    <td>{food.calories}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" onClick={() => this.edit(food.id)}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(food.id, food.category)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            });
        }  
        if(!(foods[2] === undefined || foods[2].length == 0)) {
            freezerList = foods[2].map(food => {
                return <tr>
                    <td style={{whiteSpace: 'nowrap'}}>{food.name}</td>
                    <td>{food.buyDate}</td>
                    <td>{food.expirationDate}</td>
                    <td>{food.calories}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" onClick={() => this.edit(food.id)}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(food.id, food.category)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            });
        }

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" onClick={this.addEmployee}>Add Food</Button>
                    </div>
                    <h3>Your Food</h3>
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
                        <h4>Pantry</h4>
                        {pantryList}
                        <h4>Fridge</h4>
                        {fridgeList}
                        <h4>Freezer</h4>
                        {freezerList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default FoodList;