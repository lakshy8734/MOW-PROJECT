import img from "../../assets/mow.webp";
import style from "./SubcategoryBlogs.module.css";
import React, { useState, useEffect } from "react";
import LoginPop from "Component/LoginPop/LoginPop";
import Load from '../../Component/Load/Load'
import {
  FaYoutube,
  FaInstagram,
  FaPinterest,
  FaFacebook,
} from "react-icons/fa";
import Navbar from "Component/Navbar/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";

import { ImCross } from "react-icons/im";
import Link from "Component/Link/Link";
import Aos from "aos";
import "aos/dist/aos.css";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Shareit from "Component/Shareit/Shareit";
// import ApexCharts from 'apexcharts'

function SubcategoryBlogs() {
  const navigate = useNavigate();
  const location = useLocation();
  const subcategoryId = location.state?.subcategoryId;
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
  const currentBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

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
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/${subcategoryId}`
        );
        const publishedBlogs = response.data.filter(blog => blog.publish);
        setBlogs(publishedBlogs);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [subcategoryId]);

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
  const handleCloseLogin = () => {
    setIsVisible(false);
  };

  const handleLoginClick = () => {
    setIsVisible(true);
  };

  const [submenus, setSubmenus] = useState({
    Recommendations: false,
    News: false,
    Gaming: false,
    Browse: false,
    More: false,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSubmenu = (menu) => {
    setSubmenus((prev) => {
      const updatedSubmenus = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === menu ? !prev[key] : false;
        return acc;
      }, {});
      return updatedSubmenus;
    });
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <Load />;
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      <div style={{ position: 'sticky', top: '0', zIndex: '1' }}>
        <Navbar />

      </div>


      <div>
        {/* Sidebar */}


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
          <span className={style.pageIndicator}>{currentPage}</span>
          ...
          <span className={style.pageIndicator}>{totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            &rarr;
          </button>
        </div>

        <Shareit/>


        {/* <section className={style.Usefullink}>
          <div className={style.links}>
            <div data-aos="fade-up">
              <h4>Company</h4>
              <ul>
                <li
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </li>
                <li
                  style={{ color: "red" }}
                  onClick={() => {
                    navigate("/blogs");
                  }}
                >
                  Blog
                </li>
                <li
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  About
                </li>
                <li
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  Contact
                </li>
              </ul>
            </div>
            <div data-aos="fade-up">
              <h4>Community</h4>
              <ul>
                <li>Members</li>
                <li>Forums</li>
                <li
                  onClick={() => {
                    navigate("/Contributor");
                  }}
                >
                  Become a <br />
                  Contributors
                </li>
              </ul>
            </div>
          </div>

          <div data-aos="fade-up" className={style.links}>
            <div>
              <h4>Useful links</h4>
              <ul>
                <li>Editorial Guidelines</li>
                <li>
                  Verification & Fact- <br /> Checking Policy
                </li>
              </ul>
            </div>

            <div data-aos="fade-up">
              <h4>Legal</h4>
              <ul>
                <li>DMCA</li>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
              </ul>
            </div>
          </div>
        </section> */}
        <Link />

        <div className={style.divider}>
          <hr className={style.lines} />
        </div>

        <footer>
          <p>© 2019-2023 MyOtakuWorld</p>
          <p>
            All other assets and trademarks are property of their original
            owners.
          </p>
          <p>
            MyOtakuWorld is neither affiliated with nor endorsed any brands and
            trademarks on this site unless explicitly stated.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SubcategoryBlogs;