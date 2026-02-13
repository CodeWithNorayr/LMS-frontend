import React, { useContext, useState } from "react";
import "./Comments.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Comments = ({ courseId, addCommentToUI }) => {
  const { backendURL, token } = useContext(StoreContext);
  const [comment, setComment] = useState("");

  const userComment = async (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      return toast.error("Comment cannot be empty");
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/comment/create-comment`,
        {
          comment: comment,
          courseId: courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Comment shared successfully");

        // 1️⃣ Add comment to parent UI instantly
        addCommentToUI(response.data.data);

        // 2️⃣ Clear textarea
        setComment("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to share comment");
    }
  };

  return (
    <div>
      <form onSubmit={userComment}>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          name="comment"
          id="comment"
          cols="30"
          rows="5"
          placeholder="Share your opinion here..."
        />
        <div>
          <button type="submit">Share</button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
