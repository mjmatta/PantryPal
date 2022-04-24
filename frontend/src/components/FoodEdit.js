import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import FoodService from '../services/FoodService';

class FoodEdit extends Component {

    emptyItem = {
        name: '',
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.id === '_add'){
            return
        }else{
            FoodService.getFoodById(this.props.match.params.id).then( (res) =>{
                const f = res.data;
                this.setState({item: f});
            });
        }     
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    };

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        item.id ? FoodService.updateFood(item.id, item).then( () => {}) : FoodService.createFood(item).then( () => {});
        this.props.history.push("/")
    }

    render() {
        const {item} = this.state;
        console.log(item);
        const title = <h2>{item.id ? 'Edit Food' : 'Add Food'}</h2>;

        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                        <Input type="date" name="buyDate" id="buyDate" value={item.buyDate || ''}
                               onChange={this.handleChange}/>
                        <Input type="date" name="expirationDate" id="expirationDate" value={item.expirationDate || ''}
                               onChange={this.handleChange}/>
                        <Input type="select" name="category" id="category" value={item.category || ''} onChange={this.handleChange}>
                            <option>Pantry</option>
                            <option>Fridge</option>
                            <option>Freezer</option>
                        </Input>
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup> */}
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default FoodEdit;