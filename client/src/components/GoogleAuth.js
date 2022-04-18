import React, { Component } from "react";
import { connect } from 'react-redux';
import {signIn, signOut} from '../actions'

class GoogleAuth extends Component {
    //Inicijaliziramo samo jednom
    componentDidMount() {
        //loadujemo libary i inicijaliziramo korisnika (Asinhrono je i treba da provjerimo jel sve ok jer init vraca promiss)
        window.gapi.load('client:auth', () => {
            
            window.gapi.client.init({
                clientId: "60605035333-5kgtfqpfm4nrbt4i0b5sejrs0lmdr11g.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                    </button>
                )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                    </button>
                )
        }
    }
    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    };
};

const mapsStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapsStateToProps, {signIn, signOut})(GoogleAuth);