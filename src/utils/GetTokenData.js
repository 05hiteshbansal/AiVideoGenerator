import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token").value || '';
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.JWTSECRET);
        console.log(decodedToken)
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }

}