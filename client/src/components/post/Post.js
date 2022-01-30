import "./post.css"
// import lake from '../../img/lake_lg.jpg'
import { Link } from "react-router-dom" 

export default function Post({ post }) {
  const PublicFolder = "http://localhost:5000/images/"

  return (
    <div className="post">
      { post.photo && (
        <img
          className="postImg"
          src={PublicFolder + post.photo}
          alt=""
        />
      ) }
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{ c.name }</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postData">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  )
}
