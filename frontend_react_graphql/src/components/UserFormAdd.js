import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ALL_USERS, CREATE_USER } from "../graphql/gql";
import { Loading, Alert } from "./Util";

export default function UserFormAdd(props) {
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
        refetchQueries: [
            { query: GET_ALL_USERS }
        ]
    });

    const [user, setUser] = useState({
        name: '',
        phone: ''
    })

    if (loading) return (
        <Loading />
    )

    if (error) return (
        <Alert message={error.stack} />
    )

    console.log(data)
    return (
        <form onSubmit={e => {
            e.preventDefault();
            createUser({ variables: {name: user.name, phone: user.phone} });
            setUser({ name: '', phone: '' })
        }}>
            <div className="row g-1 align-items-center">
                <div className="col-auto">
                    <label htmlFor="name" className="col-form-label">Name</label>
                </div>
                <div className="col-auto">
                    <input type="text" id="name" name='name' className="form-control" placeholder='name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>

                <div className="col-auto">
                    <label htmlFor="phone" className="col-form-label">Phone</label>
                </div>
                <div className="col-auto">
                    <input type="text" id="phone" name='phone' className="form-control" placeholder='phone' value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </div>
                <div className="col-auto">
                    <button id='btnsave' className='btn btn-light' ><i className="fa-regular fa-circle-check"></i> save</button>
                    <button id='btncancel' className='btn btn-light' onClick={props.cancel}><i className="fa-solid fa-ban"></i> cancel</button>
                </div>
            </div>
        </form>
    )
}

