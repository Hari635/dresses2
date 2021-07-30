import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const {email,password}=this.state
        try{
            //there is methiod in auth called signInWithEmailAndPassword
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({ email: '', password: '' })
        }catch(error){
            console.log(error);
        }
        
    }
    
    handelChange=(event)=>{
        const { value,name }=event.target
        this.setState({[name]:value})
        console.log(event);


    }
   // the above handelchange function is used to change both password field and email field bacause event.target gives two 
   // value one is name and another one is value in this file name in input and name in states are same so we do this

    render() {
        return (
            <Container>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name='email' onChange={this.handelChange}  type="email" placeholder="Enter email" value={this.state.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' onChange={this.handelChange}  type="password" placeholder="Password" value={this.state.password} />
                    </Form.Group>
  
                    <Button style={{marginRight:'30px'}}  variant="primary" type="submit">
                        SignIn
  </Button>
 
                    <Button variant="primary" onClick={signInWithGoogle}>
                        SignIn with Google
                        
  </Button>

                
</Form>
            </Container>
        )
    }
}

export default SignIn