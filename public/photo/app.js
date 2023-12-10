const firebaseConfig = {
  apiKey: "AIzaSyBRCXDAiJUi8cMvFS6pXJwa9nFOIfkwvos",
  authDomain: "circlechat-ce68f.firebaseapp.com",
  databaseURL: "https://circlechat-ce68f-default-rtdb.firebaseio.com",
  projectId: "circlechat-ce68f",
  storageBucket: "circlechat-ce68f.appspot.com",
  messagingSenderId: "760966902174",
  appId: "1:760966902174:web:6a2e97b7251daf12e8668f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services
const storage = firebase.storage();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// HTML element references
const signInButton = document.getElementById('sign-in-button');
const uploadButton = document.getElementById('upload-button');
const photoFileInput = document.getElementById('photo-file');
const photoGrid = document.getElementById('photo-grid');
const photoContainer = document.getElementById('photo');
const captionElement = document.getElementById('caption');
const photoSelectedMessage = document.getElementById('photo-messages');

// Function to update UI based on user's authentication state
function updateUI(user) {
  if (user) {
    // User is signed in
    signInButton.textContent = `Sign Out (${user.displayName})`;
    uploadButton.disabled = false;
  } else {
    // User is signed out
    signInButton.textContent = 'Sign In with Google';
    uploadButton.disabled = true;
  }
}

// Function to create a modal and display a larger version of the clicked photo
function openPhotoModal(photoUrl) {
  // Create a modal container
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  // Create an image element for the larger photo
  const modalPhoto = document.createElement('img');
  modalPhoto.src = photoUrl;
  modalPhoto.classList.add('modal-photo');

  // Append the image to the modal container
  modalContainer.appendChild(modalPhoto);

  // Add the modal container to the body
  document.body.appendChild(modalContainer);

  // Close the modal when clicking outside the image
  modalContainer.addEventListener('click', () => {
    document.body.removeChild(modalContainer);
  });
}

// Function to update the photo grid with the latest photos
function updatePhotoGrid() {
  // Clear existing content in the photo grid
  photoGrid.innerHTML = "";

  // Reference to the root of your Firebase Storage
  const storageRef = storage.ref();

  // Reference to the photos folder
  const photosRef = storageRef.child('photos');

  // List all items in the photos folder
  photosRef.listAll().then((result) => {
    result.items.forEach((item) => {
      // Get the download URL for each photo
      item.getDownloadURL().then((photoUrl) => {
        // Create an image element for each photo and append it to the photo grid
        const imgElement = document.createElement('img');
        imgElement.src = photoUrl;
        imgElement.classList.add('grid-photo');

        // Add a click event listener to open the photo in a modal
        imgElement.addEventListener('click', () => {
          openPhotoModal(photoUrl);
        });

        photoGrid.appendChild(imgElement);
      });
    });
  }).catch((error) => {
    console.error('Error fetching photos:', error);
  });
}

// Event listener for file input change
photoFileInput.addEventListener('change', () => {
  const selectedFile = photoFileInput.files[0];
  if (selectedFile) {
    // Display the "Photo selected" message
    displayPhotoMessage('Photo selected');
  } else {
    displayPhotoMessage('');
  }
});

// Event listener for sign-in button click
signInButton.addEventListener('click', () => {
  if (auth.currentUser) {
    // If the user is already signed in, sign them out
    auth.signOut();
  } else {
    // If the user is not signed in, initiate the sign-in process
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user;
        console.log('Signed in user:', user);
        updateUI(user);
        updatePhotoGrid();
      })
      .catch((error) => {
        // Handle errors
        console.error('Google sign-in error:', error.message);
      });
  }
});

// Event listener for upload button click
uploadButton.addEventListener('click', () => {
  const photoFile = photoFileInput.files[0];
  if (!photoFile) {
    console.error('No photo selected');
    return;
  }

  const storageRef = storage.ref();
  const photoRef = storageRef.child(`photos/${photoFile.name}`);

  photoRef.put(photoFile)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(photoUrl => {
      // Display the "Photo uploaded successfully" message
      displayPhotoMessage('Photo uploaded successfully', 'upload-complete');

      // Reset the file input and label
      photoFileInput.value = '';
      document.getElementById('file-label-text').textContent = 'Choose a Photo';

      // Update the photo grid
      updatePhotoGrid();
    })
    .catch(error => {
      // Handle photo upload errors
      console.error('Photo upload error:', error.message);
    });
});

// Function to display photo messages
function displayPhotoMessage(message, className) {
  photoSelectedMessage.textContent = message;
  photoSelectedMessage.className = className || '';

  // Clear the message after a delay
  setTimeout(() => {
    photoSelectedMessage.textContent = '';
    photoSelectedMessage.className = '';
  }, 3000); // Adjust the delay as needed
}

// Listen for user changes
auth.onAuthStateChanged(user => {
  // Update UI based on user's authentication state
  updateUI(user);

  // If the user is signed in, update the photo grid
  if (user) {
    updatePhotoGrid();
  }
});
