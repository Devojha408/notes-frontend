import React from "react";
import authHeader from "../services/auth-header";
import {
    Card, CardBody, CardTitle, CardSubtitle,
    CardText, CardFooter, Button, Container, Row, Col
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3001/";
//const accessToken = JSON.parse(localStorage.getItem('user')).token;

//const authAxios = axios.create({
//    baseURL: API_URL,
//    headers: {
//        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
//    },
//});

const Note = ({ note, update }) => {

    const deleteNote = (noteId) => {
        axios.delete(API_URL+`notes/${noteId}`, { headers: authHeader() }).then(
            (response) => {
                console.log("Note Deleted"+response);
                update(noteId);
            },
            (error) => {
                console.log("Note Not Deleted"+error);
            }
        )
    };

    return (
        <Card>
            <CardBody className="text-center">
                <CardTitle className="font-weight-bold"><h3>{note.title}</h3></CardTitle>
                <CardText>Your Note: {note.text}</CardText>

                <CardFooter>
                    <Container className="text-center">
                        <Row xs="2">
                            <Col><Button color="warning"><Link to="/noteupdate" onClick={() =>{localStorage.setItem('note', JSON.stringify(note));}} >Update</Link></Button></Col>
                            <Col><Button color="danger" onClick={() => { deleteNote(note.noteId); }} >Delete</Button></Col>
                        </Row>
                    </Container>
                </CardFooter>
            </CardBody>
        </Card>
    );

}

export default Note;