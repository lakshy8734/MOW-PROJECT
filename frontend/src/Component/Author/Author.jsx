import React from 'react'
import Img from '../../assets/Default.webp'
import style from './Author.module.css'

function Author({ profilePicture, bio }) {
    return (
        <div className={style.author}>
            <h2 className={style.title}>About the Author</h2>

            <div className={style.authimg}>
                <img src={profilePicture} alt="" />
            </div>

            <p>
                {bio}
            </p>

            
        </div >
    )
}

export default Author