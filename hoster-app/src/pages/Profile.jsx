import '../styles/Profile.css';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import defaultImage from '../assets/UploadPic.png';
import { useContext } from 'react';
import { HosterContext } from '../contexts/HosterContext.jsx';

function Profile() {
  const { hosterData } = useContext(HosterContext);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="scrollable">
          <div className="dashboard-body">
            <img
              src={defaultImage}
              alt="Profile"
              className="profile-avatar"
            />
            <h2>{hosterData.firstName} {hosterData.lastName}</h2>
            <p>Event Organizer</p>
          </div>

          <div className="dashboard-body">
            <p>
              Reference site about Lorem Ipsum, giving information on its
              origins, as well as a random Lipsum generator. Reference site
              about Lorem Ipsum, giving information on its origins, as well as
              a random Lipsum generator.
            </p>
          </div>

          <div className="portfolio-grid">
            {hosterData.portfolio?.map((file, index) =>
              file.type.startsWith('image/') ? (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`portfolio-${index}`}
                  className="portfolio-image"
                />
              ) : (
                <div key={index} className="file-box">
                  {file.name}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
