import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource for Entra ID SAML integration
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      saml: {
        name: "AutodeskEntraIDSAML",
        metadata: {
          metadataType: "URL",
          metadataContent: "https://login.microsoftonline.com/67bff79e-7f91-4433-a8e5-c9252d2ddc1d/federationmetadata/2007-06/federationmetadata.xml?appid=5f242a76-d9fd-41fe-9aa6-e66e57664782",
        },
        attributeMapping: {
          email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
          givenName: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
          familyName: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
          // Map additional attributes as needed
          preferredUsername: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
        },
      },
      logoutUrls: [
        "http://localhost:3000/",
        "http://localhost:3000/come-back-soon"
      ],
      callbackUrls: [
        "http://localhost:3000/",
        "http://localhost:3000/profile"
      ],
    },
  },
});
