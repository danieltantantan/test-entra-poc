# Deploy Entra ID SAML App via AWS Amplify Console

Since you don't have CDK bootstrap permissions, use the AWS Amplify Console for deployment.

## Prerequisites
- Access to AWS Amplify Console
- Your code in a Git repository (GitHub, GitLab, etc.)

## Step 1: Push Code to Git Repository

1. Initialize git in your project:
```bash
git init
git add .
git commit -m "Initial Entra ID SAML integration"
```

2. Push to GitHub/GitLab:
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 2: Deploy via Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Connect your Git provider (GitHub/GitLab)
4. Select your repository and branch
5. Amplify will auto-detect the build settings

## Step 3: Configure Environment Variables

In the Amplify Console, add these environment variables:
- `_LIVE_UPDATES`: `[{"name":"Amplify CLI","pkg":"@aws-amplify/cli","type":"npm","version":"latest"}]`

## Step 4: Deploy Backend First

1. In Amplify Console, go to **"Backend environments"**
2. Click **"Create backend environment"**
3. Name it `production` or `staging`
4. Amplify will automatically deploy your auth resources

## Step 5: Get Cognito Domain

After backend deployment:
1. Go to **"Backend environments"** → **"Authentication"**
2. Copy the **Cognito Domain URL** (format: `https://xxxxx.auth.region.amazoncognito.com`)
3. Note the **User Pool ID** and **App Client ID**

## Step 6: Configure Entra ID

Update your Entra ID app registration:

1. **Reply URLs**: Add your Cognito domain:
   ```
   https://xxxxx.auth.region.amazoncognito.com/saml2/idpresponse
   ```

2. **Logout URL**: Add:
   ```
   https://xxxxx.auth.region.amazoncognito.com/logout
   ```

## Step 7: Test Your App

1. Go to your Amplify app URL (shown in console)
2. Click "Sign in with Autodesk Entra ID"
3. You should be redirected to Entra ID login

## Troubleshooting

If you get authentication errors:
- Check the Cognito domain in Entra ID Reply URLs
- Verify the SAML metadata URL is accessible
- Check CloudWatch logs in the Amplify Console

## Alternative: Ask Your AWS Admin

If Amplify Console deployment also fails, ask your AWS administrator to:

1. **Bootstrap CDK** in your account:
   ```bash
   npx cdk bootstrap aws://ACCOUNT-ID/REGION
   ```

2. **Grant you amplify permissions**:
   - `AWSAmplifyFullAccess`
   - `IAMFullAccess` (for Cognito setup)
   - `CloudFormationFullAccess`

3. **Or deploy for you** using these commands:
   ```bash
   npm install
   npx ampx sandbox --once
   ```

The admin can then provide you with the generated `amplify_outputs.json` file. 