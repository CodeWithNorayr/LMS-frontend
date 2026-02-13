import React, { useContext, useState } from "react";
import "./UpdateCourses.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateCourses = () => {
  const { navigate, backendURL, educatorToken } = useContext(StoreContext);

  // ✅ Get course id from URL
  const { id } = useParams();

  // Course fields
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [image, setImage] = useState(null);
  const [coursePrice, setCoursePrice] = useState("");
  const [discount, setDiscount] = useState("");

  // Chapter inputs
  const [chapterOrder, setChapterOrder] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");

  // Lecture inputs
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureOrder, setLectureOrder] = useState("");
  const [lectureDuration, setLectureDuration] = useState("");
  const [lectureUrl, setLectureUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(true);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // ✅ Build courseContent
    const courseContent = [
      {
        chapterId: Date.now().toString(),
        chapterOrder: Number(chapterOrder),
        chapterTitle: chapterTitle,
        chapterContent: [
          {
            lectureId: Date.now().toString(),
            lectureOrder: Number(lectureOrder),
            lectureTitle: lectureTitle,
            lectureDuration: Number(lectureDuration),
            lectureUrl: lectureUrl,
            isPreviewFree: isPreviewFree,
          },
        ],
      },
    ];

    try {
      const formData = new FormData();

      formData.append("courseTitle", courseTitle);
      formData.append("courseDescription", courseDescription);
      formData.append("coursePrice", Number(coursePrice));
      formData.append("discount", Number(discount));

      formData.append("courseContent", JSON.stringify(courseContent));

      if (image) {
        formData.append("image", image);
      }

      // ✅ Correct URL
      const response = await axios.put(
        `${backendURL}/api/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${educatorToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Course successfully updated!");
        navigate("/educator-dashboard");

        // Reset form
        setCourseTitle("");
        setCourseDescription("");
        setCoursePrice("");
        setDiscount("");
        setChapterOrder("");
        setChapterTitle("");
        setLectureTitle("");
        setLectureOrder("");
        setLectureDuration("");
        setLectureUrl("");
        setIsPreviewFree(true);
        setImage(null);
      }
    } catch (error) {
      toast.error("Failed to update course");
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Update Course</h3>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Course Title"
          required
        />

        <br /><br />

        <input
          type="text"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          placeholder="Course Description"
          required
        />

        <br /><br />

        <input
          type="number"
          value={coursePrice}
          onChange={(e) => setCoursePrice(e.target.value)}
          placeholder="Price"
          required
        />

        <br /><br />

        <input
          type="number"
          value={discount}
          placeholder="Discount (%)"
          onChange={(e) => setDiscount(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <hr />

        <h3>Chapter</h3>

        <input
          type="number"
          placeholder="Chapter Order"
          value={chapterOrder}
          onChange={(e) => setChapterOrder(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Chapter Title"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          required
        />

        <hr />

        <h3>Lecture</h3>

        <input
          type="number"
          placeholder="Lecture Order"
          value={lectureOrder}
          onChange={(e) => setLectureOrder(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Lecture Title"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Lecture Duration (minutes)"
          value={lectureDuration}
          onChange={(e) => setLectureDuration(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Lecture Video URL"
          value={lectureUrl}
          onChange={(e) => setLectureUrl(e.target.value)}
          required
        />

        <br /><br />

        <label>
          Free Preview:
          <input
            type="checkbox"
            checked={isPreviewFree}
            onChange={(e) => setIsPreviewFree(e.target.checked)}
            required
          />
        </label>

        <br /><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateCourses;
