import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase-config";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
function Blog({ postLists, getAllBlogs, uid, isAuth, getPosts }) {
  const [blogsData, setBlogsData] = useState(postLists);
  console.log(blogsData);
  useEffect(() => {
    if (getAllBlogs === false) {
      setBlogsData(postLists.filter((blog) => blog.author.id === uid));
    } else {
      setBlogsData(postLists);
    }
  }, [postLists, getAllBlogs, uid]);

  const deletePost = async (id) => {
    console.log(id);
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      alert("blog deleted successfully");
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {blogsData.map((post, index) => (
        <div className="post" key={index}>
          <div className="postHeader">
            <div className="title">
              <h1> {post.title}</h1>
            </div>
            <div className="deletePost">
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  {" "}
                  &#128465;
                </button>
              )}
            </div>
          </div>
          <div className="postTextContainer"> {post.postText} </div>
          <h3>@{post.author.name}</h3>
        </div>
      ))}
    </>
  );
}

export default Blog;
