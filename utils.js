const axios = require("axios");
require("dotenv").config();

const baseUrl = process.env.STRAPI_URL;

const states = [
  "development",
  "requested to publish",
  "awaiting documents",
  "vetting",
  "failed",
  "published",
  "suspended",
  "deleted",
  "unpublished",
];

exports.setCollectionsData = async function () {
  const collectionData = {};
  collectionData.categories = await fetchQuery("api/categories");
  collectionData.languages = await fetchQuery("api/language-items");
  collectionData.permissions = await fetchQuery("api/permission-items");
  collectionData.countries = await fetchQuery("api/countries");
  return collectionData;
};

const fetchQuery = async function (path) {
  let url = `${baseUrl}/${path}`;
  return await axios
    .get(url)
    .then((data) => data.data)
    .catch((err) => err.message);
};
/**
 * returns collection items IDs.
 * returned value is an array of language IDs that match selected languages
 * @param {string} selectedItems JSON Array
 * @param {[{id: number, attributes: {name: string}}]} collectionData
 * @returns {[number]}
 */
exports.getItemIds = function (selectedItems, collectionData) {
  if (typeof selectedItems !== "string") return [];
  if (!selectedItems.length) return [];
  if (!Array.isArray(collectionData)) return [];
  if (!collectionData.length) return [];

  const list = collectionData.filter((item) => {
    if (
      selectedItems
        .toLocaleLowerCase()
        .includes(item.attributes.name.toLocaleLowerCase())
    )
      return item.id;
  });
  return list.map((item) => item.id);
};
/**
 * return selected permission ids
 * returned value is an array of permission IDs that match selected permissions
 * @param {{}} microappInfo microapp data
 * @param {[{id: number, name: string}]} permissionData
 * @returns {[number]}
 */
exports.getPermissionIds = function (microappInfo, permissionData) {
  if (typeof microappInfo !== "object") return [];
  if (!Array.isArray(permissionData)) return [];
  if (!permissionData.length) return [];

  const list = [];
  permissionData.forEach((item) => {
    if (microappInfo[item.attributes.name] === true) {
      list.push(item.id);
    }
  });
  return list;
};
/**
 * coverts json array to array of objects with url property
 * @param {JSON} jsonWhitelist JSON string array
 * @returns {[{url: string}]}
 */
exports.getWhitelistArray = function (jsonWhitelist) {
  if (!isJSON(jsonWhitelist)) {
    if (typeof jsonWhitelist == 'string') return [{url: jsonWhitelist}]
    else return []
  }
  const strArr = JSON.parse(jsonWhitelist);
  if (!Array.isArray(strArr)) return []
  return strArr.map(item => ({ url: item }))
}
exports.strapiUpdate = async function (id, microapp) {
  if (!id) return;
  if (!microapp) return;

  return await axios
    .put(`${baseUrl}/api/micro-apps/${id}`, { data: microapp })
    .then((data) => {
      return Promise.resolve(data.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.setMicroAppState = async (microapp, id) => {
  const requests = await getRequests(id);
  return states
    .map((state) => {
      switch (state) {
        case "development":
          return returnTemplate(state, "", microapp?.createdAt || null);
        case "published":
          if (!microapp.published) return null;
          return returnTemplate(state, "", microapp?.live_date || null);
        case "suspended":
          if (!microapp.suspended) return null;
          return returnTemplate(state, microapp?.suspension_reason || "", microapp?.suspension_date || null);
        case "deleted":
          if (!microapp.deleted) return null;
          return returnTemplate(state, "", microapp?.updatedAt || null);
        case "requested to publish":
          if (!requests.hasOwnProperty("attributes")) return null;
          return returnTemplate(state, "", microapp?.rtp_date || null);
        default:
          return null;
      }
    })
    .filter((state) => state);
};

function returnTemplate(state, comment, date) {
  return {
    comment: comment,
    status: state,
    date: date,
  };
}

async function getRequests(id) {
  const result = await axios.get(
    process.env.STRAPI_URL +
    "/api/publication-requests?populate=*&filters[microapp_id][$eq]=" +
    id
  );
  return result.data?.data[0] || {};
}


function logError(appId, error) {
  File.writeFile(
    'sds',
    JSON.stringify(error),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  )
}

/**
 * returns true if value is JSON string else returns false
 * @param {*} value
 * @returns {Boolean}
 */
function isJSON(value) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}