import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  // *** User API ***

  createUser = (uid, user) =>
    this.db
      .collection('users')
      .doc(uid)
      .set(user)

  getUser = uid =>
    this.db
      .collection('users')
      .doc(uid)
      .get()

  // *** Reviews API ***

  createReview = review => this.db.collection('reviews').add(review)

  getReviewsByUserId = uid =>
    this.db
      .collection('reviews')
      .where('userId', '==', uid)
      .get()
}

export default Firebase
