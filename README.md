# Automated Vetting, Onboarding and Compliance - DevCMS

<style type="text/css" rel="stylesheet">
span.get { color: Green; }
span.post { color: Orange; }
span.put { color: Red; }
</style>

## Background

Project forms part of the Strapi Backend Restructuring embarked on 2023. This leg of the project is responsible for updating Micro-App in the Micro-Apps Collection, where the update will involve:

1. Languages >> Languages_
2. Category >> Category_
3. Country >> Country_
4. Permissions >> Permissions_
5. Profile >> Profile_
6. User >> User_

Main focus of the update was to make use of relations, rather than nested components or JSON lookups.

## Example

Previously Languages were stored as a JSON Object. With relations in place, the languages are stored as a traditional table and referenced in the Micro-Apps collection as a relation.

### Previously

```json
{
  "languages": [
    {
      "id": "387c3c7e-353e-44e5-a907-642ae89a5fc0",
      "name": [
        "Afrikaans"
      ],
      "type": "taxonomy_term--languages"
    },
    ...
    {
      "id": "722a6a04-be2c-4aee-82f6-6cbdc1a28df1",
      "name": [
        "isiZulu"
      ],
      "type": "taxonomy_term--languages"
    }
  ]
}
```

### Update




## Overview

### High-Level

    **DRAW.IO Image**

### Low-Level

    **DRAW.IO Image**

## Configurations

1. Server Port - 3030

```javascript
server.listen(3030, () => console.log("Listing to port 3030"));
```

2. Axios Config

```javascript
let instance = await axios.create({
  jar: new tough.CookieJar();,
  withCredentials: true, // Cookie Storage
  httpsAgent: new http.Agent({
    rejectUnauthorized: false,
    requestCert: true,
    keepAlive: true,
  }), // HTTP Configured
  headers: {
    "Content-Type": "application/vnd.api+json",
  },
});
```

### Authentication

#### <span class="get">Get</span> - CSRF

##### Description

Using **AXIOS**, a validated CSRF Token is retrieved.

##### Request

```json
instance.get("http://devcms.ayoba.me/session/token")
```

##### Response

99yATziPtV21KATVwIwm-Oik4Iifo-\_S0JdJ6eCtCOM

#### APIKey

##### Description

Project makes use of an APIKey stored in the .env file. APIKey must be synchronized with the APIKey stored in the .env file of the Ayoba Developer Portal.

##### .env

APIKEY="secret-key"

#### CMS Credentials

##### Description

