import React, { useContext, useEffect, useState } from "react";
import "./UpcomingCourseDetails.css";
import { StoreContext } from "../../context/StoreContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Comments from "../../components/Comments/Comments";
import { assets } from "../../assets/assets";

const UpcomingCourseDetails = () => {
  const {
    courseSchemas,
    backendURL,
    navigate,
    educatorToken,
    token,
    isClicked,
    setIsClicked,
    filteredCourses, 
    setFilteredCourses
  } = useContext(StoreContext);

  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [openChapterId, setOpenChapterId] = useState(
    localStorage.getItem("openChapterId") || null
  );
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [likedComments, setLikedComments] = useState(
    JSON.parse(localStorage.getItem("likedComments")) || {}
  );
  const [showComments, setShowComments] = useState(
    JSON.parse(localStorage.getItem("showComments")) || false
  );

  // ✅ Likes count for all comments at once
  const [likesCount, setLikesCount] = useState({});

  // ================== Find Course ==================
  useEffect(() => {
    if (!filteredCourses || filteredCourses.length === 0) return;
    const foundCourse = filteredCourses.find((c) => String(c._id) === id);
    setCourse(foundCourse);
  }, [filteredCourses, id]);

  // ================== Fetch Comments ==================
  const fetchingComments = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/comments/comments`);
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch comments");
    }
  };

  // ================== Fetch Likes Count (All Comments) ==================
  const fetchLikesCountAll = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/total-likes/likes-count-all`
      );
      if (response.data.success) {
        setLikesCount(response.data.likesCount || {});
      }
    } catch (error) {
      console.log("Likes fetch error:", error);
    }
  };

  // ================== Polling ==================
  useEffect(() => {
    fetchingComments();
    fetchLikesCountAll();

    const interval = setInterval(() => {
      fetchingComments();
      fetchLikesCountAll();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ================== Save States ==================
  useEffect(() => {
    localStorage.setItem("openChapterId", openChapterId);
  }, [openChapterId]);

  useEffect(() => {
    localStorage.setItem("likedComments", JSON.stringify(likedComments));
  }, [likedComments]);

  useEffect(() => {
    localStorage.setItem("showComments", JSON.stringify(showComments));
  }, [showComments]);

  // ================== Instant Add Comment ==================
  const addCommentToUI = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
    fetchLikesCountAll(); // refresh likes count
  };

  // ================== Toggle Chapter ==================
  const toggleChapter = (chapterId) => {
    setOpenChapterId(openChapterId === chapterId ? null : chapterId);
  };

  // ================== Update Comment ==================
  const updateCommentHandler = async (e, commentId) => {
    e.preventDefault();
    if (!editingText.trim()) return toast.error("Comment cannot be empty");

    try {
      const response = await axios.put(
        `${backendURL}/api/comment/update-comment/${commentId}`,
        { comment: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Comment updated!");
        setEditingCommentId(null);
        setEditingText("");
        fetchingComments();
        fetchLikesCountAll();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // ================== Delete Comment ==================
  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const response = await axios.delete(
        `${backendURL}/api/comment/delete-comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Comment deleted!");
        setComments((prev) => prev.filter((c) => c._id !== commentId));
        fetchLikesCountAll();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ================== Like Comment ==================
  const toggleLikeComment = async (commentId) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/likes/toggle-like`,
        { commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setLikedComments((prev) => ({
          ...prev,
          [commentId]: !prev[commentId],
        }));
        fetchLikesCountAll(); // refresh all likes
      }
    } catch (error) {
      toast.error("Like failed");
    }
  };

  // ================== Delete Course ==================
  const deleteCourseById = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      const response = await axios.delete(
        `${backendURL}/api/course/delete/${courseId}`,
        { headers: { Authorization: `Bearer ${educatorToken}` } }
      );

      if (response.data.success) {
        toast.success("Course deleted!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Course delete failed");
    }
  };

  // ================== Course Not Found ==================
  if (!course) return <h1>Course not found</h1>;

  // ================== Filter Comments ==================
  const courseComments = comments.filter(
    (c) => String(c.courseId) === String(course._id)
  );
    
  return (
    <div className="upcoming-course-details">
      {/* ===== Course Info ===== */}
      <div className="course-info">
        <h1 className="course-info-title-h1">{course.courseTitle}</h1>
        <img
          src={`${course.image}`}
          alt={course.courseTitle}
          className="upcoming-course-thumbnail"
        />
        <p className="course-info-title-description-p">{course.courseDescription}</p>
        <h3 className="course-info-title-price-h3">${course.coursePrice}</h3>
        <h3 className="course-info-title-discount-h3">Discount: -${course.discount}</h3>
      </div>

      {/* ===== Chapters ===== */}
      <div className="course-content">
        {course.courseContent?.map((chapter) => (
          <div key={chapter.chapterId} className="chapter">
            <h4 className="course-info-chapter-chapterContent-h4" onClick={() => toggleChapter(chapter.chapterId)}>
              {chapter.chapterTitle}
            </h4>

            {openChapterId === chapter.chapterId && (
              <div className="lectures">
                {chapter.chapterContent?.map((lecture) => (
                  <div key={lecture.lectureId} className="lecture">
                    <h6 className="lecture-lectureTitle">{lecture.lectureTitle}</h6>
                    <h6 className="lecture-lectureDuration">{lecture.lectureDuration} min</h6>

                    {lecture.isPreviewFree && (
                      <a href={lecture.lectureUrl} target="_blank" rel="noopener noreferrer">
                        <p className="preview">Preview</p>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== Buttons ===== */}
      <div className="upcoming-course-detail-button">
        <button onClick={() => navigate(`/course-update/${course._id}`)}>Update</button>
        <button onClick={() => deleteCourseById(course._id)}>Delete</button>
        <button onClick={() => setIsClicked(!isClicked)}>Share</button>
        <img
          className="show-comments-section"
          onClick={() => setShowComments(!showComments)}
          src={assets.comments}
          alt="comments"
        />
      </div>

      {/* ===== Comments Section ===== */}
      <div className="comments-section">
        {isClicked && (
          <Comments
            courseId={course._id}
            refreshComments={fetchingComments}
            addCommentToUI={addCommentToUI}
          />
        )}

        {courseComments.length === 0 ? (
          <p>No comments yet...</p>
        ) : (
          showComments &&
          courseComments.map((comment) => (
            <div key={comment._id} className="comments-section-content">
              <p><strong>{comment.user?.name}</strong></p>

              {editingCommentId === comment._id ? (
                <form onSubmit={(e) => updateCommentHandler(e, comment._id)}>
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button type="submit">Save</button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditingText("");
                    }}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="comment-sections">
                  <p>{comment.comment}</p>

                  <div className="div-section-comments">
                    {/* Edit */}
                    <img
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditingText(comment.comment);
                      }}
                      className="comment-pen"
                      src={assets.pen}
                      alt="edit"
                    />

                    {/* Delete */}
                    <img
                      onClick={() => deleteComment(comment._id)}
                      className="comment-remove"
                      src={assets.remove}
                      alt="remove"
                    />

                    {/* Like */}
                    <div>
                      <img
                        onClick={() => toggleLikeComment(comment._id)}
                        className="heart-icon"
                        src={likedComments[comment._id] ? assets.heartFilled : assets.heart}
                        alt="heart"
                      />
                      <p>Likes {likesCount[comment._id] || 0}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingCourseDetails;
