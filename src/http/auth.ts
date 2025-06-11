import Cookies from "js-cookie";

const TokenKey = "token";

const getToken = () => {
	return Cookies.get(TokenKey);
};

const setToken = (token: any) => {
	return Cookies.set(TokenKey, token);
};

const removeToken = () => {
	return Cookies.remove(TokenKey);
};
export {getToken, setToken, removeToken};
