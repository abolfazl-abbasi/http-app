import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import http from "./../../services/httpServices";
import "./FullComment.css";

const FullComment = ({ commentId, onSetComments, onSetCommentId }) => {
  const [comment, setComment] = useState();

  useEffect(() => {
    if (commentId) {
      http
        .get(`/comments/${commentId}`)
        .then((res) => {
          setComment(res.data);
        })
        .catch();
    }
  }, [commentId]);
  const handleDelete = async () => {
    try {
      await http.delete(`/comments/${commentId}`);
      const { data } = await http.get("/comments");
      onSetComments(data);
      onSetCommentId(null);
      setComment(null);
      toast.success("Deleted !! 😊");
    } catch (error) {}
  };
  const renderingFullComment = () => {
    let detailRendering = (
      <div className="fullComment">
        <p>Please Select a Comment!</p>
      </div>
    );

    if (!comment && commentId) {
      detailRendering = <div className="fullComment">Loading...</div>;
    }

    if (comment) {
      detailRendering = (
        <>
          <div className="fullComment">
            <div>{comment.name}</div>
            <div>{comment.email}</div>
            <div>{comment.body}</div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      );
    }
    return detailRendering;
  };
  return <>{renderingFullComment()}</>;
};

export default FullComment;
