import { auth } from 'firebase/app';

/** サインイン */
export function signIn() {
    try {
        let provider = new auth.OAuthProvider('microsoft.com');
        provider.addScope('user.read');
        auth().signInWithRedirect(provider);
    }
    catch(ex)
    {
        alert(ex);
    }
}

/** サインアウト */
export function signOut() {
    try {
        auth().signOut();
    }
    catch(ex)
    {
        alert(ex);
    }
}