import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./ajaxServices";

export const apiGet = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosGet(url, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export const apiPost = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosPost(url, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const apiPut = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosPut(url, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const apiDelete = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosDelete(url, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};