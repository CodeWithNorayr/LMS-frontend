import search from "./search.png"
import studentsLearning1 from "./students-learning-1.jpg"
import elearning from "./elearning.jpg"
import studentsLearning2 from "./studentsLearning-2.jpg"
import google from "./Google.png"
import deepseek from "./Deepseek.jpg"
import nvidia from "./nvidia.png"
import microsoft from "./microsoft.png"
import openAi from "./OpenAI.png"
import markZuckenberg from "./Mark-Zuckerberg.jpg"
import elonMusk from "./Elon Musk.jpg"
import samAltman from "./Sam Altman.jpg"
import whatsapp from "./whatsapp.png"
import truth from "./truth.png"
import telegram from "./telegram.png"
import x from "./twitter.png"
import javaScript from "./javaScript.png"
import python from "./python.png"
import react from "./react js.png"
import mongoDB from "./mongoDB.png"
import html from "./html.png"
import sql from "./sql.png"
import css from "./css.png"
import resume from "./resume.png"
import profile from "./user-profile.png"
import student from "./graduated.png"
import educator from "./online-class.png"
import login from "./log-in.png"
import register from "./register.png"
import adding from "./adding.png"
import videoLessons from "./video-lesson.png"
import upcomingLessons from "./coming-soon.png"
import classRoom from "./classroom.png"
import students from "./staff.png"
import deletee from "./delete.png"
import management1 from "./interaction.png"
import management2 from "./process.png"
import heart from "./heart.png"
import heartFilled from "./heart-filled.png"
import remove from "./remove.png"
import pen from "./pen.png"
import comments from "./comments.png"
import chatBubbles from "./chat-bubbles.png"
import left from "./leftarrow.png"
import right from "./rightarrow.png"
import myOwnCourses from "./online-class.png"
import listings from "./listings.png"

export const assets = {
  search, studentsLearning1, elearning, studentsLearning2, google, deepseek, nvidia, microsoft, openAi, markZuckenberg, elonMusk, samAltman, whatsapp,truth,telegram,x, javaScript, python, react, mongoDB, html, sql, css, profile, resume, student, educator, login, register, adding, videoLessons, upcomingLessons, classRoom, students, deletee, management1, management2, heart, heartFilled, remove, pen, comments, chatBubbles, left, right, myOwnCourses, listings
}

 export const searchTitles = [
    "JavaScript",
    "Python",
    "Rust",
    "Golang",
    "Ruby",
    "TypeScript",
    "Express js",
    "Node js",
    "React js",
     "HTML",
     "CSS"
] 


