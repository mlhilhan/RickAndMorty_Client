import React, { Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link, useParams } from 'react-router-dom'


const KARAKTER_QUERY = gql`
    query karakterQuery($id:Int!){
        karakter(id:$id){
            id,name,gender,status,image
        }
    }
`;


export default function Karakter() {

    let params = useParams();
    let id = parseInt(params.id)

    return (
        <div>
            <Query query={KARAKTER_QUERY} variables={{ id }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Yükleniyor</h4>
                        if (error) console.log(error);
                        
                        // console.log(data);

                        const {name,status,image,gender}=data.karakter;
                        return <Fragment>
                            {
                                    <div className="card card-body mb-3">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img style={{ width: 100 }} src={image} alt={name} />
                                            </div>
                                            <div className="col-md-5">
                                                <h4>{name}</h4>
                                            </div>
                                            <div className="col-md-2">
                                                {gender}
                                            </div>
                                            <div className="col-md-2">
                                                {status}
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6 mt-3">
                                                <Link to={`/`} className="btn btn-primary"> 
                                                    Geri
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                   
                            }
                        </Fragment>
                    }
                }
            </Query>
        </div>
    )
}
