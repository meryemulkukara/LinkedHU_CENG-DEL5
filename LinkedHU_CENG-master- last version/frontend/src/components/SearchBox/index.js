import React from 'react'
import { useState } from "react"

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import {search} from '../../common/methods';

import "./search-box.css";


const SearchBox = () => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = async (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        
        if (searchWord.length > 0) {
            const res = await search({search: searchWord});

            //remove empty objects
            const resultData = res.filter(item => Object.keys(item).length > 0);
    
              if(res.length > 0) {
                const filtered = resultData.map
                ((item) => {
                    return {
                        id: item.id,
                        fullname: item.firstname + " " + item.lastname
                    }
                });

                setFilteredData(filtered);

            }
            else {
                setFilteredData([]);
            }



    }
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };






    return (

        <div className="search">
            <div className="search-inputs">
                <input
                type="text"
                placeholder={"Search Users"}
                value={wordEntered}
                onChange={handleFilter}
                className="search-input"
                />
                <div className="search-icon">
                {filteredData.length === 0 ? (
                    <SearchIcon />
                ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                )}
                </div>
            </div>
        {filteredData.length !== 0 && (
            <div className="data-result">
                <h3 style={{color: "black"}}>Result</h3>
                {filteredData.slice(0, 15).map((item) => {

                    return (
                        <a href={`/profile/${item.id}`} className="data-result-item" key={item.id}>
                            {item.fullname}
                        </a>
                        
                    );
                })}
            </div>
        )}
        </div>
    );


    }

export default SearchBox;