
export const validation = (data, errors) => {
    if (!data.fName) {
        errors.fName = 'First Name is required';
    } else {
        errors.fName = '';
    }
    
    if (!data.lName) {
        errors.lName = 'Last Name is required';
    } else {
        errors.lName = '';
    }
    
    if (!data.nic) {
        errors.nic = 'NIC is required';
    } else {
        errors.nic = '';
    }
    
    return errors;
};