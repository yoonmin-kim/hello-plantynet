import axios from "axios";

export async function get(path) {
    const res = await fetch(path);
    const data = res.json();
    return data;
}

export async function post(path, object) {
    const res = await axios.post(path, object)
    return res;
}

export async function put(path, object) {
    const res = await axios.put(path, object)
    return res;
}

export async function deleteItem(path, object) {
    const res = await axios.delete(`${path}/${object}`);
    return res;
}