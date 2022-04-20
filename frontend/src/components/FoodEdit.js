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
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     if(this.state.id === '_add'){
    //         return
    //     }else{
    //         FoodService.getEmployeeById(this.state.id).then( (res) =>{
    //             let employee = res.data;
    //             this.setState({firstName: employee.firstName,
    //                 lastName: employee.lastName,
    //                 emailId : employee.emailId
    //             });
    //         });
    //     }     
    // }

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
    
        // await fetch('/clients' + (item.id ? '/' + item.id : ''), {
        //     method: (item.id) ? 'PUT' : 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(item),
        // });
        // this.props.history.push('/clients');
        console.log(item);
        FoodService.createFood(item)
        this.props.history.push("/")
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;

        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
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