import http from "./../../services/httpServices.js";
import React, { useState } from "react";
import "./NewComment.css";
import { toast } from "react-toastify";

const NewComment = ({ onSetComments }) => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [error, setError] = useState(false);
  const handleChangeValue = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   http.post("/comments", { ...comment, postId: Math.round(Math.random() * 10) }).then((res) => {
  //     http.get("/comments").then((result) => {
  //       onSetComments(result.data);
  //     });
  //   });
  //   if (comment.email !== "") {
  //     setComment({
  //       name: "",
  //       email: "",
  //       body: "",
  //     });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postComment = async () => {
      try {
        await http.post("/comments", { ...comment, postId: Math.round(Math.random() * 10) });
        const { data } = await http.get("/comments");
        onSetComments(data);
        toast.success("Compile Data !! 😉", {
          icon: "🚀",
        });
      } catch {
        setError(true);
      }
    };

    postComment();

    if (!error) {
      setComment({
        name: "",
        email: "",
        body: "",
      });
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="newComment">
        <h2>New Comment</h2>
        <div>
          <input value={comment.name} onChange={(e) => handleChangeValue(e)} type="text" placeholder="Name" name="name" />
        </div>
        <div>
          <input value={comment.email} onChange={(e) => handleChangeValue(e)} type="email" placeholder="Email" name="email" />
        </div>
        <div>
          <textarea
            value={comment.body}
            onChange={(e) => handleChangeValue(e)}
            type="textarea"
            placeholder="Content"
            name="body"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewComment;
