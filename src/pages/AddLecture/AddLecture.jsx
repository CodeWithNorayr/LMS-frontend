import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const AddLecture = () => {
  const { backendURL, educatorToken, addToUi } = useContext(StoreContext);

  // Course basic info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);

  // Chapter inputs
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterOrder, setChapterOrder] = useState("");

  // Lecture inputs
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureOrder, setLectureOrder] = useState("");
  const [lectureDuration, setLectureDuration] = useState("");
  const [lectureUrl, setLectureUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Build courseContent with manual orders
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

      formData.append("courseTitle", title);
      formData.append("courseDescription", description);
      formData.append("coursePrice", price);
      formData.append("discount", discount);

      // Send nested content
      formData.append("courseContent", JSON.stringify(courseContent));

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${backendURL}/api/course/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${educatorToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Course Created Successfully!");
        addToUi( response.data.data )

        // Reset fields
        setTitle("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setImage(null);

        setChapterTitle("");
        setChapterOrder("");

        setLectureTitle("");
        setLectureOrder("");
        setLectureDuration("");
        setLectureUrl("");
        setIsPreviewFree(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="form-addlecture-section-div" style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create Course (Manual Orders)</h2>

      <form className="form-addlecture-section" onSubmit={submitHandler}>
        {/* Course Info */}
        <input
          className="course-title-input"
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <hr />

        {/* Chapter Info */}
        <h3>Chapter</h3>

        <input
          type="number"
          placeholder="Chapter Order (e.g. 1)"
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

        {/* Lecture Info */}
        <h3>Lecture</h3>

        <input
          type="number"
          placeholder="Lecture Order (e.g. 1)"
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
          />
        </label>

        <br /><br />

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default AddLecture;
