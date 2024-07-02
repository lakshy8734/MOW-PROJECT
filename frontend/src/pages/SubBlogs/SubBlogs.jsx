import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LoginPop from "Component/LoginPop/LoginPop";
import axios from "axios";
import Confetti from "react-dom-confetti";
import style from "./SubBlogs.module.css";

import Load from "../../Component/Load/Load";

import Navbar from "Component/Navbar/Navbar";

import { PiSpeakerHighLight } from "react-icons/pi";
import { PiPauseCircleFill } from "react-icons/pi";

import {
  FaComment,
  FaFacebook,
  FaShare,
  FaClipboard,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { BsHeart, BsHeartFill, BsEye } from "react-icons/bs";
import { ShareSocial } from "react-share-social";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "Component/Link/Link";
import { ImCross } from "react-icons/im";
import Error from "pages/Error/Error";
import Aos from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CommentBar from "Component/CommentBar/CommentBar";
import { position } from "@chakra-ui/react";
import Author from "../../Component/Author/Author";
import Shareit from "Component/Shareit/Shareit";

function SubBlogs() {
  const navigate = useNavigate();
  const location = useLocation();
  const blogId = location.state?.blogId;

  const [blog, setBlog] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showLikeConfetti, setShowLikeConfetti] = useState(false);
  const [processedContent, setProcessedContent] = useState("");
  const [showShare, setShowShare] = React.useState(false);
  const [shareLink, setShareLink] = useState("");

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const likedStatus = localStorage.getItem(`liked_${blogId}`);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const [messages, setMessages] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [keywordLinks, setKeywordLinks] = useState({});
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [isReading, setIsReading] = useState(false);
  const [speed, setSpeed] = useState(1); // state to track speed
  const speechSynthesisUtteranceRef = useRef(null);
  const lastTapRef = useRef(0); // reference to track last tap time

  const handleReadClick = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const read = new SpeechSynthesisUtterance(blog?.content || "");
      read.rate = speed; // set the speed
      read.onend = () => {
        setIsReading(false);
      };
      window.speechSynthesis.speak(read);
      speechSynthesisUtteranceRef.current = read;
      setIsReading(true);
    }
  };

  const handleMouseDown = () => {
    if (isReading && speechSynthesisUtteranceRef.current) {
      speechSynthesisUtteranceRef.current.rate = 2;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speechSynthesisUtteranceRef.current);
      setSpeed(2);
    }
  };

  const handleMouseUp = () => {
    if (isReading && speechSynthesisUtteranceRef.current) {
      speechSynthesisUtteranceRef.current.rate = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speechSynthesisUtteranceRef.current);
      setSpeed(1);
    }
  };

  const handleDoubleClick = () => {
    const newSpeed = speed === 1 ? 2 : 1;
    setSpeed(newSpeed);
    if (isReading && speechSynthesisUtteranceRef.current) {
      speechSynthesisUtteranceRef.current.rate = newSpeed;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speechSynthesisUtteranceRef.current);
    }
  };

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleDoubleClick();
    }
    lastTapRef.current = now;
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const articles = response.data;

        if (!Array.isArray(articles)) {
          throw new Error("Expected an array of articles");
        }
        // me
        const publishedBlogs = articles.filter((blog) => blog.publish);
        //
        const latest = publishedBlogs.slice(-5).reverse(); // Get the last 5 published articles
        setLatestArticles(latest);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchLatestArticles();
  }, []);

  const handleShareClick = () => {
    setShowShare(true);
  };

  const handleCloseShare = () => {
    setShowShare(false);
  };

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/links/isActive`
        );
        console.log(response.data);
        const keywords = response.data.reduce((acc, keyword) => {
          acc[keyword.name.toLowerCase()] = keyword.link;
          return acc;
        }, {});
        console.log(keywords);
        setKeywordLinks(keywords);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    };

    fetchKeywords();
  }, []);

  // const keywordLinks = {
  //   the: "https://en.wikipedia.org/wiki/One_Piece",
  //   Corporate: "https://en.wikipedia.org/wiki/Naruto",
  //   beliefs: "https://en.wikipedia.org/wiki/Anime",
  // };

  useEffect(() => {
    const getBlogIdFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("blogId");
    };

    const fetchMainBlog = async (currentBlogId) => {
      console.log(`Fetching main blog with ID: ${currentBlogId}`);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/currentblog/${currentBlogId}`
        );
        console.log("Main blog data received:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          `Error fetching the main blog with ID ${currentBlogId}:`,
          error
        );
        throw new Error("Error fetching the main blog");
      }
    };

    const fetchRelatedBlogs = async (subcategoryId) => {
      console.log(`Fetching related blogs for subcategoryId: ${subcategoryId}`);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/subcategory/${subcategoryId}`
        );
        console.log("Related blogs data received:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          `Error fetching related blogs with subcategory ID ${subcategoryId}:`,
          error
        );
        throw new Error("Error fetching related blogs");
      }
    };

    const fetchUserDetails = async (userId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`
        );

        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Error fetching user details");
      }
    };

    const fetchBlog = async () => {
      console.log("Starting fetchBlog function");
      let currentBlogId = blogId || getBlogIdFromUrl();
      console.log(`Current Blog ID: ${currentBlogId}`);

      if (!currentBlogId) {
        console.error("Blog ID is missing");
        setError("Blog ID is missing");
        setLoading(false);
        return;
      }

      try {
        const blogData = await fetchMainBlog(currentBlogId);
        setBlog(blogData);
        setLikeCount(blogData.likes);

        console.log("Blog data set to state:", blogData);

        if (likedStatus === "true") {
          setLiked(true);
        } else if (likedStatus === "false") {
          setLiked(false);
        }
        console.log(
          `Liked status set to: ${likedStatus === "true" ? "true" : "false"}`
        );

        const relatedBlogsData = await fetchRelatedBlogs(
          blogData.subcategoryId
        );
        // Filter related blogs to exclude the current blog and unpublished blogs
        const filteredRelatedBlogs = relatedBlogsData.filter(
          (relatedBlog) =>
            relatedBlog.blogId !== currentBlogId && relatedBlog.publish
        );

        setRelatedBlogs(filteredRelatedBlogs.slice(0, 6)); // Limit to 6 related blogs
        console.log(
          "Filtered related blogs set to state:",
          filteredRelatedBlogs
        );

        await fetchUserDetails(blogData.userId);

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchBlog:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    if (blog && blog.slug && blogId) {
      const pageLink = `${window.location.origin}/${blog.slug}?blogId=${blogId}`;
      setShareLink(pageLink);
    }
  }, [blog]);

  const toggleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/like`)
        .then(() => {
          localStorage.setItem(`liked_${blogId}`, true);
          setShowLikeConfetti(true);

          // Hide the confetti after 2 seconds
          setTimeout(() => {
            setShowLikeConfetti(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error liking the blog:", error);
        });
    } else {
      setLiked(false);
      setLikeCount(likeCount - 1);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/unlike`)
        .then(() => {
          localStorage.removeItem(`liked_${blogId}`);
        })
        .catch((error) => {
          console.error("Error unliking the blog:", error);
        });
    }
  };

  const copyLinkToClipboard = () => {
    // Construct the page link using the current blogId
    // const pageLink = `${window.location.origin}/subblogs/${blog.slug}?blogId=${blogId}`;

    // Copy the constructed link to the clipboard
    navigator.clipboard.writeText(shareLink).then(() => {
      setShowConfetti(true);

      // Hide the confetti after 2 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    });
  };

  const handleLikeClick = () => {
    // Trigger the confetti effect
    setShowLikeConfetti(true);

    // Hide the confetti after 2 seconds
    setTimeout(() => {
      setShowLikeConfetti(false);
    }, 2000);

    // Add your logic for handling the like action here
    // For example, you can increment the like count or send a request to the server
  };

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 81,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "22px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  // Function to process content
  const processContent = (content) => {
    let processedContent = content;
    for (const [keyword, url] of Object.entries(keywordLinks)) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      processedContent = processedContent.replace(
        regex,
        `<a href="${url}" target="_blank" style="display: inline-block; background-color: yellow; padding: 0 2px; border-radius: 3px; color: red; font-weight: bold; transition: transform 0.3s;">
        ${keyword}
      </a>`
      );
    }
    return processedContent;
  };

  // Effect to process content when blog content changes
  useEffect(() => {
    if (blog && blog.content) {
      setProcessedContent(processContent(blog.content));
    }
  }, [blog]);

  const handleLogoClick = () => {
    navigate("/");
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

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

  const [isCommentbarOpen, setIsCommentbarOpen] = useState(false);

  const closeSidebar2 = () => {
    setIsCommentbarOpen(false);
  };

  const toggleSidebar2 = () => {
    if (userId) {
      setIsCommentbarOpen(!isCommentbarOpen);
    } else {
      Swal.fire({
        title: "Please log in first",
        text: "You need to log in to comment.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handlePostMessage = (message) => {
    setMessages([...messages, message]);
  };

  const handleArticleClick = (slug, blogId) => {
    navigate(`/${slug}`, { state: { blogId: blogId } });
    window.scrollTo(0, 0);
  };

  if (loading) return <Load />;
  if (error) return <Error />;

  return (
    <div>
      <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
        <Navbar />
      </div>

      <section className={style.container}>
        <div className={style.leftcontainer}>
          <h1 data-aos="fade-up">{blog.title}</h1>
          {/* Sidebar */}
          <CommentBar
            blogId={blog.blogId}
            isOpen={isCommentbarOpen}
            onClose={closeSidebar2}
          />
          {/* Overlay */}
          {isCommentbarOpen && (
            <div className={style.overlay2} onClick={closeSidebar2}></div>
          )}

          <div className={style.authorname}>

            <img className={style.profileImg} src={blog.mediaUrl} alt="" />

            <div className="flex flex-col">
              <h5 className=" sm:text-xs text-base">{blog.authorName} </h5>
                <h6 className="sm:text-xs text-sm">{blog.createdAt}</h6>
            </div>

          </div>

          <div className={style.comment}>
            <div className={style.likeContainer}>
              <Confetti active={showLikeConfetti} config={config} />

              <div title="Like" className={style.heart} onClick={toggleLike}>
                {liked ? (
                  <BsHeartFill color="red" size={20} />
                ) : (
                  <BsHeart color="red" size={20} />
                )}
                <div className={style.amount}>{likeCount}</div>
              </div>

              <div title="Comment" className={style.Facomment}>
                <FaComment onClick={toggleSidebar2} />
              </div>
            </div>

            <div className={style.Subcomment}>
              <div
                title="Share"
                onClick={handleShareClick}
                style={{ cursor: "pointer" }}
              >
                <FaShare />
              </div>

              {showShare && (
                <div className={style.modalOverlay}>
                  <div className={style.modalContent}>
                    <div className={style.modalHeader}>
                      <button
                        className={style.modalClose}
                        onClick={handleCloseShare}
                      >
                        &times;
                      </button>
                    </div>

                    <div className={style.modalBody}>
                      <div
                        className={style.socialIcons}
                        onClick={() => {
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaFacebook />
                        <span>Facebook</span>
                      </div>
                      <div
                        className={style.socialIcon}
                        onClick={() => {
                          window.open(
                            `https://twitter.com/share?url=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaTwitter />
                        <span>Twitter</span>
                      </div>
                      <div
                        className={style.socialIcon}
                        onClick={() => {
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaLinkedin />
                        <span>LinkedIn</span>
                      </div>
                      <div
                        className={style.socialIcon}
                        onClick={() => {
                          window.open(
                            `https://api.whatsapp.com/send?text=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaWhatsapp />
                        <span>WhatsApp</span>
                      </div>

                      <Confetti active={showConfetti} config={config} />
                    </div>
                  </div>
                </div>
              )}

              <div className={style.FaClipboard}>
                <Confetti active={showConfetti} config={config} />
                <FaClipboard title="Clipboard" onClick={copyLinkToClipboard} />
              </div>

              <div
                title={
                  isReading
                    ? `Pause${speed === 2 ? " (2x)" : ""}`
                    : `Read${speed === 2 ? " (2x)" : ""}`
                }
                className={style.shareContainer}
                onClick={handleReadClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown} // handle touch start
                onTouchEnd={(e) => {
                  handleMouseUp();
                  handleTap();
                }} // handle touch end and tap for double tap
                onDoubleClick={handleDoubleClick}
              >
                {isReading ? <PiPauseCircleFill /> : <PiSpeakerHighLight />}
                {speed === 2 && (
                  <span className={style.speedIndicator}>2x</span>
                )}
              </div>
            </div>
          </div>

          <img data-aos="fade-up" src={blog.mediaUrl} alt={blog.title} />
          <div dangerouslySetInnerHTML={{ __html: processedContent }}></div>

          <div className={style.comment}>
            <div className={style.likeContainer}>
              <Confetti active={showLikeConfetti} config={config} />

              <div title="Like" className={style.heart} onClick={toggleLike}>
                {liked ? (
                  <BsHeartFill color="red" size={20} />
                ) : (
                  <BsHeart color="red" size={20} />
                )}
                <div className={style.amount}>{likeCount}</div>
              </div>

              <div title="Comment" className={style.Facomment}>
                <FaComment onClick={toggleSidebar2} />
              </div>
            </div>

            <div className={style.Subcomment}>
              <div
                title="Share"
                onClick={handleShareClick}
                style={{ cursor: "pointer" }}
              >
                <FaShare />
              </div>

              {showShare && (
                <div className={style.modalOverlay}>
                  <div className={style.modalContent}>
                    <div className={style.modalHeader}>
                      <button
                        className={style.modalClose}
                        onClick={handleCloseShare}
                      >
                        &times;
                      </button>
                    </div>

                    <div className={style.modalBody}>
                      <div
                        className={style.socialIcons}
                        onClick={() => {
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaFacebook />
                        <span>Facebook</span>
                      </div>
                      <div
                        className={style.socialIcon}
                        onClick={() => {
                          window.open(
                            `https://twitter.com/share?url=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaTwitter />
                        <span>Twitter</span>
                      </div>
                      <div
                        className={style.socialIcon}
                        onClick={() => {
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaLinkedin />
                        <span>LinkedIn</span>
                      </div>
                      <div
                        className={style.socialIcon}
                        onClick={() => {
                          window.open(
                            `https://api.whatsapp.com/send?text=${shareLink}`,
                            "_blank"
                          );
                        }}
                      >
                        <FaWhatsapp />
                        <span>WhatsApp</span>
                      </div>

                      <Confetti active={showConfetti} config={config} />
                    </div>
                  </div>
                </div>
              )}

              <div className={style.FaClipboard}>
                <Confetti active={showConfetti} config={config} />
                <FaClipboard title="Clipboard" onClick={copyLinkToClipboard} />
              </div>

              <div
                title={isReading ? "Pause" : "Read"}
                className={style.shareContainer}
                onClick={handleReadClick}
              >
                {isReading ? <PiPauseCircleFill /> : <PiSpeakerHighLight />}
              </div>
            </div>
          </div>

          <div className={style.article}>
            <hr style={{ color: "gray" }} />

            <div className={style.btnA}>
              <button onClick={() => navigate("/contributor")}>
                Become a Contributor
              </button>
            </div>

            <div className={style.author}>
              <Author profilePicture={blog.mediaUrl} bio={userDetails.bio} />
            </div>

            <div className={style.articles}>
              <h6>Related Articles</h6>
              <hr style={{ color: "red", width: "100%" }} />
              <div className={style.articlesgrid}>
                {relatedBlogs.map((relatedBlog) => (
                  <div
                    key={relatedBlog.blogId}
                    className={style.gridbox}
                    onClick={() =>
                      handleArticleClick(relatedBlog.slug, relatedBlog.blogId)
                    }
                  >
                    <div
                      className={style.bb}
                      style={{
                        backgroundImage: `url(${relatedBlog.mediaUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <h4>{relatedBlog.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={style.rightcontainer}>
          <div className={style.aside}>
            <h2>Recommended Articles</h2>
            <hr className={style.line} />
            <ul className={style.articleList}>
              {latestArticles.map((article) => (
                <li
                  key={article.id}
                  className={style.articleItem}
                  onClick={() =>
                    handleArticleClick(article.slug, article.blogId)
                  }
                >
                  <img
                    src={article.mediaUrl}
                    alt={article.title}
                    className={style.articleImage}
                  />
                  <span>{article.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Shareit />

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

export default SubBlogs;
