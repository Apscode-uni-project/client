export const LoginValidation = (email, password) => {
    let errors = {
        email: '',
        password: ''
    };

    if (!email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
    }

    if (!password) {
        errors.password = 'Password is required';
    } 

    return errors;

}