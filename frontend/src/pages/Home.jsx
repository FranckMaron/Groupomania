import React from 'react';
import LeftNav from '../components/LeftNav';
import Log from '../components/Log';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
const token = localStorage.getItem("token")

const Home = () => {
    return (
       <div className="home">
           <LeftNav/>
           <div className="main">
           <div className="home-header">
                {token ? <NewPostForm/> : <Log signin={true} signup={false}/> }
           </div>
               <Thread/>
           </div>
       </div>
    );
};

export default Home;