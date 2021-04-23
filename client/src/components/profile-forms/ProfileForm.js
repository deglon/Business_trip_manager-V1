import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  registrationNumber: '',
  passport: '',
  RIB: '',
  grade: '',
  location: '',
  Departement:''
  
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);



  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    registrationNumber,
    RIB,
    location,
    grade,
    passport,
    Departement,

  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="grade" value={grade} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Associate">Associate</option>
            <option value="Cheif executive">Cheif executive</option>
            <option value="DAF">DAF</option>
            <option value="Facility Agent">Facility Agent</option>
            <option value="Facility Manager">Facility Manager</option>
            <option value="Financial agent">Financial agent</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Select your grade
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Registration Number"
            name="registrationNumber"
            value={registrationNumber}
            onChange={onChange}
          />
          <small className="form-text">
            Your registration number in the company
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="RIB"
            name="RIB"
            value={RIB}
            onChange={onChange}
          />
          <small className="form-text">
            Your bank RIB
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            City & state suggested
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Departement"
            name="Departement"
            value={Departement}
            onChange={onChange}
          />
          <small className="form-text">
            Please mention the departement you work in
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Passport Number"
            name="passport"
            value={passport}
            onChange={onChange}
          />
          <small className="form-text">
            Please mention your passport number
          </small>
        </div>

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
