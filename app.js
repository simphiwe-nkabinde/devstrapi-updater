const express = require("express");
const {
  setCollectionsData,
  getItemIds,
  getPermissionIds,
  strapiUpdate,
  setMicroAppState,
  getWhitelistArray,
  getProfileId,
} = require("./utils");
require("dotenv").config();
const path = require("path");
const axios = require("axios");

const app = express();

app.use(express.json());

let collectionsData = {};
setCollectionsData().then((data) => {
  collectionsData = data;
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/app.html"));
});

app.post("/update", async (req, res) => {
try {
  //   const dummy = await axios.get(
//     process.env.STRAPI_URL + "/api/micro-apps/1040/?populate=*"
//   );
//   const microapp = dummy.data.data.attributes;
//   const microappId = dummy.data.data.id;
const microapp = req.body.attributes
const microappId = req.body.id
delete microapp.icon; //if icon is not removed, strapi will remove existing icon image

microapp.languages_ = getItemIds(
microapp.languages[0]?.name,
collectionsData.languages.data
);
microapp.categories_ = getItemIds(
microapp.category,
collectionsData.categories.data
);
microapp.permissions_ = getPermissionIds(
microapp,
collectionsData.permissions.data
);
microapp.countries_ = getItemIds(
microapp.countries[0]?.name,
collectionsData.countries.data
);
microapp.whitelist_ = getWhitelistArray(microapp.whitelist[0]?.links)

microapp.lifecycle = await setMicroAppState(microapp, microappId);

// const profileId = await getProfileId(microapp.user_id)

const data = {
languages_: [...microapp.languages_],
categories_: [...microapp.categories_],
permissions_: [...microapp.permissions_],
countries_: [...microapp.countries_],
lifecycle: [...microapp.lifecycle],
whitelist_: [...microapp.whitelist_],
// user: Number(microapp.user_id),
// profile_: profileId
};

strapiUpdate(microappId, data)
  .then((data) => res.status(200).json({ ...data }))
  .catch((err) => res.status(400).json(err));

} catch (error) {
  return res.status(500).json({error})
}
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
