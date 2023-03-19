import React, { useState,useEffect } from "react";
import Note from "./note";
import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:3001/";
//const accessToken = JSON.parse(localStorage.getItem('user')).token;

//const authAxios = axios.create({
//    baseURL: API_URL,
//    headers: {
//        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
//    },
//});

const AllNotes=()=>{

    useEffect(()=>{
        document.title = "All Notes";
        getAllNotesFromServer();
    },[]);

    const getAllNotesFromServer=()=>{
        axios.get(API_URL+`notes/${JSON.parse(localStorage.getItem('user')).data.id}`,{ headers: authHeader() }).then(
        (response)=>{
            console.log(response.data);
            setNotes(response.data.data);
        },
        (error)=>{
            console.log(error);
        }
        )
    }

    const [notes,setNotes] = useState([]);

    const updateNotes=(noteId)=>{
        setNotes(notes.filter((n)=>n.noteId !==noteId));
    }

    return(
        <div>
            <h1>All Notes</h1>
            <p>List of Notes are as follows</p>
            {notes.length > 0 ? 
                notes.map((item)=><Note key = {item.noteId} note = {item} update = {updateNotes}/>) 
                : "No Notes Available"
            }
        </div>
    );
};

export default AllNotes;