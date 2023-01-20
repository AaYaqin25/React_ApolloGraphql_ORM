import React from "react";


export default function UserFormSearch(props) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            props.search()
        }}>
            <div className="row g-1 align-items-center">
                <div className="col-auto">
                    <label htmlFor="name" className="col-form-label">Name</label>
                </div>
                <div className="col-auto">
                    <input type="text" id="name" name='name' className="form-control" placeholder='name' value={props.dataName} onChange={(e) => props.setName(e.target.value)} />
                </div>

                <div className="col-auto">
                    <label htmlFor="phone" className="col-form-label">Phone</label>
                </div>
                <div className="col-auto">
                    <input type="text" id="phone" name='phone' className="form-control" placeholder='phone' value={props.dataPhone} onChange={(e) => props.setPhone(e.target.value)} />
                </div>
                <div className="col-auto">
                    <button className='btn btn-primary' ><i className="fa-regular fa-circle-check"></i> search</button>
                    <button className='btn btn-dark' onClick={props.reset} ><i className="fa-solid fa-rotate"></i> reset</button>
                </div>
            </div>
        </form>
    )
}
