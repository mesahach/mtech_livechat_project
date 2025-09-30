/* global grecaptcha */
import { notify, handleApiError } from "./functions";
import { axiosv0, axiosv1 } from "./axios";
import { cleanCurrencyString } from "./functions";

export function validateName(name) {
if (!name.trim()) return 'Name is required';
if (name.trim().length < 2) return 'Name must be at least 2 characters long';
return null;
}

export function validatePrice(price) {
    price = cleanCurrencyString(price);
if (!price) return 'Price is required';
if (price < 1) return 'Price must be at least 1';
return null;
}

export function validateFirstName(firstName) {
if (!firstName.trim()) return 'First Name is required';
if (firstName.trim().length < 2) return 'First Name must be at least 2 characters long';
return null;
}

export function validateLastName(lastName) {
if (!lastName.trim()) return 'Last Name is required';
if (lastName.trim().length < 2) return 'Last Name must be at least 2 characters long';
return null;
}

export function validatePhone(phone) {
if (!phone.trim()) return 'Phone number is required';
if (phone.trim().length < 10) return 'Phone number must be at least 10 digits long';
return null;
}

export function validateEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email.trim()) return 'Email is required';
if (!emailRegex.test(email.trim())) return 'Invalid email format';
return null;
}

export function validateMessage(message) {
if (!message.trim()) return 'Message is required';
return null;
}

export function validatePassword(password) {
if (!password.trim()) return 'Password is required';
if (password.trim().length < 8) return 'Password must be at least 8 characters long';
return null;
}

export function validateAuthCode(authCode) {
if (!authCode.trim()) return 'Auth Code is required';
if (authCode.trim().length < 6) return 'Auth Code must be at least 6 characters long';
return null;
}

export function validateConfirmPassword(password, confirmPassword) {
if (!confirmPassword.trim()) return 'Confirm Password is required';
if (password.trim() !== confirmPassword.trim()) return 'Passwords do not match';
return null;
}

// export async function validateCaptcha() {
// if (!grecaptcha) {
//     try {
//     await loadExternalScript('https://www.google.com/recaptcha/api.js');
//     } catch (error) {
//         console.log('reCAPTCHA reset failed:', error);
//     }
//     return;
// }
// const captchaResponse = grecaptcha.getResponse();
// return captchaResponse ? null : 'Please complete the CAPTCHA verification';
// }

export function validateCaptcha() {
    if (!grecaptcha) {
        console.error('reCAPTCHA not loaded');
        return;
    }
    const captchaResponse = grecaptcha.getResponse();
    return captchaResponse ? null : 'Please complete the CAPTCHA verification';
    }

export function clearForm(setters) {
setters.setFormData({ name: '', email: '', message: '' });
setters.setErrors({ name: null, email: null, message: null, recaptcha: null });
}

export function validateLoginForm(formData, setErrors) {

const emailErr = validateEmail(formData.email);
const passwordErr = validatePassword(formData.password);

const newErrors = { 
    email: emailErr, 
    password: passwordErr 
};
setErrors(newErrors);

const isValid = !emailErr && !passwordErr;
if (!isValid) return false;

setErrors({ 
    email: null, 
    password: null 
});
return true;
}

export function validateRegisterForm(formData, setErrors) {
const errors = {};

if (!formData.firstName) errors.firstName = 'First Name is required';
if (!formData.lastName) errors.lastName = 'Last Name is required';
if (!formData.email) errors.email = 'Email is required';
// if (!formData.phone) errors.phone = 'Phone number is required';
if (!validateCaptcha()) errors.recaptcha = 'Please complete the CAPTCHA verification';

const firstNameErr = validateFirstName(formData.firstName);
const lastNameErr = validateLastName(formData.lastName);
const emailErr = validateEmail(formData.email);
// const phoneErr = validatePhone(formData.phone);
const passwordErr = validatePassword(formData.password);
const confirmPasswordErr = validateConfirmPassword(formData.password, formData.c_password);
const captchaErr = validateCaptcha();

const newErrors = { 
    firstName: firstNameErr, 
    lastName: lastNameErr, 
    email: emailErr, 
    // phone: phoneErr, 
    password: passwordErr, 
    confirmPassword: confirmPasswordErr, 
    recaptcha: captchaErr 
};
setErrors(newErrors);

const isValid = 
!firstNameErr && 
!lastNameErr && 
!emailErr && 
// !phoneErr && 
!passwordErr && 
!confirmPasswordErr && 
!captchaErr;

if (!isValid) return false;

setErrors({ 
    firstName: null, 
    lastName: null, 
    email: null, 
    // phone: null, 
    password: null, 
    confirmPassword: null, 
    recaptcha: null 
});
return true;
}

