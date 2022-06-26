import React,{useState,Fragment} from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import KarakterItem from './KarakterItem';


const KARAKTER_QUERY=gql `

    query karakterlerQuery($sayfa:Int!){
        karakterler(sayfa:$sayfa){
            id,name,gender,status,image
        }
    }
`;

const KARAKTERBILGI_QUERY=gql `

    query karakterlerBilgiQuery($sayfa:Int!){
        karakterBilgi(sayfa:$sayfa){
            pages,next,prev
        }
    }
`;

export default function Karakterler() {


    const [sayfa,setSayfa]=useState(1);

    const ilkSayfayaGit=()=>{
        setSayfa(1);
    }

    const geriGit=(prev)=>{

        if(prev !=null){
            setSayfa(sayfa-1)
        }
    }

    const ileriGit=(next)=>{

        if(next !=null){
            setSayfa(sayfa+1)
        }
    }

    const sonSayfayaGit=(pages)=>{
        setSayfa(pages);
    }



    return (
        <>
            
            <h2 className="display-4 my-3">Karakterler</h2>
            <Query query={KARAKTERBILGI_QUERY} variables={{sayfa}}>
                {
                    ({loading,error,data})=>{
                        return <Fragment>
                            <button className="btn btn-info m-3" onClick={()=>ilkSayfayaGit()}>İlk Sayfa</button>
                            <button className="btn btn-outline-danger m-3" onClick={()=>geriGit(data.karakterBilgi.prev)}>Geri Git</button>
                            <button className="btn btn-outline-warning m-3" onClick={()=>ileriGit(data.karakterBilgi.next)}>İleri Git</button>
                            <button className="btn btn-info m-3" onClick={()=>sonSayfayaGit(data.karakterBilgi.pages)}>Son Sayfa</button>
                        </Fragment>
                    }
                }
            </Query>
            <Query query={KARAKTER_QUERY} variables={{sayfa}}>
                {
                    ({loading,error,data})=>{
                        if(loading) return <h4>Yükleniyor</h4>
                        if(error) console.log(error);
                        //console.log(data);
                        return <Fragment>
                            {
                               data.karakterler.map(karakter=>(
                                   <KarakterItem key={karakter.id} karakter={karakter} />
                               )) 
                            }
                        </Fragment>
                    }
                }
            </Query>
        </>
    )
}
