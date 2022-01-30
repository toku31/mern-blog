import "./header.css"
import tree from '../../img/tree_md.jpg'

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img src={tree} alt="" className="headerImg" />
    </div>
  )
}
