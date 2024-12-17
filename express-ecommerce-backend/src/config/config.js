// const awsConfig = {
//   // region: process.env.AWS_REGION || "us-east-1",
//   region: "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     sessionToken: process.env.AWS_SESSION_TOKEN,
//   },
// };

// module.exports = awsConfig;

const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function awsConfig() {
    const secretName = 'ECommerceProjectSecrets';

    try {
        const AWS_REGION = 'us-east-1';
        const secretsManagerClient = new SecretsManagerClient({ region: AWS_REGION });  
        const command = new GetSecretValueCommand({ SecretId: secretName });
        const response = await secretsManagerClient.send(command);

        let creds;
        if(response.SecretString) {
          creds = JSON.parse(response.SecretString);
        }
        creds = JSON.parse(Buffer.from(response.SecretBinary, 'base64').toString('utf-8'));

        return {
          region: "us-east-1",
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN,
          },
        }
    } catch (error) {
        console.error('Failed to load secrets to environment:', error.message);
        return {
          region: "us-east-1",
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken: process.env.AWS_SESSION_TOKEN,
          },
        }
    }
}

module.exports = awsConfig;
