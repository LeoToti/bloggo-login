import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// name
// phone
// numberOfPersons
// smoking (boolean)
// dateTime
// specialRequests

// https://striveschool.herokuapp.com/api/reservation without authorization

class Login extends React.Component {

    state = {
        reservation: { // INITIAL STATE
            email: '',
            password: ''
           
        }
    }

    submitReservation = async (e) => {
        // let's prevent the default browser behavior
        e.preventDefault()
        console.log(this.state.reservation)
        try {
            let response = await fetch('',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.reservation),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            // now response holds the result of my operation
            // the ok property of it will tell me if everything went well or not
            if (response.ok) {
                alert('your reservation has been saved correctly')
                this.setState({
                    reservation: { // INITIAL STATE
                        name: '',
                        phone: '',
                        numberOfPersons: 1,
                        smoking: false,
                        dateTime: '',
                        specialRequests: ''
                    }
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                alert('something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = (e) => {
        // e.target.value
        // e.target.id
        let id = e.target.id
        console.log('the field I need to change in the reservation object is', id)
        // id can be "name", "phone", "smoking"
        this.setState({
            reservation: {
                ...this.state.reservation,
                [id]: id === e.target.value
            }
        })
    }

    // DIFFERENCE BETWEEN DOT NOTATION AND SQUARE BRACKETS NOTATION
    // user = {
    //     name: 'Stefano',
    //     role: 'Teacher',
    //     area: {
    //         country: 'Italy',
    //         region: 'FVG'
    //     },
    // }

    // propertyToAccess = 'role'

    // user.role
    // user['role']

    // user.propertyToAccess // undefined
    // user[propertyToAccess] // 'Teacher'

    render() {
        console.log('RESERVATIONFORM GOT RE-RENDERED')
        return (
            // React Fragment, just for wrap multiple elements out of my return statement
            <>
                <h2>Book your table NOW!</h2>
                <Form onSubmit={this.submitReservation}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id="email"
                            value={this.state.reservation.email}
                            // onChange={this.handleChange}
                            onChange={(e) => this.setState({
                                user: {
                                    // I want here to preserve the actual content
                                    // of the reservation object
                                    ...this.state.reservation,
                                    // we're copying every key/value pair from this.state.reservation
                                    // the spread operator will copy over every property
                                    // of this.state.reservation
                                    email: e.target.value
                                }
                            })}
                            type="text"
                            placeholder="Enter mail" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            id="phone"
                            value={this.state.reservation.phone}
                            onChange={this.handleChange}
                            type="number"
                            placeholder="Enter phone" />
                    </Form.Group>
                  
                    <Button
                        variant="info"
                        type="submit">
                        Send reservation
                    </Button>
                </Form>
            </>
        )
    }
}

export default Login