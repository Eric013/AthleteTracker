import React from 'react';
import Alert from 'react-s-alert';
import Unauthorized from '../../../common/components/Unauthorized/Unauthorized.js';

export default class AddAdmissions extends React.Component{
  handleSubmit(e){
    e.preventDefault();

    const admissionsUserName = this.refs.admissionsUserName.value;
    const admissionsFirstName = this.refs.admissionsFirstName.value;
    const admissionsLastName = this.refs.admissionsLastName.value;
    const admissionsEmail = this.refs.admissionsEmail.value;
    const admissionsPassword = this.refs.admissionsPassword.value;
    const confirmAdmissionsPassword = this.refs.confirmAdmissionsPassword.value;

    if(admissionsPassword == confirmAdmissionsPassword){
      Meteor.call("AddAdmissions", {admissionsUserName, admissionsFirstName, admissionsLastName, admissionsEmail, admissionsPassword}, (error) => {
        if(error){
          Alert.error(error.reason, {
              position: 'bottom',
              effect: 'stackslide',
              timeout: 3000
          });
        }

        else{
          FlowRouter.go("/currentAdmissions");
          Alert.success("Admissions Agent Added Successfully!", {
              position: 'bottom',
              effect: 'stackslide',
              timeout: 3000
          });
        }
      });
    }
    else{
      Alert.error("The two passwords you entered should match.", {
        position: 'bottom',
        effect: 'stackslide',
        timeout: 3000
      });
    }
  }

  render(){
    if(Roles.userIsInRole(Meteor.userId(), "coach")){
      return(
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card">
              <div className="card-content black-text">
                <span className="card-title">
                  Add Admissions Agent
                </span>

                <form onSubmit={this.handleSubmit.bind(this)}>

                  <div className="row">
                    <div className="col s12">
                      <input
                        type="text"
                        ref="admissionsUserName"
                        className="validate"
                        placeholder="Username"
                        minLength={2}
                        required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12 m6 l6">
                      <input
                        type="text"
                        ref="admissionsFirstName"
                        className="validate"
                        placeholder="First Name"
                        minLength={2}
                        required />
                    </div>

                    <div className="col s12 m6 l6">
                      <input
                        type="text"
                        ref="admissionsLastName"
                        className="validate"
                        placeholder="Last Name"
                        minLength={2}
                        required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <input
                        type="text"
                        ref="admissionsEmail"
                        className="validate"
                        placeholder="Email"
                        minLength={2}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <input
                        type="password"
                        ref="admissionsPassword"
                        className="validate"
                        placeholder="Password"
                        minLength={2}
                        required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <input
                        type="password"
                        ref="confirmAdmissionsPassword"
                        className="validate"
                        placeholder="Confirm Password"
                        minLength={2}
                        required />
                    </div>
                  </div>

                  <button
                    className="btn waves-effect login grey"
                    type="submit">
                    Add Admissions Agent
                  </button>

                </form>

              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
        <Unauthorized />
      );
    }
  }
}
