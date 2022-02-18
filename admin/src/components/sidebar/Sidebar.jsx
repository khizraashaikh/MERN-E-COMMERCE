import "./Sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import {Link} from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarlistItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarlistItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarlistItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link"> 
            <li className="sidebarlistItem">
              <PermIdentity className="sidebarIcon" />
              Users
            </li>
            </Link>
            <Link to="/products" className="link"> 
            <li className="sidebarlistItem">
              <Storefront className="sidebarIcon" />
              Products
            </li>
            </Link>
            <li className="sidebarlistItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarlistItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarlistItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarlistItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarlistItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarlistItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarlistItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarlistItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
