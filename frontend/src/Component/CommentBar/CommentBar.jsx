import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./CommentBar.module.css";

function CommentBar({ blogId, isOpen, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [visibleReplies, setVisibleReplies] = useState({});
  const [replyPagination, setReplyPagination] = useState({});
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserDetails(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/comments`
      );
      setComments(response.data);
      console.log("Fetched comments:", response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error(
        `Error fetching comments: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleCommentSubmit = async () => {
    if (!userId) {
      toast.error("Please log in first");
      return;
    }

    if (newComment.trim()) {
      try {
        if (!userDetails) {
          toast.error("Error fetching user details");
          return;
        }
        console.log("Submitting new comment:", {
          content: newComment,
          author: "Anonymous",
          parentCommentId: null,
          userProfilePicture: userDetails.profilePicture,
        });

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/comments`,
          {
            content: newComment,
            author: userDetails.name,
            parentCommentId: null,
            userId,
            userName: userDetails.name,
            userProfilePicture: userDetails.profilePicture,
          }
        );

        console.log("New comment response:", response.data);
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error(
          `Error submitting comment: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
      toast.error("Comment cannot be empty");
    }
  };

  const handleReplySubmit = async (parentCommentId, parentAuthor) => {
    if (!userId) {
      toast.error("Please log in first");
      return;
    }
    if (replyText.trim()) {
      try {
        if (!userDetails) {
          toast.error("Error fetching user details");
          return;
        }

        console.log("Submitting reply:", {
          content: replyText,
          author: "Anonymous",
          parentCommentId,
        });

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/comments`,
          {
            content: replyText,
            author: userDetails.name,
            parentCommentId,
            userId,
            userName: userDetails.name,
            userProfilePicture: userDetails.profilePicture,
          }
        );

        console.log("Reply response:", response.data);
        const newCommentData = response.data;
        setComments((prevComments) =>
          updateCommentsWithReply(prevComments, parentCommentId, newCommentData)
        );
        setReplyText("");
        setReplyingTo(null);
      } catch (error) {
        console.error("Error submitting reply:", error);
        toast.error(
          `Error submitting reply: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    } else {
      toast.error("Reply cannot be empty");
    }
  };

  const updateCommentsWithReply = (comments, parentId, reply) => {
    return comments.map((comment) => {
      if (comment.commentId === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: updateCommentsWithReply(comment.replies, parentId, reply),
        };
      }
      return comment;
    });
  };

  const handleReplyClick = (commentId, author) => {
    console.log("Replying to comment:", commentId);
    setReplyingTo({ commentId, author });
    setReplyText("");
  };

  const handleDeleteComment = async (commentId) => {
    try {
      console.log("Deleting comment:", commentId);
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/comments/${commentId}`
      );
      setComments((prevComments) => deleteCommentById(prevComments, commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(
        `Error deleting comment: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const deleteCommentById = (comments, commentId) => {
    return comments
      .filter((comment) => comment.commentId !== commentId)
      .map((comment) => ({
        ...comment,
        replies: deleteCommentById(comment.replies, commentId),
      }));
  };

  const handleToggleReplies = (commentId) => {
    setVisibleReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    if (!visibleReplies[commentId]) {
      setReplyPagination((prevState) => ({
        ...prevState,
        [commentId]: 3,
      }));
    }
  };

  const handleShowMoreReplies = (commentId) => {
    setReplyPagination((prevState) => ({
      ...prevState,
      [commentId]: (prevState[commentId] || 3) + 3,
    }));
  };

  const handleHideReplies = (commentId) => {
    setVisibleReplies((prevState) => ({
      ...prevState,
      [commentId]: false,
    }));
    setReplyPagination((prevState) => ({
      ...prevState,
      [commentId]: 3,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleCommentChange = (e) => {
    const input = e.target.value;
    if (input.length <= 100) {
      setNewComment(input);
    } else {
      toast.error("Comment cannot exceed 100 characters");
    }
  };
  
  const handleReplyChange = (e) => {
    const input = e.target.value;
    if (input.length <= 100) {
      setReplyText(input);
    } else {
      toast.error("Reply cannot exceed 100 characters");
    }
  };
  

  const renderReplies = (replies, parentId, parentAuthor) => {
    const isVisible = visibleReplies[parentId];
    const visibleCount = replyPagination[parentId] || 3;
    const visibleRepliesList = replies.slice(0, visibleCount);

    return (
      <>
        {visibleRepliesList.map((reply) => (
          <div
            key={reply.commentId}
            className={`${style.comment} ${style.replyBox}`}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
              className={style.commentHeader}
            >
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={reply.userProfilePicture}
                alt={reply.userName}
                className={style.profilePicture}
              />
              <p className={style.userName}>@{reply.userName}</p>
            </div>
            {/* <p>@{parentAuthor}</p> */}
            <p>{reply.content}</p>
            <p>{reply.createdAt}</p>
            {/* <p>By: {reply.author}</p> */}
            <div className={style.buttons}>
              <button
                className={style.replyButton}
                onClick={() => handleReplyClick(reply.commentId, reply.author)}
              >
                Reply
              </button>
              <button
                className={style.deleteButton}
                onClick={() => handleDeleteComment(reply.commentId)}
              >
                Delete
              </button>
            </div>
            {replyingTo && replyingTo.commentId === reply.commentId && (
              <div className={style.replyInput}>
                <input
                  type="text"
                  placeholder={`Replying to @${reply.author}`}
                  className={style.Commentsec}
                  value={replyText}
                  onChange={handleReplyChange}
                />
                <FaArrowRight
                  className={style.sendbtn}
                  onClick={() =>
                    handleReplySubmit(reply.commentId, reply.author)
                  }
                />
              </div>
            )}
            <div className={style.replies}>
              {reply.replies && reply.replies.length > 0 && (
                <>
                  <button onClick={() => handleToggleReplies(reply.commentId)}>
                    {visibleReplies[reply.commentId]
                      ? "Hide Replies"
                      : "Show Replies"}
                  </button>
                  {visibleReplies[reply.commentId] &&
                    renderReplies(reply.replies, reply.commentId, reply.author)}
                </>
              )}
            </div>
          </div>
        ))}
        {replies.length > visibleCount && (
          <div className={style.buttons}>
            {isVisible ? (
              <>
                <button onClick={() => handleShowMoreReplies(parentId)}>
                  Show More
                </button>
                <button onClick={() => handleHideReplies(parentId)}>
                  Hide
                </button>
              </>
            ) : (
              <button onClick={() => handleToggleReplies(parentId)}>
                Show Replies
              </button>
            )}
          </div>
        )}
      </>
    );
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parentCommentId === parentId)
      .map((comment) => (
        <div key={comment.commentId} className={style.commentBox}>
          <div className={style.comment}>
            <div className={style.commentHeader}>
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={comment.userProfilePicture}
                alt={comment.userName}
                className={style.profilePicture}
              />
              <p className={style.userName}>@{comment.userName}</p>
            </div>
            <p>{comment.content}</p>
            <p>{comment.createdAt}</p>
            {/* <p>By: {comment.author}</p> */}
            <div className={style.buttons}>
              <button
                className={style.replyButton}
                onClick={() => handleReplyClick(comment.commentId)}
              >
                Reply
              </button>
              <button
                className={style.deleteButton}
                onClick={() => handleDeleteComment(comment.commentId)}
              >
                Delete
              </button>
            </div>
            {replyingTo && replyingTo.commentId === comment.commentId && (
              <div className={style.replyInput}>
                <input
                  type="text"
                  placeholder="Reply ..."
                  className={style.Commentsec}
                  value={replyText}
                  onChange={handleReplyChange}
                />
                <FaArrowRight
                  className={style.sendbtn}
                  onClick={() => handleReplySubmit(comment.commentId)}
                />
              </div>
            )}
            <div className={style.replies}>
              {comment.replies && comment.replies.length > 0 && (
                <>
                  <button
                    onClick={() => handleToggleReplies(comment.commentId)}
                  >
                    {visibleReplies[comment.commentId]
                      ? "Hide Replies"
                      : "Show Replies"}
                  </button>
                  {visibleReplies[comment.commentId] &&
                    renderReplies(
                      comment.replies,
                      comment.commentId,
                      comment.author
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className={`${style.Commentbar} ${isOpen ? style.open : ""}`}>
      <ToastContainer />
      {isOpen && (
        <div className={style.close} onClick={onClose}>
          <ImCross />
        </div>
      )}
      <div className={style.sentmsg}>{renderComments(comments)}</div>
      <div className={style.text}>
        <input
          type="text"
          placeholder="Message ..."
          className={style.Commentsec}
          value={newComment}
          onChange={handleCommentChange}
        />
        <FaArrowRight className={style.sendbtn} onClick={handleCommentSubmit} />
      </div>
    </div>
  );
}

export default CommentBar;
