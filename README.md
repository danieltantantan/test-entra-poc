# Customer Support Portal (CSP) - Entra ID SAML

A modern Customer Support Portal with Autodesk Entra ID SAML authentication built using AWS Amplify Gen 2.

## 🚀 Features

- **Secure Authentication**: SAML integration with Autodesk Entra ID
- **Modern UI**: Responsive React application with beautiful design
- **AWS Amplify Gen 2**: Latest Amplify features with TypeScript-first development
- **Real-time Auth Events**: Seamless authentication state management
- **Enterprise Ready**: Built for enterprise security and compliance

## 🏗️ Architecture

```
Autodesk Entra ID → SAML → AWS Cognito → JWT → React Application
```

- **Frontend**: React with TypeScript + Vite
- **Authentication**: AWS Cognito with Entra ID SAML federation
- **Hosting**: AWS Amplify Hosting
- **State Management**: AWS Amplify Auth with React hooks

## 📋 Prerequisites

- Node.js 18+
- AWS CLI configured
- Access to Autodesk Entra ID tenant
- Azure portal access

## 🛠️ Quick Start

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Start Backend Sandbox**
   ```bash
   npm run sandbox
   ```

3. **Configure Entra ID SAML** (see [SETUP_GUIDE.md](./SETUP_GUIDE.md))

4. **Start Frontend**
   ```bash
   npm run dev
   ```

5. **Open Application**
   ```
   http://localhost:3000
   ```

## 📚 Documentation

- **[Setup Guide](./SETUP_GUIDE.md)**: Complete configuration instructions
- **[AWS Amplify Docs](https://docs.amplify.aws/react/build-a-backend/auth/examples/microsoft-entra-id-saml/)**: Official SAML integration guide

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run sandbox` - Start Amplify sandbox
- `npm run deploy` - Deploy to production

## 🔧 Configuration

### Amplify Auth Configuration
The authentication is configured in `amplify/auth/resource.ts`:

```typescript
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      saml: {
        name: "AutodeskEntraIDSAML",
        metadata: {
          metadataType: "URL",
          metadataContent: "YOUR_METADATA_URL",
        },
        attributeMapping: {
          email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
          name: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
          // ... additional mappings
        },
      },
      // ... callback and logout URLs
    },
  },
});
```

### Frontend Usage
Sign in with SAML provider:

```typescript
import { signInWithRedirect } from 'aws-amplify/auth';

await signInWithRedirect({
  provider: { custom: 'AutodeskEntraIDSAML' }
});
```

## 🔐 Security Features

- **SAML 2.0**: Industry standard authentication protocol
- **Certificate Validation**: Optional Cognito signing certificate verification
- **Session Management**: Secure token handling with automatic refresh
- **Attribute Mapping**: Configurable user attribute mapping from Entra ID

## 🚀 Deployment

### Development
```bash
npm run sandbox  # Start development environment
npm run dev      # Start frontend development server
```

### Production
```bash
npm run deploy   # Deploy to AWS Amplify
```

## 📁 Project Structure

```
csp-entra-saml-app/
├── amplify/
│   ├── auth/
│   │   └── resource.ts      # Auth configuration
│   └── backend.ts           # Backend definition
├── src/
│   ├── App.tsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── SETUP_GUIDE.md          # Detailed setup instructions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

- **Setup Issues**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **AWS Amplify**: [Official Documentation](https://docs.amplify.aws/)
- **Entra ID**: [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)

## ✨ What's Next

- [ ] Add user group-based access control
- [ ] Implement API integration with Cognito authorization
- [ ] Add audit logging and monitoring
- [ ] Build admin user management interfaces
- [ ] Add comprehensive testing

---

Built with ❤️ using AWS Amplify Gen 2 and React
