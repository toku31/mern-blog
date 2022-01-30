import axios from "axios"
// import { axiosInstance } from "../../config"
import { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import './settings.css'
// import lake from '../../img/lake_md.jpg'

export default function Settings() {

  const { user ,dispatch } = useContext(Context)

  console.log('user:', user.username)
  console.log('email:', user.email)
  console.log('password:', user.password)
  console.log('file:', user.profilePic)


  const [file, setFile] = useState(null)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)
  const [success, setSuccess] = useState(false)
  const PF = "http://localhost:5000/images/"

  // const [file, setFile] = useState(null)
  // const [username, setUsername] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [success, setSuccess] = useState(false)

  // useEffect(() => {
  //   // setUsername(user.username)
  //   // setEmail(user.email)
  //   // setPassword(password)
      // }, [user.username, user.email ])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    // console.log('ok1')
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename
      try {
        await axios.post("/upload", data)
        // await axiosInstance.post("/upload", data)
      } catch (err) {
        console.log('err1')
      }
    }
    console.log('ok2', user)
    try {
      console.log('updatedUser', updatedUser)
      const res =await axios.put("/users/"+user._id, updatedUser)
      // const res =await axiosInstance.put("/users/"+user._id, updatedUser)
      setSuccess(true)
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
      console.log('setSuccess')
      user.username = updatedUser.username
      user.email = updatedUser.email
      user.profilePic = updatedUser.profilePic
      localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem("user", JSON.stringify({username:username}));
    } catch (err) {
      console.log('err2')
      dispatch({ type: "UPDATE_FAILURE" })
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {/* <img src={lake} alt="" /> */}
            {/* <img src={user.profilePic} alt="" />  */}
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" /> 
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }}
              onChange={(e)=>setFile(e.target.files[0]) }/>
          </div>
          <label>Username</label>
          <input type="text" value={username}
            onChange={(e) => setUsername( e.target.value )} />
          
          <label>Email</label>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
          
          <label>Password</label>
          <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="settingsSubmit" type="submit">Update</button>
          {success && <span style={{ color: "green", textAlign: "center", margin: "20px" }}>Profile has been updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
