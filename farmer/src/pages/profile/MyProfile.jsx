import "./my-profile.scss";

const MyProfile = () => {
  return (
    <div id="update-profile">
      <h1 className="title">Update User</h1>

      <form action="">
        <div className="input-field">
          <label>User ID</label>
          <input type="text" value="" disabled className="disable" />
          <p className="error">ddd</p>
        </div>

        <div className="input-field">
          <label>First Name</label>
          <input type="text" value="" name="fName" />
          <p className="error"></p>
        </div>

        <div className="input-field">
          <label>Last Name</label>
          <input type="text" value="" name="lName" />
          <p className="error"></p>
        </div>

        <div className="input-field">
          <label>email</label>
          <input type="text" value="" name="email" disabled className="disable" />
          <p className="error"></p>
        </div>

        <div className="input-field">
          <button type="submit">Update</button>
        </div>
        
        <div className="input-field">
          <button type="button" className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
