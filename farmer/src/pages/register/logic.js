export const loginValidation = (fName, lName, email, nic, password, confirmPassword) => {
    const errors = {
        fName: "",
        lName: "",
        email: "",
        nic: "",
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

    if (!nic) {
        errors.nic = "NIC is required";
    } else if (nic.length < 10) {
        errors.nic = "NIC needs to be 10 characters or more";
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