export async function registerUser(payload, setErrors, setLoading, setResult){
setResult({ type: '', message: '' });
setLoading(true);

try {
    const postData = new FormData();
    postData.append('firstname', payload.firstName);
    postData.append('lastname', payload.lastName);
    postData.append('email', payload.email);
    postData.append('password', payload.password);
    postData.append('c_password', payload.c_password);
    postData.append('phone', payload.phone);
    postData.append('g-recaptcha-response', grecaptcha.getResponse());

    const response = await axiosv1.post('registerAuth.php', postData);

    if (response.status === 200) {
    notify(response.data.message, 'success');
    setResult({ type: 'success', message: response.data.message });
    clearForm({ setFormData: d => Object.assign(payload, d), setErrors });
    // grecaptcha.reset();
    }
    return true;
} catch (error) {
    grecaptcha.reset();
    if (error.response.data?.message) {
    setResult({ type: 'error', message: error.response.data?.message || "Failed to send request" });
    }
   handleApiError(error);
   return false;
} finally {
    setLoading(false);
}
}

export async function handleRegister({ formData, setErrors, setLoading, setResult}) {
    setResult({ type: '', message: '' });
    
    if (!grecaptcha) {
        console.error('reCAPTCHA not loaded');
        return;
    }
    
    const firstNameErr = validateFirstName(formData.firstName);
    const lastNameErr = validateLastName(formData.lastName);
    const emailErr = validateEmail(formData.email);
    const phoneErr = validatePhone(formData.phone);
    const passwordErr = validatePassword(formData.password);
    const confirmPasswordErr = validateConfirmPassword(
        formData.password,
        formData.c_password
    );
    const captchaErr = validateCaptcha();
    
    const newErrors = { 
        firstName: firstNameErr, 
        lastName: lastNameErr, 
        email: emailErr, 
        phone: phoneErr, 
        password: passwordErr, 
        confirmPassword: confirmPasswordErr, 
        recaptcha: captchaErr 
    };
    setErrors(newErrors);
    
    const isValid = 
    !firstNameErr && 
    !lastNameErr && 
    !emailErr && 
    !phoneErr && 
    !passwordErr && 
    !confirmPasswordErr && 
    !captchaErr;
    if (!isValid) return;
    
    setLoading(true);
    
    try {
        const postData = new FormData();
        postData.append('firstName', formData.firstName);
        postData.append('lastName', formData.lastName);
        postData.append('email', formData.email);
        postData.append('phone', formData.phone);
        postData.append('password', formData.password);
        postData.append('c_password', formData.c_password);
        postData.append('g-recaptcha-response', grecaptcha.getResponse());
    
        const response = await axiosv0.post('register.php', postData);
    
        if (response.status === 200) {
        notify(response.data.message, 'success');
        setResult({ type: 'success', message: response.data.message });
        clearForm({ setFormData: d => Object.assign(formData, d), setErrors });
        grecaptcha.reset();
        }
    } catch (error) {
        grecaptcha.reset();
       handleApiError(error);
    } finally {
        setLoading(false);
    }
}

export async function login({ formData, setErrors, setLoading, setResult}) {
    setResult({ type: '', message: '' });
    setLoading(true);
    
    try {
        const postData = new FormData();
        postData.append('email', formData.email);
        postData.append('password', formData.password);
        const response = await axiosv1.post('login.php', postData);
        if (response.status === 200) {
            notify("Login successful", 'success');
            localStorage.setItem('userToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            console.log("userToken", localStorage.getItem("userToken"));
            clearForm({ setFormData: d => Object.assign(formData, d), setErrors });
            return true;
        }
    } catch (error) {
        setResult({ type: 'error', message: error.response.data.message });
        handleApiError(error);
        if (error.response.data?.message === "Email is not verified") {
            setResult({ type: 'warning', message: "Email is not verified" });
        }
        return false;
    } finally {
        setLoading(false);
    }
}

export async function auth({ formData, setErrors, setLoading, setResult}) {
    setResult({ type: '', message: '' });
    setLoading(true);
    
    try {
        const postData = new FormData();
        postData.append('email', formData.email);
        postData.append('auth_code', formData.authCode);
        const response = await axiosv0.post('verifyEmailAddress', postData);
        if (response.status === 200) {
            notify("Email verified successfully, you can now login", 'success');
            clearForm({ setFormData: d => Object.assign(formData, d), setErrors });
            return true;
        }
    } catch (error) {
        setResult({ type: 'error', message: error.response.data.message });
        handleApiError(error);
        return false;
    } finally {
        setLoading(false);
    }
}

export async function resendAuthCode({ formData, setErrors, setLoading, setResult}) {
    setResult({ type: '', message: '' });
    setLoading(true);
    
    try {
        const postData = new FormData();
        postData.append('value', formData.email);
        postData.append('type', 'email');
        const response = await axiosv0.post('resendCode', postData);
        if (response.status === 200) {
            notify("Auth code sent successfully", 'success');
            clearForm({ setFormData: d => Object.assign(formData, d), setErrors });
            return true;
        }
    } catch (error) {
        setResult({ type: 'error', message: error.response.data.message });
        handleApiError(error);
        return false;
    } finally {
        setLoading(false);
    }
}

