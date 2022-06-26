import React,{useState} from 'react'
import './App.css';
import logo from './logo.png'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Karakterler from './Karakterler';
import Karakter from './Karakter';
import Konumlar from './Konumlar';

const client=new ApolloClient({
  uri:'http://localhost:5000/graphql'
})

function App() {
  const [tab,setTab]=useState('karakterler')

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt="Rick and morty" style={{width:300,display:'block',margin:'auto'}} />
          <button className="btn btn-link" onClick={()=>setTab('karakterler')}>Karakterler</button>
          <button className="btn btn-link" onClick={()=>setTab('konumlar')}>Konumlar</button>

          {
            tab=== 'karakterler' ? 
            <Route exact path='/' component={Karakterler} /> :
            <Route exact path='/' component={Konumlar} />
          }

          <Route exact path='/karakter/:id' component={Karakter} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
