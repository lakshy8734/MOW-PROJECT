import React from 'react';
import style from './Shareit.module.css';
import {
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaFacebook,
} from 'react-icons/fa';

function Shareit() {
  return (
    <div>
      <section data-aos="fade-up" className={`${style.link} ${style.dark}`}>
        <a href="https://www.facebook.com/myotakuworld/" className={style.tooltip}>
          <div style={{ color: '#1877f2' }}>
            <FaFacebook />
            <span className={style.tooltiptext}>Facebook</span>
          </div>
        </a>
        <a href="https://www.pinterest.com/myotakuworld/" className={style.tooltip}>
          <div style={{ color: '#bd081c' }}>
            <FaPinterest />
            <span className={style.tooltiptext}>Pinterest</span>
          </div>
        </a>
        <a href="https://www.instagram.com/myotakuworld/" className={style.tooltip}>
          <div style={{ color: '#c13584' }}>
            <FaInstagram />
            <span className={style.tooltiptext}>Instagram</span>
          </div>
        </a>
        <a href="https://www.youtube.com/channel/UCrMFWL5maGeVBYwwXuq5HMA" className={style.tooltip}>
          <div style={{ color: '#ff0000' }}>
            <FaYoutube />
            <span className={style.tooltiptext}>YouTube</span>
          </div>
        </a>
      </section>
    </div>
  );
}

export default Shareit;
