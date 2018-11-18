import React from "react";
import img from "../../images/img1.jpeg";

const RestaurantDetailsContent = () => (
    <div className="container">
        <div className="tile is-ancestor">
            <div className="tile is-4 is-vertical is-parent">
                <div className="tile is-child box">
                    <p className="title">Opis lokalu</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque
                        tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                </div>
            </div>
            <div className="tile is-parent">
                <div className="tile is-child box">
                    <img src={img} alt="img"/>
                </div>
            </div>
        </div>
        <div className="tile is-vertical">
            <div className="tile is-child box">
                <p className="title">Kolejny opis</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque
                    tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
            </div>
            <div className="tile is-child box">
                <p className="title">Kolejny opis</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque
                    tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
            </div>
        </div>
    </div>
)

export default RestaurantDetailsContent