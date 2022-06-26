import React,{useState,Fragment} from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import KonumItem from './KonumItem';


const KONUM_QUERY=gql `

    query konumlarQuery($sayfa:Int!){
        konumlar(sayfa:$sayfa){
            id,name,type,dimension
        }
    }
`;

const KONUMBILGI_QUERY=gql `

    query konumlarBilgiQuery($sayfa:Int!){
        konumBilgi(sayfa:$sayfa){
            pages,next,prev
        }
    }
`;

export default function Konumlar() {


    const [sayfa,setSayfa]=useState(2);

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
            
            <h2 className="display-4 my-3">Konumlar</h2>
            <Query query={KONUMBILGI_QUERY} variables={{sayfa}}>
                {
                    ({loading,error,data})=>{
                        return <Fragment>
                            <button className="btn btn-info m-3" onClick={()=>ilkSayfayaGit()}>İlk Sayfa</button>
                            <button className="btn btn-outline-danger m-3" onClick={()=>geriGit(data.konumBilgi.prev)}>Geri Git</button>
                            <button className="btn btn-outline-warning m-3" onClick={()=>ileriGit(data.konumBilgi.next)}>İleri Git</button>
                            <button className="btn btn-info m-3" onClick={()=>sonSayfayaGit(data.konumBilgi.pages)}>Son Sayfa</button>
                        </Fragment>
                    }
                }
            </Query>
            <Query query={KONUM_QUERY} variables={{sayfa}}>
                {
                    ({loading,error,data})=>{
                        if(loading) return <h4>Yükleniyor</h4>
                        if(error) console.log(error);
                        //console.log(data);
                        return <Fragment>
                            {
                               data.konumlar.map(konum=>(
                                   <KonumItem key={konum.id} konum={konum} />
                               )) 
                            }
                        </Fragment>
                    }
                }
            </Query>
        </>
    )
}

