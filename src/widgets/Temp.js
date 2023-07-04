import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../styles/temp.css"

export default function Temp() {
    //const apiKey = "f56f24967aaf51182d1d4df628297c6d"
    const [inputCity, setInputCity] = useState("")
    const [data, setData] = useState({})


    const getWetherDetails = (cityName) => {
        if (!cityName) return
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=f56f24967aaf51182d1d4df628297c6d"
        axios.get(apiURL).then((res) => {
            console.log("response", res.data)
            setData(res.data)
        }).catch((err) => {
            console.log("err", err)
        })
    }

    const handleChangeInput = (e) => {
        //console.log("value", e.target.value)
        setInputCity(e.target.value)
    }

    const handleSearch = () => {
        getWetherDetails(inputCity)
    }


    return (

        <div className="wetherBg">
            <h1 className="heading">Temperature</h1>

            <div style={{ display: "flex", gap: "3px", marginTop: "4px",marginBottom:"2px" }}>
                <input type="text" className="control"
                    value={inputCity}
                    onChange={handleChangeInput} />
                <button className="btn-search" type="button"
                    onClick={handleSearch}
                >Search</button>
            </div>


            {Object.keys(data).length > 0 &&

                <>
                    <img className="weathorIcon"
                        src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

                    <h5 className="weathorCity">
                        {data?.name}
                    </h5>
                    <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
                </>

            }

        </div>
    );
}