import { Auth } from 'aws-amplify';

export const getUserName = async function() {
  return Auth.currentUserInfo()
    .then(response => {
      return response.username;
    })
    .catch(error => {
      console.log('Error while getting user info: ', error);
    });
};

export const signOut = function() {
  Auth.signOut(true)
    .then(res => console.log('Signout: ', res))
    .catch(err => console.log('Signout error: ', err));
};
