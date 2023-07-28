const express = require('express')
const { setCollectionsData, getItemIds, getPermissionIds, strapiUpdate } = require('./utils')
require('dotenv').config()
const app = express()

app.use(express.json());

let collectionsData = {}
setCollectionsData().then(data => { collectionsData = data })

app.post('/update', (req, res) => {
    const microapp = req.body.attributes
    const microappId = req.body.id
    delete microapp.icon //if icon is not removed, strapi will remove existing icon image

    microapp.languages_ = getItemIds(microapp.languages[0].name, collectionsData.languages.data)
    microapp.categories_ = getItemIds(microapp.category, collectionsData.categories.data)
    microapp.permissions_ = getPermissionIds(microapp, collectionsData.permissions.data)
    microapp.countries_ = getItemIds(microapp.countries[0].name, collectionsData.countries.data)

    strapiUpdate(microappId, microapp, token)
        .then(data => res.status(200))
        .catch(err => res.status(400))
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})