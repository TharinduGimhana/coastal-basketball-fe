import { message } from "antd";
import axios from "axios";
import { SYSTEM_ERROR, errorMessage } from "constants/global";
import Toast from "components/Toast/Toast";

export const axiosGet = (url, param) => {
    let token = localStorage.getItem('token');
    const pathAndQuery = window.location.pathname + window.location.search;
    if (pathAndQuery.includes("admin/")) {
        token = localStorage.getItem('admin_token');
    }

    return new Promise((resolve, reject) => {
        try {
            axios
                .get(url,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    })
                .then((res) => {
                    const { data } = res;
                    if (data.status === "success") {
                        resolve(data.data);
                    } else if (data.status == "token_failed") {
                        Toast(data.message, 2);
                        localStorage.removeItem('token');
                        localStorage.removeItem('admin_token');
                        setTimeout(() => {
                            if (window.location.pathname.includes("/admin")) {
                                window.location.href = "/admin/login"
                            } else {
                                window.location.href = "/signin"
                            }
                        }, 1500)
                    } else {
                        reject(data.message);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(SYSTEM_ERROR);
        }
    });
};

export const axiosPost = (url, param) => {
    let token = localStorage.getItem('token');
    const pathAndQuery = window.location.pathname + window.location.search;
    if (pathAndQuery.includes("admin/")) {
        token = localStorage.getItem('admin_token');
    }

    return new Promise((resolve, reject) => {
        try {
            axios
                .post(url, param, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then((res) => {
                    const { data } = res;
                    if (data.status === "success") {
                        resolve(data.data);
                    } else {
                        if (data.status == "token_failed") {
                            Toast(data.message, 2);
                            localStorage.removeItem('token');
                            localStorage.removeItem('admin_token');
                            setTimeout(() => {
                                if (window.location.pathname.includes("/admin")) {
                                    window.location.href = "/admin/login"
                                } else {
                                    window.location.href = "/signin"
                                }
                            }, 1500)
                        } else {
                            reject(data.message);
                        }
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(SYSTEM_ERROR);
        }
    });
};

export const axiosPut = (url, param) => {
    let token = localStorage.getItem('token');
    const pathAndQuery = window.location.pathname + window.location.search;
    if (pathAndQuery.includes("admin/")) {
        token = localStorage.getItem('admin_token');
    }

    return new Promise((resolve, reject) => {
        try {
            axios
                .put(url, param, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then((res) => {
                    const { data } = res;
                    if (data.status === "success") {
                        resolve(data.data);
                    } else if (data.status == "token_failed") {
                        Toast(data.message, 2);
                        localStorage.removeItem('token');
                        localStorage.removeItem('admin_token');
                        setTimeout(() => {
                            if (window.location.pathname.includes("/admin")) {
                                window.location.href = "/admin/login"
                            } else {
                                window.location.href = "/signin"
                            }
                        }, 1500)
                    } else {
                        reject(data.message);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(SYSTEM_ERROR);
        }
    });
};
export const axiosDelete = (url, param) => {
    let token = localStorage.getItem('token');
    const pathAndQuery = window.location.pathname + window.location.search;
    if (pathAndQuery.includes("admin/")) {
        token = localStorage.getItem('admin_token');
    }

    return new Promise((resolve, reject) => {
        try {
            axios
                .delete(url, {
                    data: param,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                })
                .then((res) => {
                    const { data } = res;
                    if (data.status === "success") {
                        resolve(data);
                    } else if (data.status == "token_failed") {
                        Toast(data.message, 2);
                        localStorage.removeItem('token');
                        localStorage.removeItem('admin_token');
                        setTimeout(() => {
                            if (window.location.pathname.includes("/admin")) {
                                window.location.href = "/admin/login"
                            } else {
                                window.location.href = "/signin"
                            }
                        }, 1500)
                    } else {
                        reject(data.message);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(SYSTEM_ERROR);
        }
    });
};
