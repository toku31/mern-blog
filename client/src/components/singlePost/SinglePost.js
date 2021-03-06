import { axiosInstance } from "../../config";
import "./singlePost.css"
// import lake from '../../img/lake_md.jpg'
import { useLocation } from "react-router"
import { useEffect, useState, useContext } from "react"
// import axios from "axios"
import { Link } from "react-router-dom"
import { Context } from '../../context/Context'

export default function SinglePost() {
  const location = useLocation()
  // console.log(location)
  const path = location.pathname.split("/")[2]  // postId
  const [post, setPost] = useState({})
  const PublicFolder = "http://localhost:5000/images/"
  const { user } = useContext(Context)
  const [ title, setTitle] = useState("")
  const [ desc, setDesc ] = useState("")
  const [ updateMode, setUpdateMode ] = useState(false)
  

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path)
      // const res = await axios.get("/posts/" + path)
      console.log('getPost:res', res)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    };
    getPost()
  }, [path])
  
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
      // await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username }
      })
      window.location.replace("/")
    } catch (err) {}
  }

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
      // await axios.put(`/posts/${post._id}`, {
        username: user.username, title: title, desc: desc
      })
      // window.location.reload()
      setUpdateMode(false)
    } catch (err) {}
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PublicFolder + post.photo } alt="" className="singlePostImg" />
        )}
        {updateMode ?
          <input type="text" value={title} className="singlePostTitleInput"
            autoFocus onChange={(e) => setTitle(e.target.value)} /> : (
          <h1 className="singlePostTitle">
              { title}  {/* {post.title} */}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className='link'>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)} /> : (
          <p className="singlePostDesc">{ desc }</p>
        )}
        { updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button> }
      </div>
    </div>
  )
}
