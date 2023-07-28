const axios = require('axios')
require('dotenv').config()

const baseUrl = process.env.STRAPI_URL;

exports.setCollectionsData = async function () {
    const collectionData = {}
    collectionData.categories = await fetchQuery("api/categories");
    collectionData.languages = await fetchQuery("api/language-items");
    collectionData.permissions = await fetchQuery("api/permission-items");
    collectionData.countries = await fetchQuery("api/countries");
    return collectionData
}

const fetchQuery = async function (path) {
    let url = `${baseUrl}/${path}`;
    return await axios
        .get(url)
        .then((data) => data.data)
        .catch((err) => err.message);
}
/**
 * returns collection items IDs. 
 * returned value is an array of language IDs that match selected languages
 * @param {string} selectedItems JSON Array
 * @param {[{id: number, attributes: {name: string}}]} collectionData 
 * @returns {[number]}
 */
exports.getItemIds = function (selectedItems, collectionData) {
    if (typeof selectedItems !== 'string') return []
    if (!selectedItems.length) return []
    if (!Array.isArray(collectionData)) return []
    if (!collectionData.length) return []

    const list = collectionData.filter(item => {
        if (selectedItems.toLocaleLowerCase().includes(item.attributes.name.toLocaleLowerCase())) return item.id
    })
    return list.map(item => item.id)
}
/**
 * return selected permission ids
 * returned value is an array of permission IDs that match selected permissions
 * @param {{}} microappInfo microapp data
 * @param {[{id: number, name: string}]} permissionData 
 * @returns {[number]}
 */
exports.getPermissionIds = function (microappInfo, permissionData) {
    if (typeof microappInfo !== 'object') return []
    if (!Array.isArray(permissionData)) return []
    if (!permissionData.length) return []

    const list = []
    permissionData.forEach(item => {
        if (microappInfo[item.attributes.name] === true) {
            list.push(item.id)
        }
    })
    return list
}
exports.strapiUpdate = async function (id, microapp, token) {
    if (!id) return
    if (!microapp) return
    // if (!token) return

    return await axios
        .put(`${baseUrl}/api/micro-apps/${id}`, {data:microapp}, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {return Promise.resolve(data.data)})
        .catch((err) => {return Promise.reject(err)});
}