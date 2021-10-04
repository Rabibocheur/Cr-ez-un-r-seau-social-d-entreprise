export default (to, from, next) => {
    if(!localStorage.getItem('user') || !localStorage.getItem('token')){
        next({ name: 'Login' });
        return false;
    }
    return next();
}