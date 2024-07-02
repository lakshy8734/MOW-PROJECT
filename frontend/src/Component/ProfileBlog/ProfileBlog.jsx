import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./ProfileBlog.module.css";
import "react-toastify/dist/ReactToastify.css";

const ProfileBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      toast.error("Please login again.");
      navigate("/");
    } else {
      fetchBlogs();
    }
  }, [userId, navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blog/user/${userId}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${blogId}`);
      setBlogs(blogs.filter((blog) => blog.blogId !== blogId));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handlePublishStatusChange = async (blogId, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status to ${newStatus ? "Publish" : "Draft"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/publish`,
          { publish: newStatus },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const updatedBlog = response.data.blog;
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.blogId === updatedBlog.blogId ? updatedBlog : blog
            )
          );
          toast.success("Blog status updated successfully!");
        } else {
          throw new Error("Failed to update blog status");
        }
      } catch (error) {
        console.error("Error updating blog status:", error);
        toast.error("Failed to update blog status");
      }
    }
  };

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

  // Calculate current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Blogs</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Media</th>
            <th>Author</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Slug</th>
            <th>Status</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {currentBlogs.map((blog) => (
            <tr 
              key={blog.blogId}
              onClick={() => handleContinueReading(blog.blogId, blog.slug)}
              style={{ cursor: 'pointer' }} // Optional: change cursor to pointer
            >
              <td>{blog.title}</td>
              <td>
                <img src={blog.mediaUrl} alt="Media" className={styles.mediaImg} />
              </td>
              <td>{blog.authorName}</td>
              <td>{blog.views}</td>
              <td>{blog.likes}</td>
              <td>{blog.slug}</td>
              <td>
                {blog.publish ? (
                  <button
                    className={styles.publishButton}
                    onClick={(e) => { e.stopPropagation(); handlePublishStatusChange(blog.blogId, false); }}
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    className={styles.draftButton}
                    onClick={(e) => { e.stopPropagation(); handlePublishStatusChange(blog.blogId, true); }}
                  >
                    Draft
                  </button>
                )}
              </td>
              {/* <td>
                <button 
                  className={styles.editButton} 
                  onClick={(e) => { e.stopPropagation(); handleEdit(blog.blogId); }}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteButton} 
                  onClick={(e) => { e.stopPropagation(); handleDelete(blog.blogId); }}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        blogsPerPage={blogsPerPage}
        totalBlogs={blogs.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ blogsPerPage, totalBlogs, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.paginationList}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.paginationItem}>
            <button
              onClick={() => paginate(number)}
              className={`${styles.pageLink} ${currentPage === number ? styles.active : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileBlog;
