import React from 'react';
import Navbar from "./navbar/Navbar";
import {Routes,Route} from "react-router-dom"
import Items from "../components/Items";
import Users from "../components/Users";
import Collections from "../components/Collections";
import Authors from "../components/Authors";
import CreateCollection from "../components/CreateCollection";
function Home(props) {
    return (
        <div>
            <Navbar/>



            <Routes>
                <Route index element={<Items/>}/>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/collections'} element={<Collections/>}/>
                <Route path={'/authors'} element={<Authors/>}/>
                <Route path={'/create'} element={<CreateCollection/>}/>
            </Routes>

        </div>
    );
}

export default Home;
