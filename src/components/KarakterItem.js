import React from 'react'
import {Link} from 'react-router-dom';


export default function KarakterItem({karakter:{id,name,status,gender,image}}) {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-3">
                    <img style={{width:100}} src={image} alt={name} />
                </div>
                <div className="col-md-6">
                    <h4>{name}</h4>
                </div>
                <div className="col-md-3">
                    <Link to={`/karakter/${id}`} className="btn btn-primary">
                        Detay
                    </Link>
                </div>
            </div>
        </div>
    )
}