export const courseSchema = [
  {
    courseId: "1",
    courseTitle: "JavaScript",
    courseDescription: "JavaScript is very powerfull language",
    courseThumbnail: assets.javaScript,
    coursePrice: 100,
    isPublished: true,
    discount: 15,

    chapters: [
      {
        chapterId: "ch1",
        chapterTitle: "Introduction of javascript",
        chapterOrder: 1,

        lectures: [
          {
            lectureId: "lec1",
            lectureTitle: "Introduction of javascript essentials",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=EerdGm-ehJQ&pp=ygUKamF2YXNjcmlwdA%3D%3D",
            isPreviewFree: true,
            lectureOrder: 1,
          }
        ]
      },
      {
        chapterId: "ch2",
        chapterTitle: "JavaScript algorithms",
        chapterOrder: 2,

        lectures: [
          {
            lectureId: "lec2",
            lectureTitle: "JavaScript algorithms and data structure",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=EerdGm-ehJQ&pp=ygUKamF2YXNjcmlwdA%3D%3D",
            isPreviewFree: true,
            lectureOrder: 2,
          }
        ]
      },
      {
        chapterId: "ch3",
        chapterTitle: "The essence of programming",
        chapterOrder: 3,

        lectures: [
          {
            lectureId: "lec3",
            lectureTitle: "The essence of programming languages",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=EerdGm-ehJQ&pp=ygUKamF2YXNjcmlwdA%3D%3D",
            isPreviewFree: true,
            lectureOrder: 3,
          }
        ]
      },
      {
        chapterId: "ch4",
        chapterTitle: "Full stack programming languages",
        chapterOrder: 4,

        lectures: [
          {
            lectureId: "lec4",
            lectureTitle: "Full stack programming languages",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=EerdGm-ehJQ&pp=ygUKamF2YXNjcmlwdA%3D%3D",
            isPreviewFree: true,
            lectureOrder: 4,
          }
        ]
      },
    ]
  },
  {
    courseId: "2",
    courseTitle: "Python",
    courseDescription: "Python is very powerfull language",
    courseThumbnail: assets.python,
    coursePrice: 150,
    isPublished: true,
    discount: 15,

    chapters: [
      {
        chapterId: "ch2",
        chapterTitle: "Introduction of python",
        chapterOrder: 2,

        lectures: [
          {
            lectureId: "lec2",
            lectureTitle: "Introduction of python essentials",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=ix9cRaBkVe0&pp=ygUGcHl0aG9u",
            isPreviewFree: true,
            lectureOrder: 2,
          }
        ]
      }
    ]
  },
  {
    courseId: "3",
    courseTitle: "HTML",
    courseDescription: "HTML is very powerfull coding language",
    courseThumbnail: assets.html,
    coursePrice: 80,
    isPublished: true,
    discount: 15,

    chapters: [
      {
        chapterId: "ch3",
        chapterTitle: "Introduction of HTML",
        chapterOrder: 3,

        lectures: [
          {
            lectureId: "lec3",
            lectureTitle: "Introduction of HTML essentials",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU&pp=ygUEaHRtbA%3D%3D",
            isPreviewFree: true,
            lectureOrder: 3,
          }
        ]
      }
    ]
  },
  {
    courseId: "4",
    courseTitle: "CSS",
    courseDescription: "CSS is very powerfull coding language",
    courseThumbnail: assets.css,
    coursePrice: 180,
    isPublished: true,
    discount: 15,

    chapters: [
      {
        chapterId: "ch4",
        chapterTitle: "Introduction of CSS",
        chapterOrder: 4,

        lectures: [
          {
            lectureId: "lec4",
            lectureTitle: "Introduction of CSS essentials",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=G3e-cpL7ofc&pp=ygUDY3Nz",
            isPreviewFree: true,
            lectureOrder: 4,
          }
        ]
      }
    ]
  },
  {
    courseId: "5",
    courseTitle: "SQL",
    courseDescription: "SQL is very powerfull programming language",
    courseThumbnail: assets.sql,
    coursePrice: 200,
    isPublished: true,
    discount: 15,

    chapters: [
      {
        chapterId: "ch5",
        chapterTitle: "Introduction of SQL",
        chapterOrder: 5,

        lectures: [
          {
            lectureId: "lec5",
            lectureTitle: "Introduction of SQL essentials",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=SSKVgrwhzus&pp=ygUDc3Fs",
            isPreviewFree: true,
            lectureOrder: 5,
          }
        ]
      }
    ]
  },
  {
    courseId: "6",
    courseTitle: "mongoDB",
    courseDescription: "mongoDB is very powerfull programming language",
    courseThumbnail: assets.mongoDB,
    coursePrice: 200,
    isPublished: true,
    discount: 15,

    chapters: [
      {
        chapterId: "ch6",
        chapterTitle: "Introduction of mongoDB",
        chapterOrder: 6,

        lectures: [
          {
            lectureId: "lec6",
            lectureTitle: "Introduction of mongoDB essentials",
            lectureDuration: 10, // minutes
            lectureUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o&pp=ygUHbW9uZ29EQg%3D%3D",
            isPreviewFree: true,
            lectureOrder: 6,
          }
        ]
      }
    ]
  },
]


