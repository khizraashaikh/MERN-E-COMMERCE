import "./NewUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="Aquib" />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Aquib Shaikh"
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="AquibShaikh@gmail.com"
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Some$tronPa$$w@rd"
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="+1 234 567 891"
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            placeholder="Pune | INDIA"
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              className="newUserInput"
              id="male"
              value="Male"
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              className="newUserInput"
              id="female"
              value="Female"
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              className="newUserInput"
              id="others"
              value="Other"
            />
            <label htmlFor="others">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select name="active" id="active" className="newUserSelect">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
