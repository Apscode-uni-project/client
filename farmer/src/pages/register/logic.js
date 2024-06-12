export const loginValidation = (fName, lName, email, password, confirmPassword) => {
    const errors = {
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    
    if (!fName) {
        errors.fName = "First Name is required";
    }
    
    if (!lName) {
        errors.lName = "Last Name is required";
    }
    
    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email address is invalid";
    }
    
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password = "Password needs to be 6 characters or more";
    }
    
    if (!confirmPassword) {
        errors.confirmPassword = "Password is required";
    } else if (confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match";
    }
    
    return errors;
};