import "./Comment.css";

const Comment = ({ name, email, _id, onCommentId }) => {
  return (
    <>
      <div onClick={() => onCommentId(_id)} className="comment">
        <div>
          Name : <div>{name}</div>
        </div>
        <div>
          Email : <div>{email}</div>
        </div>
      </div>
    </>
  );
};

export default Comment;
