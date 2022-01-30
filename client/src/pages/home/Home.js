// import axios from "axios"
import { axiosInstance } from '../../config'
import { useEffect, useState } from 'react'
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import { useLocation } from 'react-router-dom'


export default function Home() {
  const [posts, setPosts] = useState([])
  const location = useLocation()
  const { search } = location  //  http://localhost:3000/?user=janeの '/?user=jane'

  console.log(location)

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get("/posts"+search)
      const res = await axiosInstance.get("/posts"+search)
      // console.log(res)
      setPosts(res.data)
    }

    fetchPosts()
  }, [search])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
}
