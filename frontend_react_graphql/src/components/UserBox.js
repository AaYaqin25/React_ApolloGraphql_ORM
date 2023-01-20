import '../styling/all.css'
import React, { useState } from 'react'
import UserList from './UserList';
import UserFormSearch from './UserFormSearch';
import UserFormAdd from './UserFormAdd';

export default function UserBox(props) {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [value, setValue] = useState({})

    const search = () => {
        let result = {
            name,
            phone
        }
        setValue(result)
    }

    const resetSearch = () => {
        setName('')
        setPhone('')
        setValue({})
    }

    const [add, setAdd] = useState({
        isAdd: false
    })

    const handleClickAdd = () => {
        setAdd({
            isAdd: true
        })
    }

    const handleCancelClick = () => {
        setAdd({
            isAdd: false
        });
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="head">
                        <h1>Phone Book Apps</h1>
                    </div>
                </div>
            </div>
            <br />
            <div>
                {
                    add.isAdd ?
                        <div className="card">
                            <div className="card-header">
                                <h5 id='texthead'>Adding Form</h5>
                            </div>
                            <div className="card-body">
                                <UserFormAdd cancel={handleCancelClick} />

                            </div>
                        </div>
                        :
                        <button id='btnadd' className='btn btn-light' onClick={handleClickAdd} ><i className="fas fa-plus"></i> add </button>
                }
            </div>
            <br />

            <div className="card">
                <div className="card-header">
                    <h5 id='texthead'>Search Form</h5>
                </div>
                <div className="card-body">
                    <UserFormSearch search={search} reset={resetSearch} setName={setName} dataName={name} setPhone={setPhone} dataPhone={phone} />
                </div>
            </div>
            <br />
            <UserList searchData={value} />

        </div>
    )
}



