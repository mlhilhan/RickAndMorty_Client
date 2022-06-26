import React from 'react'
import {Link} from 'react-router-dom';


export default function KonumItem({konum:{id,name,type,dimension}}) {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="text-info">{name}</h4>
                </div>
                <div className="col-md-3">
                    <h4 className="text-success">{type}</h4>
                </div>
                <div className="col-md-3">
                    <h4>{dimension}</h4>
                </div>
            </div>
        </div>
    )
}
