# 🚀 Manual Deployment Guide - Customer Support Portal

This guide covers manual deployment of your Customer Support Portal with Entra ID SAML authentication.

## 📦 What's in This Package

Your zip file contains a complete AWS Amplify Gen 2 application with:

✅ **Pre-configured Entra ID Integration** with your actual metadata URL  
✅ **Modern React Frontend** with TypeScript and Vite  
✅ **Complete Documentation** including setup guides  
✅ **Production-ready Configuration** for AWS deployment  

## 🔧 Your Entra ID Configuration (Already Applied)

The following values from your Entra ID setup are already configured in the code:

- **Tenant ID**: `67bff79e-7f91-4433-a8e5-c9252d2ddc1d`
- **App ID**: `5f242a76-d9fd-41fe-9aa6-e66e57664782`
- **Metadata URL**: `https://login.microsoftonline.com/67bff79e-7f91-4433-a8e5-c9252d2ddc1d/federationmetadata/2007-06/federationmetadata.xml?appid=5f242a76-d9fd-41fe-9aa6-e66e57664782`

## 🚀 Deployment Options

### Option 1: AWS Amplify Console (Recommended)

1. **Upload to GitHub/GitLab/Bitbucket**:
   ```bash
   # Extract the zip file
   # Push to your Git repository
   git init
   git add .
   git commit -m "Initial Customer Support Portal with Entra ID SAML"
   git push origin main
   ```

2. **Deploy via Amplify Console**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your Git repository
   - Amplify will automatically detect the configuration

### Option 2: AWS CLI Deployment

1. **Configure AWS CLI**:
   ```bash
   aws configure
   # Enter your AWS Access Key ID, Secret, Region, and Output format
   ```

2. **Deploy Backend**:
   ```bash
   npm install
   npx ampx sandbox  # For development
   # OR
   npx ampx deploy   # For production
   ```

3. **Deploy Frontend**:
   ```bash
   npm run build
   # Upload build files to S3 or use Amplify Hosting
   ```

### Option 3: Manual AWS Resource Creation

If you prefer to create resources manually:

1. **Create Cognito User Pool**
2. **Configure SAML Identity Provider**
3. **Set up Amplify Hosting**
4. **Configure API Gateway (if needed)**

## 📋 Complete Entra ID Configuration Steps

Once you have your AWS Cognito domain from deployment, complete the Entra ID setup:

### Step 1: Get Cognito Domain
After deployment, you'll get a Cognito domain like:
```
https://abc123xyz.auth.us-east-1.amazoncognito.com
```

### Step 2: Update Entra ID SAML Configuration
In your [Entra ID Enterprise Application](https://portal.azure.com/?Microsoft_Azure_PIMCommon=true#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Overview/objectId/1993fd8a-c0ef-46c8-b46a-6c9cfb62474d/appId/5f242a76-d9fd-41fe-9aa6-e66e57664782/preferredSingleSignOnMode~/null/servicePrincipalType/Application/fromNav/):

1. **Go to Single sign-on → SAML**
2. **Edit Basic SAML Configuration**:

| Field | Value |
|-------|-------|
| **Identifier (Entity ID)** | `urn:amazon:cognito:sp:YOUR_USER_POOL_ID` |
| **Reply URL** | `https://YOUR_COGNITO_DOMAIN/saml2/idpresponse` |
| **Logout URL** | `https://YOUR_COGNITO_DOMAIN/saml2/logout` |

**Example**:
- Identifier: `urn:amazon:cognito:sp:us-east-1_ABC123def`
- Reply URL: `https://abc123xyz.auth.us-east-1.amazoncognito.com/saml2/idpresponse`
- Logout URL: `https://abc123xyz.auth.us-east-1.amazoncognito.com/saml2/logout`

### Step 3: Assign Users
1. **Go to Users and groups**
2. **Click Add user/group**
3. **Select users who should have access**

## 🔍 Testing Your Deployment

1. **Start the frontend** (after backend deployment):
   ```bash
   npm run dev
   ```

2. **Open** [http://localhost:3000](http://localhost:3000)

3. **Click "Sign In with Autodesk Entra ID"**

4. **Verify**:
   - ✅ Redirects to Entra ID login
   - ✅ User can authenticate
   - ✅ User is redirected back to app
   - ✅ User information is displayed

## 📁 File Structure Overview

```
csp-entra-saml-app/
├── amplify/                    # AWS Amplify backend configuration
│   ├── auth/resource.ts       # SAML auth configuration (pre-configured)
│   └── backend.ts             # Backend definition
├── src/                       # React frontend application
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Entry point with Amplify configuration
│   └── *.css                 # Styling files
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
├── SETUP_GUIDE.md            # Detailed setup instructions
├── README.md                 # Project overview
└── DEPLOYMENT_GUIDE.md       # This file
```

## 🔧 Key Configuration Files

### 1. `amplify/auth/resource.ts`
Pre-configured with your Entra ID metadata URL and attribute mappings.

### 2. `src/main.tsx`
Handles Amplify configuration and error handling for missing outputs.

### 3. `package.json`
Includes all necessary dependencies and deployment scripts.

## 🚨 Important Notes

1. **AWS Credentials**: Ensure your AWS credentials have appropriate permissions
2. **Entra ID Permissions**: Verify admin consent is granted for all required permissions
3. **URL Matching**: Redirect URIs must match exactly between Entra ID and Cognito
4. **Testing**: Test with multiple users from different groups

## 🔐 Security Checklist

- [ ] AWS IAM policies follow least privilege principle
- [ ] Entra ID app has minimal required permissions
- [ ] HTTPS enforced for all endpoints
- [ ] Audit logging enabled
- [ ] Regular review of user access

## 📞 Support & Troubleshooting

### Common Issues:

1. **SAML Validation Errors**: Check Entity ID format
2. **Redirect URI Mismatch**: Verify exact URL matching
3. **Missing User Attributes**: Check attribute mapping configuration
4. **Authentication Failures**: Verify metadata URL accessibility

### Documentation:
- **AWS Amplify**: [Official Docs](https://docs.amplify.aws/)
- **Entra ID SAML**: [Microsoft Docs](https://docs.microsoft.com/en-us/azure/active-directory/)
- **Setup Guide**: See `SETUP_GUIDE.md` in this package

## 🎯 Next Steps

After successful deployment:

1. **Configure Production URLs** in both Amplify and Entra ID
2. **Set up CI/CD Pipeline** for automated deployments
3. **Implement User Groups** for role-based access control
4. **Add API Endpoints** for customer support functionality
5. **Set up Monitoring** with CloudWatch and alerts

---

**Ready to deploy!** Choose your preferred deployment method above and follow the steps. Your Entra ID configuration is already complete in the code. 