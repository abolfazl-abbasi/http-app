import React, { useEffect, useState } from "react";
import Comment from "../../components/Comment/Comment";
import FullComment from "../../components/FullComment/FullComment";
import NewComment from "../../components/NewComment/NewComment";
import http from "./../../services/httpServices.js";
import { toast } from "react-toastify";
import "./Discussion.css";
import Swal from "sweetalert2";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await http.get("/comments");
        setComments(data);
      } catch {
        setError(true);
      }
    };
    return getComments();
  }, []);

  const handleCommentId = (e) => {
    setCommentId(e);
  };

  const renderingComments = () => {
    let renderComments = <p>Loading ...</p>;
    if (error) {
      Swal.fire("Good job!", "You clicked the button!", "error");
      renderComments = (
        <>
          <p>Filed to Get Comment from Database!!</p>
        </>
      );
    }
    if (comments && !error) {
      return (renderComments = comments.map((c) => {
        return <Comment onCommentId={handleCommentId} _id={c.id} key={c.id} name={c.name} email={c.email} />;
      }));
    }
    return renderComments;
  };

  return (
    <>
      <div>
        <section className="comments">{renderingComments()}</section>
        <section>
          <FullComment commentId={commentId} onSetCommentId={setCommentId} onSetComments={setComments} />
        </section>
        <section>
          <NewComment onSetComments={setComments} />
        </section>
      </div>
    </>
  );
};

export default Discussion;
