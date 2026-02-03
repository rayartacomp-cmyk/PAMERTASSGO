// Check authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const userNameElement = document.getElementById('userName');
        const loginLink = document.getElementById('loginLink');
        const registerLink = document.getElementById('registerLink');
        const logoutLink = document.getElementById('logoutLink');
        const adminLink = document.getElementById('adminLink');
        
        if (userNameElement) {
            userNameElement.textContent = user.displayName || user.email;
            userNameElement.style.display = 'inline';
        }
        
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'inline';
        
        // Check if user is admin
        checkAdminStatus(user.uid);
    }
});

// Login function
function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Register function
function register(email, password, displayName) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update display name
            return userCredential.user.updateProfile({
                displayName: displayName
            });
        });
}

// Logout function
function logout() {
    return auth.signOut();
}

// Check admin status
async function checkAdminStatus(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists && userDoc.data().isAdmin) {
            const adminLink = document.getElementById('adminLink');
            if (adminLink) {
                adminLink.style.display = 'inline';
            }
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
    }
}

// Forgot password
function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
}

// Update user profile
function updateProfile(displayName, photoURL) {
    const user = auth.currentUser;
    return user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
    });
}

// Change password
function changePassword(newPassword) {
    const user = auth.currentUser;
    return user.updatePassword(newPassword);
}

// Send email verification
function sendEmailVerification() {
    const user = auth.currentUser;
    return user.sendEmailVerification();
}