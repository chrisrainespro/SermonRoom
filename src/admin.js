import React, { useState, useEffect, useContext } from "react"
import { Button, Table } from "react-bootstrap"


export default function Admin(props){

    return (
        <>
        <h1>Catagories</h1>
        <Table>
           <tr>
                <th>Title</th>
                <th>Contains Series</th>
                <th>Edit</th>
                <th>Delete</th>
                
            </tr>

        </Table>
        <Button>Add Category</Button>
        <h1>Series</h1>
        <Table>
           <tr>
                <th>Title</th>
                <th>Category Name</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
             
        </Table>
        <Button>Add Series</Button>
        <h1>Videos</h1>
        <Table>
           <tr>
                <th>Category Name</th>
                <th>Series</th>
                <th>Title</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
             
        </Table>
        <Button>Add Video</Button>
        </>
    )
    
}

