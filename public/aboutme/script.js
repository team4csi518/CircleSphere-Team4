// Function to check if the user is logged in
function isLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

// Function to check if a user exists based on full name
function userExists(fullName) {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  return storedUsers.some(user => user.fullName === fullName);
}

// Function to get user data based on full name
function getUserData(fullName) {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  return storedUsers.find(user => user.fullName === fullName);
}

// Function to save user data
function saveUserData(user) {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const existingUserIndex = storedUsers.findIndex(u => u.fullName === user.fullName);

  if (existingUserIndex !== -1) {
    // Update existing user data
    storedUsers[existingUserIndex] = user;
  } else {
    // Add new user data
    storedUsers.push(user);
  }

  localStorage.setItem("users", JSON.stringify(storedUsers));
}

// Function to convert the uploaded photo to data URL
function convertPhotoToDataURL(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

// Function to load and show user data on page load
function loadAndShowUserData() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    const userData = getUserData(loggedInUser);
    showUserData(userData);
    populateEditForm(userData);
  }
}

// Function to update photo in local storage
function updatePhotoInLocalStorage(photoDataURL) {
  localStorage.setItem("userPhoto", photoDataURL);
}

// Event listener for file input change
document.getElementById("file-input").addEventListener("change", function (event) {
  // Handle profile photo change
  const file = event.target.files[0];
  if (file) {
    convertPhotoToDataURL(file, function (photoDataURL) {
      document.getElementById("profile-image").src = photoDataURL;
      updatePhotoInLocalStorage(photoDataURL); // Update photo in local storage
    });
  }
});

// Event listener for the profile photo click
document.getElementById("profile-photo-container").addEventListener("click", function () {
  document.getElementById("file-input").click();
});

// Event listener for the edit button
document.getElementById("edit-button").addEventListener("click", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!isLoggedIn() && loggedInUser) {
    // User is not logged in, but there's a logged-in user from a previous session
    const userData = getUserData(loggedInUser);
    populateEditForm(userData);
    document.getElementById("edit-section").style.display = "block";
  } else if (!isLoggedIn()) {
    // Show login form
    document.getElementById("login-form").style.display = "block";
  } else {
    // User is already logged in, show the specific user's data
    const userData = getUserData(loggedInUser);
    populateEditForm(userData);
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("edit-section").style.display = "block";
  }
});

// Event listener for the save button
document.getElementById("save-button").addEventListener("click", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    // User is logged in, get existing data
    const existingUserData = getUserData(loggedInUser);

    // Get input values
    const newFullName = getInputValue("full-name-input");
    const newBio = getInputValue("bio-input");
    const newWorksAt = getInputValue("works-at-input");
    const newEducationBackground = getInputValue("education-background-input");
    const newUniversity = getInputValue("university-input");
    const newBirthday = getInputValue("birthday-input");
    const newLivesAt = getInputValue("lives-at-input");
    const newFrom = getInputValue("from-input");

    // Update only the changed fields
    existingUserData.fullName = newFullName;
    existingUserData.bio = newBio;
    existingUserData.worksAt = newWorksAt;
    existingUserData.educationBackground = newEducationBackground;
    existingUserData.university = newUniversity;
    existingUserData.birthday = newBirthday;
    existingUserData.livesAt = newLivesAt;
    existingUserData.from = newFrom;

    // Get the saved photo data URL from local storage
    const userPhoto = localStorage.getItem("userPhoto");
    existingUserData.photo = userPhoto;

    // Save the updated user data
    saveUserData(existingUserData);

    // Update the text content and photo
    showUserData(existingUserData);

    // Hide the edit section after saving changes
    document.getElementById("edit-section").style.display = "none";
  }
});

// Function to populate the edit form with existing data
function populateEditForm(userData) {
  if (userData) {
    document.getElementById("full-name-input").value = userData.fullName;
    document.getElementById("bio-input").value = userData.bio;
    document.getElementById("works-at-input").value = userData.worksAt;
    document.getElementById("education-background-input").value = userData.educationBackground;
    document.getElementById("university-input").value = userData.university;
    document.getElementById("birthday-input").value = userData.birthday;
    document.getElementById("lives-at-input").value = userData.livesAt;
    document.getElementById("from-input").value = userData.from;

    // Set the photo
    document.getElementById("profile-image").src = userData.photo || "your-default-photo.jpg";
  }
}

// Function to show user data
function showUserData(userData) {
  if (userData) {
    document.getElementById("full-name").innerText = userData.fullName;
    document.getElementById("bio").innerText = userData.bio;
    document.getElementById("works-at").innerText = "Works at: " + userData.worksAt;
    document.getElementById("education-background").innerText = "Education Background: " + userData.educationBackground;
    document.getElementById("university").innerText = "University: " + userData.university;
    document.getElementById("birthday").innerText = "Birthday: " + userData.birthday;
    document.getElementById("lives-at").innerText = "Lives at: " + userData.livesAt;
    document.getElementById("from").innerText = "From: " + userData.from;

    // Set the photo
    document.getElementById("profile-image").src = userData.photo || "your-default-photo.jpg";
  }
}

// Function to clear input values
function clearInputValues() {
  // Clear input values
  document.getElementById("full-name-input").value = "";
  document.getElementById("bio-input").value = "";
  document.getElementById("works-at-input").value = "";
  document.getElementById("education-background-input").value = "";
  document.getElementById("university-input").value = "";
  document.getElementById("birthday-input").value = "";
  document.getElementById("lives-at-input").value = "";
  document.getElementById("from-input").value = "";
}

// Function to get input value by element ID
function getInputValue(inputId) {
  return document.getElementById(inputId).value;
}

// Load and show user data on page load
loadAndShowUserData();
