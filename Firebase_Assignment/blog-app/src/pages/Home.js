// import React, { useEffect, useState } from "react";
// import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
// import { auth, db } from "../firebase-config";
// import Blog from "./Blog";
// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);
//   const postsCollectionRef = collection(db, "posts");
//   useEffect(() => {
//     const getPosts = async () => {
//       const data = await getDocs(postsCollectionRef);
//       setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     getPosts();
//   });

//   // },[deletePost]);

//   const deletePost = async (id) => {
//     const postDoc = doc(db, "posts", id);
//     await deleteDoc(postDoc);
//   };
//   return (
//     <div className="homePage">
//       {postLists.map((post) => {
//         return (
//           <div className="post">
//             <div className="postHeader">
//               <div className="title">
//                 <h1> {post.title}</h1>
//               </div>
//               <div className="deletePost">
//                 {isAuth && post.author.id === auth.currentUser.uid && (
//                   <button
//                     onClick={() => {
//                       deletePost(post.id);
//                     }}
//                   >
//                     {" "}
//                     &#128465;
//                   </button>
//                 )}
//               </div>
//             </div>
//             <div className="postTextContainer"> {post.postText} </div>
//             <h3>@{post.author.name}</h3>
//             <Blog />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// export default Home;

import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home({ isAuth }) {
  const postsCollectionRef = collection(db, "posts");
  const [postLists, setPostList] = useState([]);
  const [activeAllBlogs, setActiveAllBlogs] = useState("");
  const [activeMyBlogs, setActiveMyBlogs] = useState("");
  const [getAllBlogs, setAllBlogs] = useState(false);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const uid = auth.currentUser !== null ? auth.currentUser.uid : null;

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    } else {
      getPosts();

      isAllBlogsClicked();
    }
  }, [setAllBlogs, navigate, currentUser]);
  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  function isAllBlogsClicked() {
    // Here active text is a custom css class
    setActiveAllBlogs("activeText");
    setActiveMyBlogs("");
    setAllBlogs(true);
  }

  function isMyBlogsClicked() {
    // Here active text is a custom css class
    setActiveAllBlogs("");
    setActiveMyBlogs("activeText");
    setAllBlogs(false);
  }

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "posts", id);
  //   await deleteDoc(postDoc);
  // };
  return (
    <div className="homePage">
      <div>
        <h5
          onClick={isAllBlogsClicked}
          className={activeAllBlogs}
          style={{ cursor: "pointer" }}
        >
          All blogs
        </h5>
        <h5
          onClick={isMyBlogsClicked}
          className={activeMyBlogs}
          style={{ cursor: "pointer" }}
        >
          My Blogs
        </h5>
      </div>
      <Blog
        postLists={postLists}
        getAllBlogs={getAllBlogs}
        uid={uid}
        isAuth={isAuth}
        getPosts={getPosts}
      />
    </div>
  );
}
export default Home;
