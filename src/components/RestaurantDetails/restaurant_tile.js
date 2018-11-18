import React from 'react'
import img from "../../images/img1.jpeg";
import { Link } from 'react-router-dom'

const RestauranTile = ({ restaurantName }) => (
    <div className="container">
        <div className="box">
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-danger">
                            <img src={img} alt="mcdonalds"/>
                        </article>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-danger">
                        <div className="content">
                            <h2>{restaurantName}</h2>
                            <h3>Godziny otwarcia</h3>
                            <h3>Adres</h3>
                            <Link className='button' to={`/restaurant/${restaurantName}`}>Szczegóły</Link>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
)

export default RestauranTile