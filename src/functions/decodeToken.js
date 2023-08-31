import jwtDecode from 'jwt-decode';
const decodeToken = (token) => {
    let output = null;
    try{
        output = jwtDecode(token);
    }catch(err){
        output = null;
    }
    return output;
}
export default decodeToken;