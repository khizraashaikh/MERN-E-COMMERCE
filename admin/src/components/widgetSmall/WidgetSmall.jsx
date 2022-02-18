import "./WidgetSmall.css";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../utils/requestMethods";

export default function WidgetSmall() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await userRequest.get("users/?new=true");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="widgetSmall">
      <span className="widgetSmallTitle">New Join Members</span>
      <ul className="widgetSmallList">
        {users.map((user) => (
          <li className="widgetSmallListItem" key={user._id}>
            <img
              src={
                user?.img ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt=""
              className="widgetSmallImage"
            />
            <div className="widgetSmallUser">
              <span className="widgetSmallUsername">{user?.username}</span>
            </div>
            <button className="widgetSmallButton">
              <Visibility className="widgetSmallIcon" /> Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
