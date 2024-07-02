import style from "./Blogs.module.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Load from "../../Component/Load/Load";
import Shareit from "Component/Shareit/Shareit";

import {
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaFacebook,
} from "react-icons/fa";
import Link from "Component/Link/Link";
import Aos from "aos";
import "aos/dist/aos.css";

import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Blogs() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 12; // Set the number of blogs per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Get the blogs for the current page
  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const publishedBlogs = response.data.filter((blog) => blog.publish);
        setBlogs(publishedBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleContinueReading = async (blogId, slug) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/view`
      );
      navigate(`/${slug}`, { state: { blogId: blogId } });
    } catch (error) {
      console.error("Failed to increment view count", error);
    }
  };

  // Function to remove HTML tags from a string
  const stripHtmlTags = (content) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    return doc.body.textContent || "";
  };

  // Function to truncate content without HTML tags
  const truncateContent = (content) => {
    const maxLength = 80; // Adjust as needed for two lines
    const plainTextContent = stripHtmlTags(content);
    if (plainTextContent.length > maxLength) {
      return plainTextContent.substring(0, maxLength) + ".....";
    }
    return plainTextContent;
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const [submenus, setSubmenus] = useState({
    Recommendations: false,
    News: false,
    Gaming: false,
    Browse: false,
    More: false,
  });

  if (loading) return <Load />;

  return (
    <div>
      <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
        <Navbar />
      </div>

      <div className={style.banner}>
        <h2>MOW</h2>
        <TypeAnimation
          data-aos="fade-up"
          sequence={["NEWS", 2000, "GAMING", 2000, ""]}
          speed={30}
          repeat={Infinity}
          className={style.textanimation}
        />
              
      </div>

      <div className={style.cards}>
        {currentBlogs.map((blog) => (
          <div key={blog.blogId} data-aos="fade-up" className={style.card}>
            <div style={{ overflow: "hidden" }}>
              <div
                className={style.bg}
                style={{ backgroundImage: `url(${blog.mediaUrl})` }}
              ></div>
            </div>
            <div className={style.content}>
              <h6>{blog.title}</h6>
              <p>{truncateContent(blog.content)}</p>
            </div>
            <h5
              className={style.continueReading}
              onClick={() => handleContinueReading(blog.blogId, blog.slug)}
            >
              Continue reading...
            </h5>
          </div>
        ))}
      </div>

      <div className={style.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          &larr;
        </button>
        <span className={style.pageIndicator}>{currentPage} </span>...
        <span className={style.pageIndicator}>{totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          &rarr;
        </button>
      </div>

      <Shareit/>

      {/* <section data-aos="fade-up" className={style.link}>
        <a
          href="https://www.facebook.com/myotakuworld/"
          className={style.tooltip}
        >
          <div style={{ color: "#1877f2" }}>
            <FaFacebook />
            <span className={style.tooltiptext}>Facebook</span>
          </div>
        </a>
        <a
          href="https://www.pinterest.com/myotakuworld/"
          className={style.tooltip}
        >
          <div style={{ color: "#bd081c" }}>
            <FaPinterest />
            <span className={style.tooltiptext} >Pinterest</span>
          </div>
        </a>
        <a
          href="https://www.instagram.com/myotakuworld/"
          className={style.tooltip}
        >
          <div style={{ color: "#c13584" }}>
            <FaInstagram />
            <span className={style.tooltiptext}>Instagram</span>
          </div>
        </a>
        <a
          href="https://www.youtube.com/channel/UCrMFWL5maGeVBYwwXuq5HMA"
          className={style.tooltip}
        >
          <div style={{ color: "#ff0000" }}>
            <FaYoutube />
            <span className={style.tooltiptext}>YouTube</span>
          </div>
        </a>
      </section> */}

      <Link />
      <div className={style.divider}>
        <hr className={style.lines} />
      </div>

      <footer>
        <p>© 2019-2023 MyOtakuWorld</p>
        <p>
          All other assets and trademarks are property of their original owners.
        </p>
        <p>
          MyOtakuWorld is neither affiliated with nor endorsed any brands and
          trademarks on this site unless explicitly stated.
        </p>
      </footer>
    </div>
  );
}

export default Blogs;