CMS Username and Password used to log into [DevCMS](http://devcms.ayoba.me/eng/admin/content)

##### .env

CMS_USERNAME="enter username"
CMS_PASSWORD="enter password"

#### Server Requests

##### Description

Supported Requests:

1. <span class="post">POST</span> "/"

##### Headers

Content-Type: application/json,
Accept: * */* *,
x-api-key: Valid APIKey

##### Body

```json
{
  Records: [
    {
      messageID: uuid,
      body: {
        "id": 1145,
        "Body": {
          "data": {
            "momo": true,
            "ozow": false,
            "email": false,
            "title": "E2E Deployed variation 3",
            "msisdn": false,
            "billing": false,
            "chatUri": "",
            "company": "E2E Deployed variation 3",
            "country": false,
            "domains": [

            ],
            "message": false,
            "profile": false,
            "user_id": "577",
            "category": "[\"Financial\"]",
            "contacts": false,
            "language": false,
            "location": false,
            "presence": false,
            "countries": [
              {
                "name": "[\"Spain\"]"
              }
            ],
            "developer": "E2E Deployed variation 3",
            "landscape": false,
            "languages": [
              {
                "name": "[\"Jula\"]"
              }
            ],
            "minimized": false,
            "takePhoto": false,
            "whitelist": [
              {
                "links": "[]"
              }
            ],
            "momoNumber": "",
            "user_email": "delali@thedigitalacademy.co.za",
            "description": "E2E Deployed variation 3 - E2E Deployed variation 3",
            "conversation": false,
            "discoveryUri": "http://home.com",
            "MomoCountries": {
              "ghana": "",
              "uganda": "",
              "cameroon": "+23711234344354",
              "congobrazzaville": ""
            },
            "short_description": "E2E Deployed variation 3"
          }
        },
        "Icon": {
          "Image": [
            {
              "id": 6289,
              "ext": ".jpeg",
              "url": "https://strapiayoba.s3.af-south-1.amazonaws.com/blob_7d91fcd2d4.jpeg",
              "hash": "blob_7d91fcd2d4",
              "mime": "image/jpeg",
              "name": "blob",
              "size": 21.38,
              "width": 500,
              "height": 500,
              "caption": null,
              "formats": {
                "thumbnail": {
                  "ext": ".jpeg",
                  "url": "https://strapiayoba.s3.af-south-1.amazonaws.com/thumbnail_blob_7d91fcd2d4.jpeg",
                  "hash": "thumbnail_blob_7d91fcd2d4",
                  "mime": "image/jpeg",
                  "name": "thumbnail_blob",
                  "path": null,
                  "size": 5.08,
                  "width": 156,
                  "height": 156
                }
              },
              "provider": "aws-s3",
              "updatedAt": "2023-07-19T08:57:54.091Z",
              "previewUrl": null,
              "alternativeText": null,
              "provider_metadata": null
            }
          ]
        }
      },
      status: "New",
      publishedAt: "2023-07-19T08:57:54.091Z",
      statusMessage: "",

    },

  ],

}
```

##### Response

Project server returns a JSON object indicating outcome of the request - Created or Error Messages

###### Status

201 - MicroApp Created
400 - Invalid Request Body
403 - Not Authorized
500 - Server Processing Issue

###### Body

```json
{
  "message": "No Image or Icon to Upload"
}
```

#### <span class="get">GET</span> - Images

Using **AXIOS**, the Image Icon uploaded by the user is fetched from the S3 Bucket's URL as per the Request Body.

```json
{
  ...
  "Icon": {
    "Image": [
      {
        ...
        "url": "https://strapiayoba.s3.af-south-1.amazonaws.com/,
        ...
      }
    ]
  }
}
```

##### Request

```javascript
axios.get(body.Icon.Image[0].formats.thumbnail.url, {
  responseType: "arraybuffer", // Set the response type as arraybuffer to handle binary data
});
```

##### Response

Returns the Image Fetched as an Array Buffer

```javascript
{
  status: 200,
  statusText: 'OK',
  headers: AxiosHeaders {
    ...
  }
  data: <Buffer ff d8 ff db 00 43 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c 10 17 14 18 18 17 14 16 16 1a 1d 25 1f 1a 1b 23 1c 16 ... 5025 more bytes>
}
```

#### <span class="post">POST</span> - Images

Using **AXIOS**, the Image fetched from the S3 Bucket's URL is posted to DevCMS.

##### Request

```javascript
const imageBlob = new Uint8Array(icon.data);
await instance.post(
  "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/media/icon/field_media_image",
  imageBlob,
  {
    headers: {
      "Content-Type": `application/octet-stream`,
      "Content-Disposition": `file; filename="filename.extension"`,
    },
    auth: credentials,
  }
);
```

##### Response

```javascript
{
    "jsonapi": {
        "version": "1.0",
        "meta": {
            "links": {
                "self": {
                    "href": "http://jsonapi.org/format/1.0/"
                }
            }
        }
    },
    "data": {
        "type": "file--file",
        "id": "e09f4684-bacc-41c1-98e4-ead90170adcb",
        "links": {
            "self": {
                "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/file/file/e09f4684-bacc-41c1-98e4-ead90170adcb"
            }
        },
        "attributes": {
            "drupal_internal__fid": 37484,
            "langcode": "eng",
            "filename": "DA_Test.jpg",
            "uri": {
                "value": "s3://media/icon/2023-06/DA_Test.jpg",
                "url": "http://media-cms.dev.ayoba.me/cms-root/media/icon/2023-06/DA_Test.jpg"
            },
            "filemime": "image/jpeg",
            "filesize": 7521117,
            "status": false,
            "created": "2023-06-01T08:14:57+00:00",
            "changed": "2023-06-01T08:14:57+00:00"
        },
        "relationships": {
            "uid": {
                "data": {
                    "type": "user--user",
                    "id": "a6ca04e8-3195-46de-89ec-61b0ea05b315",
                    "meta": {
                        "drupal_internal__target_id": 340
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/file/file/e09f4684-bacc-41c1-98e4-ead90170adcb/uid"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/file/file/e09f4684-bacc-41c1-98e4-ead90170adcb/relationships/uid"
                    }
                }
            }
        }
    },
    "links": {
        "self": {
            "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/file/file/e09f4684-bacc-41c1-98e4-ead90170adcb"
        }
    }
}
```

#### <span class="post">POST</span> - Confirm Images

Using **AXIOS**, the Image Upload is confirmed by posting the Image Upload Template to DevCMS and retrieving a respective Icon ID.

##### Image Upload Template

Update Template with the uploaded Image ID.

```javascript
{
  data: {
    type: "media--icon",
    attributes: {
      name: "",
    },
    relationships: {
      field_media_image: {
        data: {
          type: "file--file",
          id: "",
        },
      },
    },
  },
};
```

##### Request

```javascript
await instance.post(
  "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/media/icon",
  iconUploadTemplate,
  {
    auth: credentials,
  }
);
```

##### Response

```javascript
{
    "jsonapi": {
        "version": "1.0",
        "meta": {
            "links": {
                "self": {
                    "href": "http://jsonapi.org/format/1.0/"
                }
            }
        }
    },
    "data": {
        "type": "media--icon",
        "id": "c733d1e6-dd32-48ff-9315-8c9ab14c7c2c",
        "links": {
            "self": {
                "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c?resourceVersion=id%3A36757"
            }
        },
        "attributes": {
            "drupal_internal__mid": 36762,
            "drupal_internal__vid": 36757,
            "langcode": "eng",
            "revision_created": "2023-06-01T08:15:21+00:00",
            "revision_log_message": null,
            "status": true,
            "name": "da_test",
            "created": "2023-06-01T08:15:21+00:00",
            "changed": "2023-06-01T08:15:21+00:00",
            "default_langcode": true,
            "revision_translation_affected": true
        },
        "relationships": {
            "bundle": {
                "data": {
                    "type": "media_type--media_type",
                    "id": "f26b741a-492e-4d4e-a923-053ae7931c8c",
                    "meta": {
                        "drupal_internal__target_id": "icon"
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/bundle?resourceVersion=id%3A36757"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/relationships/bundle?resourceVersion=id%3A36757"
                    }
                }
            },
            "revision_user": {
                "data": null,
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/revision_user?resourceVersion=id%3A36757"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/relationships/revision_user?resourceVersion=id%3A36757"
                    }
                }
            },
            "uid": {
                "data": {
                    "type": "user--user",
                    "id": "a6ca04e8-3195-46de-89ec-61b0ea05b315",
                    "meta": {
                        "drupal_internal__target_id": 340
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/uid?resourceVersion=id%3A36757"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/relationships/uid?resourceVersion=id%3A36757"
                    }
                }
            },
            "thumbnail": {
                "data": {
                    "type": "file--file",
                    "id": "e09f4684-bacc-41c1-98e4-ead90170adcb",
                    "meta": {
                        "alt": null,
                        "title": null,
                        "width": 4032,
                        "height": 3024,
                        "drupal_internal__target_id": 37484
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/thumbnail?resourceVersion=id%3A36757"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/relationships/thumbnail?resourceVersion=id%3A36757"
                    }
                }
            },
            "field_media_image": {
                "data": {
                    "type": "file--file",
                    "id": "e09f4684-bacc-41c1-98e4-ead90170adcb",
                    "meta": {
                        "alt": null,
                        "title": null,
                        "width": 4032,
                        "height": 3024,
                        "drupal_internal__target_id": 37484
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/field_media_image?resourceVersion=id%3A36757"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/media/icon/c733d1e6-dd32-48ff-9315-8c9ab14c7c2c/relationships/field_media_image?resourceVersion=id%3A36757"
                    }
                }
            }
        }
    },
    "links": {
        "self": {
            "href": "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/media/icon"
        }
    }
}
```

#### <span class="post">POST</span> - Create MicroApp

Using **AXIOS**, the requested MicroApp is created by posting the Create MicroApp Template to DevCMS and retrieving a respective MicroApp ID.

##### Image Upload Template

Update Template with the MicroApp Request Data.

```javascript
{
  data: {
    type: "node--microapp",
    attributes: {
      title: "",
      body: {
        value: "",
        summary: "",
      },
      status: true,
      field_developer: "",
      field_momo: false,
      field_momo_phone: "",
      field_allow_multipage: true,
      field_ozow_max_amount: 0,
      field_ozow_min_amount: 0,
      field_ozow_pay: false,
      field_ozow_sitecode: "ABC-XYZ-000",
      field_chat_uri: "",
      field_discovery_uri: "",
      field_user_permissions: [],
      field_use_ayoba_ux_overlay: false,
      field_use_ozow_ux_overlay: false,
      field_contains_purchases: false,
      "field_enable_disclaimer": true,
      field_domains: [],
    },
    relationships: {
      field_languages_term: {
        data: [],
      },
      field_category: {
        data: [],
      },
      field_countries_term: {
        data: [],
      },
      field_image: {
        data: {
          type: "file--file",
          id: "",
        },
      },
      field_media_image: {
        data: {
          type: "media--icon",
          id: "",
        },
      },
    },
  },
};
```

##### Request

```javascript
{
  "data": {
    "type": "node--microapp",
    "attributes": {
      "title": "Postman Test 5",
      "body": {
        "value": "Postman Test 5 - Postman Test 5",
        "summary": "Postman Test 5"
      },
      "status": true,
      "field_developer": "Postman Test 5",
      "field_momo": true,
      "field_momo_phone": "",
      "field_ozow_max_amount": 0,
      "field_ozow_min_amount": 0,
      "field_ozow_pay": true,
      "field_ozow_sitecode": "ABC-XYZ-000",
      "field_chat_uri": "",
      "field_discovery_uri": "http://home.com",
      "field_user_permissions": [
        "MSISDN",
        "Location",
        "SendMessage",
        "UserProfile",
        "UserPresence",
        "UserLanguage",
        "MoMoCollections",
        "Contacts",
        "Email",
        "Conversation",
        "TakePhoto",
        "Country"
      ],
      "field_use_ayoba_ux_overlay": false,
      "field_use_ozow_ux_overlay": false,
      "field_contains_purchases": false,
      "field_domains": [
        
      ],
      "field_adv_momo_phone": [
        {
          "country": "Ghana",
          "calling_code": "+233",
          "phone": "13423413413"
        },
        {
          "country": "Uganda",
          "calling_code": "+256",
          "phone": "2453455425"
        },
        {
          "country": "Cameroon",
          "calling_code": "+237",
          "phone": "11234344354"
        },
        {
          "country": "Congo (Brazzaville)",
          "calling_code": "+242",
          "phone": "14432423423"
        }
      ]
    },
    "relationships": {
      "field_languages_term": {
        "data": [
          {
            "type": "taxonomy_term--languages",
            "id": "9d2c668b-5df2-4fd7-9201-86585b31b4de"
          },
          {
            "type": "taxonomy_term--languages",
            "id": "1dc564d4-60da-4184-850f-d3e1b3211ce0"
          }
        ]
      },
      "field_category": {
        "data": [
          {
            "type": "taxonomy_term--category",
            "id": "7f26b86b-6c0d-463b-aaee-b343406c90f6"
          },
          {
            "type": "taxonomy_term--category",
            "id": "6a21761b-76ff-4923-915b-079f85d150aa"
          }
        ]
      },
      "field_countries_term": {
        "data": [
          {
            "type": "taxonomy_term--countries",
            "id": "ac0f6c31-af59-4c39-9a21-9e5508381922"
          },
          {
            "type": "taxonomy_term--countries",
            "id": "e497b677-7b0b-4be5-9f99-1753a32c5123"
          },
          {
            "type": "taxonomy_term--countries",
            "id": "650218bc-31f0-4446-824a-4ab2c960d56d"
          },
          {
            "type": "taxonomy_term--countries",
            "id": "4abc2014-b32c-4b46-a076-3d432008af7b"
          },
          {
            "type": "taxonomy_term--countries",
            "id": "79bc0b33-2a53-4f94-a65d-057300c44188"
          }
        ]
      },
      "field_image": {
        "data": {
          "type": "file--file",
          "id": "fa8f3d14-1fc6-47fd-a694-b608d016fcf0"
        }
      },
      "field_media_image": {
        "data": {
          "type": "media--icon",
          "id": "aa852805-cd59-4707-9b57-3cc981a4e3af"
        }
      }
    }
  }
}
```

##### Response

```javascript
{
    "jsonapi": {
        "version": "1.0",
        "meta": {
            "links": {
                "self": {
                    "href": "http://jsonapi.org/format/1.0/"
                }
            }
        }
    },
    "data": {
        "type": "node--microapp",
        "id": "6afcfbfb-3629-4d1e-86dc-9bec39a50644",
        "links": {
            "self": {
                "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644?resourceVersion=id%3A103061"
            }
        },
        "attributes": {
            "drupal_internal__nid": 83750,
            "drupal_internal__vid": 103061,
            "langcode": "eng",
            "revision_timestamp": "2023-06-01T08:32:32+00:00",
            "revision_log": null,
            "status": true,
            "title": "DelaGames",
            "created": "2023-06-01T08:32:32+00:00",
            "changed": "2023-06-01T08:32:32+00:00",
            "promote": false,
            "sticky": false,
            "default_langcode": true,
            "revision_translation_affected": true,
            "moderation_state": null,
            "publish_on": null,
            "unpublish_on": null,
            "publish_state": null,
            "unpublish_state": null,
            "content_translation_source": "und",
            "content_translation_outdated": false,
            "field_countries_for_none_registe": [],
            "field_no_registration": false,
            "body": {
                "value": "Game Description for testing on postman with defined endpoints",
                "format": null,
                "processed": "<p>Game Description for testing on postman with defined endpoints</p>\n",
                "summary": null
            },
            "field_adv_momo_phone": [],
            "field_allow_minimized": false,
            "field_allow_multipage": false,
            "field_chat_uri": null,
            "field_contains_purchases": false,
            "field_countries": [
                "SD",
                "ZA"
            ],
            "field_default_permissions": [],
            "field_developer": "Delali Funani",
            "field_discovery_uri": "http://helloworld.com",
            "field_domains": [],
            "field_enable_disclaimer": true,
            "field_landscape": false,
            "field_languages": [],
            "field_momo": false,
            "field_momo_phone": null,
            "field_ozow_max_amount": null,
            "field_ozow_min_amount": null,
            "field_ozow_pay": null,
            "field_ozow_sitecode": null,
            "field_publication_date": "2023-06-01T10:32:32+02:00",
            "field_user_permissions": [
                "MSISDN",
                "Location",
                "SendMessage",
                "UserProfile",
                "UserPresence",
                "UserLanguage",
                "Contacts",
                "Email",
                "Conversation",
                "TakePhoto",
                "Country"
            ],
            "field_use_ayoba_ux_overlay": false,
            "field_use_ozow_ux_overlay": false,
            "field_use_proxy": false,
            "field_visibility": false
        },
        "relationships": {
            "node_type": {
                "data": {
                    "type": "node_type--node_type",
                    "id": "1eed9113-3a11-4e38-8f77-97a0e92a3b57",
                    "meta": {
                        "drupal_internal__target_id": "microapp"
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/node_type?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/node_type?resourceVersion=id%3A103061"
                    }
                }
            },
            "revision_uid": {
                "data": {
                    "type": "user--user",
                    "id": "a6ca04e8-3195-46de-89ec-61b0ea05b315",
                    "meta": {
                        "drupal_internal__target_id": 340
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/revision_uid?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/revision_uid?resourceVersion=id%3A103061"
                    }
                }
            },
            "uid": {
                "data": {
                    "type": "user--user",
                    "id": "a6ca04e8-3195-46de-89ec-61b0ea05b315",
                    "meta": {
                        "drupal_internal__target_id": 340
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/uid?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/uid?resourceVersion=id%3A103061"
                    }
                }
            },
            "field_category": {
                "data": [
                    {
                        "type": "taxonomy_term--category",
                        "id": "6a21761b-76ff-4923-915b-079f85d150aa",
                        "meta": {
                            "drupal_internal__target_id": 61
                        }
                    }
                ],
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/field_category?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/field_category?resourceVersion=id%3A103061"
                    }
                }
            },
            "field_countries_term": {
                "data": [
                    {
                        "type": "taxonomy_term--countries",
                        "id": "9cf6d88d-1f68-4188-acca-0dccb021bc15",
                        "meta": {
                            "drupal_internal__target_id": 53
                        }
                    },
                    {
                        "type": "taxonomy_term--countries",
                        "id": "4abc2014-b32c-4b46-a076-3d432008af7b",
                        "meta": {
                            "drupal_internal__target_id": 54
                        }
                    }
                ],
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/field_countries_term?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/field_countries_term?resourceVersion=id%3A103061"
                    }
                }
            },
            "field_image": {
                "data": {
                    "type": "file--file",
                    "id": "290a1733-91a7-45ee-860e-3ea7395fff92",
                    "meta": {
                        "alt": null,
                        "title": null,
                        "width": null,
                        "height": null,
                        "drupal_internal__target_id": 37485
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/field_image?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/field_image?resourceVersion=id%3A103061"
                    }
                }
            },
            "field_internal_tags": {
                "data": [],
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/field_internal_tags?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/field_internal_tags?resourceVersion=id%3A103061"
                    }
                }
            },
            "field_languages_term": {
                "data": [
                    {
                        "type": "taxonomy_term--languages",
                        "id": "387c3c7e-353e-44e5-a907-642ae89a5fc0",
                        "meta": {
                            "drupal_internal__target_id": 22
                        }
                    },
                    {
                        "type": "taxonomy_term--languages",
                        "id": "9d2c668b-5df2-4fd7-9201-86585b31b4de",
                        "meta": {
                            "drupal_internal__target_id": 25
                        }
                    },
                    {
                        "type": "taxonomy_term--languages",
                        "id": "1dc564d4-60da-4184-850f-d3e1b3211ce0",
                        "meta": {
                            "drupal_internal__target_id": 37
                        }
                    }
                ],
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/field_languages_term?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/field_languages_term?resourceVersion=id%3A103061"
                    }
                }
            },
            "field_media_image": {
                "data": {
                    "type": "media--icon",
                    "id": "167a1858-4da0-4b42-9303-42bb142eba10",
                    "meta": {
                        "drupal_internal__target_id": 36763
                    }
                },
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/field_media_image?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/field_media_image?resourceVersion=id%3A103061"
                    }
                }
            },
            "field_section": {
                "data": [],
                "links": {
                    "related": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/field_section?resourceVersion=id%3A103061"
                    },
                    "self": {
                        "href": "http://devcms.ayoba.me/eng/jsonapi/15c1ad2ea0d3/node/microapp/6afcfbfb-3629-4d1e-86dc-9bec39a50644/relationships/field_section?resourceVersion=id%3A103061"
                    }
                }
            }
        }
    },
    "links": {
        "self": {
            "href": "http://devcms.ayoba.me/jsonapi/15c1ad2ea0d3/node/microapp"
        }
    }
}
```

### Run Locally

1. Build Docker Image\
  ```docker build -t lambda .```

2. Run Docker Image\
  ```docker run -p 3030:3030 lambda```

### Dev-Strapi

##### Update Strapi Collections

Message Queue:\
    1. [voc-automation-messagelog](https://devstrapi.thedigitalacademy.co.za/admin/content-manager/collectionType/api::voc-automation-messagelog.voc-automation-messagelog?page=1&pageSize=10&sort=messageID:ASC)

On Success:\
    2. [publish-micro-app](https://devstrapi.thedigitalacademy.co.za/admin/content-manager/collectionType/api::publish-micro-app.publish-micro-app?page=1&pageSize=10&sort=microAppId:ASC)