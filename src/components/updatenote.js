import axios from "axios";
import authHeader from "../services/auth-header";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label,Col,Row } from "reactstrap";
const API_URL = "http://localhost:3001/";
//const accessToken = JSON.parse(localStorage.getItem('user')).token;

//const authAxios = axios.create({
//    baseURL: API_URL,
//    headers: {
//        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
//    },
//});

const UpdateNote = () => {

    const [notes, setNotes] = useState({});
    //const ut = JSON.parse( localStorage.getItem('note')).text;
    useEffect(() => {
        document.title = "Update Notes"

        setNotes({
       "user_id": JSON.parse(localStorage.getItem('user')).data.id,
       "noteId": JSON.parse( localStorage.getItem('note')).noteId
        })

    }, []);

    const navigate = useNavigate();

    const handleForm = (e) => {
        console.log(notes);
        postDataToServer(notes);
        e.preventDefault();
        navigate("/notes");
        window.location.reload();
    };

    //creating function to post data in server
    const postDataToServer = (data) => {
        axios.put(API_URL+`notes/update`, data,{ headers: authHeader() }).then(
            (response) => {
                console.log(response);
                console.log("success");
                localStorage.removeItem('note');
            },
            (error) => {
                console.log(error);
                console.log("error");
            }
        )
    };

    return (
        <Fragment>
            <div>
            <h1 className="text-center">Update Notes</h1>
            <Form onSubmit={handleForm}>
                <FormGroup row>
                    <Label sm={3} for="title"> Title</Label>
                    <Col sm={9}><Input type="text" placeholder="Enter Title here" name="title" id="title" onChange={(e) => { setNotes({ ...notes, title: e.target.value }) }} /></Col>
                </FormGroup >
                <FormGroup row>
                    <Label sm={3} for="text"> Text</Label>
                    <Col sm={9}><Input type="textarea" placeholder="Enter Your Text here" name="text" id="text" onChange={(e) => { setNotes({ ...notes, text: e.target.value }) }} /></Col>
                </FormGroup>
                
                <Container className="text-center">
                    <Row xs="2">
                        <Col  ><Button color="success" type="submit">Update Note</Button></Col>
                        <Col  ><Button color="warning" type="reset">Clear</Button></Col>
                    </Row>
                </Container>
            </Form>
            </div>
        </Fragment>
    );
}

export default UpdateNote;