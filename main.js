// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDpNmH2It6fPAqx8HhoRCjhiFM9MR4e7gE",
  authDomain: "khoobrixchatroom.firebaseapp.com",
  databaseURL: "https://khoobrixchatroom-default-rtdb.firebaseio.com",
  projectId: "khoobrixchatroom",
  storageBucket: "khoobrixchatroom.firebasestorage.app",
  messagingSenderId: "749575141514",
  appId: "1:749575141514:web:56664908ce1592b6af9573"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const userListContainer = document.getElementById('user-list');

auth.onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    const email = user.email;

    // Add user to database if not present
    const userRef = database.ref('users/' + uid);
    userRef.once('value').then(snapshot => {
      if (!snapshot.exists()) {
        userRef.set({
          email: email,
          joinedAt: Date.now()
        });
      }
    });

    // Load users list and display
    loadUsers();
  } else {
    // Not logged in, redirect to login page
    window.location.href = 'index.html';
  }
});

function loadUsers() {
  const usersRef = database.ref('users');
  usersRef.on('value', snapshot => {
    const users = snapshot.val();
    userListContainer.innerHTML = '';

    if (!users) {
      userListContainer.textContent = 'No users found.';
      return;
    }

    for (const uid in users) {
      const user = users[uid];
      const div = document.createElement('div');
      div.textContent = user.email;
      userListContainer.appendChild(div);
    }
  });
}
