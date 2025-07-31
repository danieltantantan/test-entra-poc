# Customer Support Portal - Entra ID SAML Setup Guide

This guide walks you through setting up the Customer Support Portal with Autodesk Entra ID SAML authentication using AWS Amplify Gen 2, based on the [official AWS documentation](https://docs.amplify.aws/react/build-a-backend/auth/examples/microsoft-entra-id-saml/).

## Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js 18+ and npm
- Access to Autodesk Entra ID tenant (admin rights)
- Azure portal access

## Step 1: Deploy Initial Amplify Backend

First, let's deploy the Amplify backend to get the Cognito domain:

```bash
# Install dependencies
npm install

# Start the sandbox environment
npm run sandbox
```

After deployment, copy the `domain` value from the generated `amplify_outputs.json` file. It will look like:
```
"domain": "<some-hash>.auth.us-east-1.amazoncognito.com"
```

**Keep this terminal running** - we'll need the sandbox active for the full setup.

## Step 2: Configure Entra ID Enterprise Application

### 2.1 Create Enterprise Application
1. Navigate to [portal.azure.com](https://portal.azure.com)
2. Go to **Entra ID** → **Enterprise Applications**
3. Click **New application**
4. Select **Create your own application**
5. Name: `Customer Support Portal - SAML`
6. Choose **Integrate any other application you don't find in the gallery (Non-gallery)**

### 2.2 Configure Single Sign-On
1. In your new enterprise application, click **Single sign-on**
2. Select **SAML**
3. In **Basic SAML Configuration**, click **Edit** and enter:

| Field | Value |
|-------|-------|
| **Identifier (Entity ID)** | `urn:amazon:cognito:sp:<your-cognito-user-pool-id>` |
| **Reply URL** | `https://<your-cognito-domain>/saml2/idpresponse` |
| **Logout URL** | `https://<your-cognito-domain>/saml2/logout` |

**Example values:**
- Identifier: `urn:amazon:cognito:sp:us-east-1_ABC123def`
- Reply URL: `https://abc123xyz.auth.us-east-1.amazoncognito.com/saml2/idpresponse`
- Logout URL: `https://abc123xyz.auth.us-east-1.amazoncognito.com/saml2/logout`

### 2.3 Get Federation Metadata URL
1. Go to **Step 3: SAML Certificates**
2. Copy the **App Federation Metadata Url**
3. Save this URL - you'll need it for the next step

## Step 3: Update Amplify Auth Configuration

1. Open `amplify/auth/resource.ts` in your code editor
2. Replace `PLACEHOLDER_METADATA_URL` with your actual metadata URL from Step 2.3:

```typescript
metadataContent: "https://login.microsoftonline.com/your-tenant-id/federationmetadata/2007-06/federationmetadata.xml?appid=your-app-id",
```

3. Save the file
4. The sandbox will automatically detect changes and redeploy

## Step 4: Optional - Upload Cognito Signing Certificate

For enhanced security, you can upload the Cognito signing certificate to Entra ID:

1. In AWS Console, go to **Cognito** → **User Pools** → Your pool
2. Find the **AutodeskEntraIDSAML** identity provider
3. Click **View signing certificate** and download as `.crt`
4. Rename the file extension from `.crt` to `.cer`
5. In Azure portal, go back to your SAML configuration
6. Under **Step 3: SAML Certificates** → **Verification Certificates**, click **Edit**
7. Check **Require verification certificates** and upload the `.cer` file

## Step 5: Test the Application

1. Start the frontend development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)
3. Click **Sign In with Autodesk Entra ID**
4. You should be redirected to Entra ID login
5. After successful authentication, you'll be redirected back to the app

## Step 6: Assign Users and Test

### 6.1 Assign Users to the Application
1. In Azure portal, go to your enterprise application
2. Click **Users and groups**
3. Click **Add user/group**
4. Select the users or groups that should have access

### 6.2 Test Different Users
- Test with different user accounts
- Verify user information is displayed correctly
- Check that authentication flow works end-to-end

## Troubleshooting

### Common Issues

#### 1. SAML Response Validation Failed
**Problem**: Users can't sign in, getting validation errors
**Solution**: 
- Verify the Entity ID exactly matches the format: `urn:amazon:cognito:sp:<user-pool-id>`
- Ensure Reply URL exactly matches your Cognito domain
- Check that the metadata URL is accessible

#### 2. Redirect URI Mismatch
**Problem**: Users get redirect URI errors
**Solution**:
- Verify the Reply URL in Entra ID matches your Cognito domain exactly
- Ensure the URL format is: `https://<domain>/saml2/idpresponse`

#### 3. User Attributes Not Mapping
**Problem**: User information not showing in the app
**Solution**:
- Check the attribute mapping in `amplify/auth/resource.ts`
- Verify Entra ID is sending the expected claims
- Use browser developer tools to inspect the SAML response

#### 4. Amplify Outputs Not Found
**Problem**: Frontend can't find `amplify_outputs.json`
**Solution**:
- Ensure the sandbox is running (`npm run sandbox`)
- Check that `amplify_outputs.json` is generated in the project root
- Restart the frontend dev server after backend changes

### Debugging Tips

1. **Check Browser Console**: Look for detailed error messages
2. **Verify Metadata URL**: Open the metadata URL in browser to ensure it's accessible
3. **Use SAML Tracer**: Browser extension to see SAML requests/responses
4. **Check Cognito Logs**: View logs in AWS CloudWatch for authentication errors

## Production Deployment

When ready for production:

1. **Update URLs**: Replace localhost URLs with your production domain in:
   - `amplify/auth/resource.ts` (callbackUrls and logoutUrls)
   - Entra ID Enterprise Application (Reply URLs)

2. **Deploy to Production**:
```bash
npm run deploy
```

3. **Update Entra ID**: After deployment, update the Reply URLs in Entra ID with your production Amplify domain

## Security Considerations

1. **Certificate Verification**: Upload and require Cognito signing certificates in Entra ID
2. **User Access**: Regularly audit which users have access to the enterprise application
3. **Attribute Mapping**: Only map necessary user attributes
4. **Session Management**: Configure appropriate session timeouts in both Cognito and Entra ID

## Architecture Overview

```
User → Entra ID → SAML Response → AWS Cognito → JWT Token → React App
```

1. User clicks "Sign In"
2. Redirected to Entra ID
3. User authenticates with Entra ID
4. Entra ID sends SAML response to Cognito
5. Cognito validates SAML and issues JWT tokens
6. User is redirected back to React app with tokens
7. React app uses tokens for authenticated requests

## Next Steps

After successful authentication setup:

1. **Add User Groups**: Configure group-based access control
2. **API Integration**: Connect to backend APIs with Cognito authorization
3. **Audit Logging**: Implement CloudWatch logging for security events
4. **User Management**: Build admin interfaces for user management
5. **Monitoring**: Set up CloudWatch dashboards and alarms

## Support

- **AWS Amplify Documentation**: [AWS Amplify Auth Docs](https://docs.amplify.aws/react/build-a-backend/auth/)
- **Entra ID Documentation**: [Microsoft Entra ID SAML Docs](https://docs.microsoft.com/en-us/azure/active-directory/)
- **Troubleshooting**: Check AWS CloudWatch logs and browser developer console 