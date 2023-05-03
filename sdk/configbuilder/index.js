const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const File = require('../file');

module.exports = class ConfigBuilder {
  constructor() {
    if (process.env.ENVIRONMENT === '') {
      throw new Error('Environment variable is not set');
    }

    this.gcpSecretClient = new SecretManagerServiceClient({
      credentials: {
        private_key: process.env.GCP_SERVICE_ACCOUNT_PRIVATE_KEY,
        client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
      },
    });
  }

  // Read config file from GCP secret manager
  buildConfig = async () => {
    const gcpSecretDir = `projects/${process.env.GCP_PROJECT_ID}/secrets/${
      process.env.GCP_SECRET_NAME
    }/versions/${process.env.GCP_VERSION || 'latest'}`;

    const [secretResponse] = await this.gcpSecretClient.accessSecretVersion({
      name: gcpSecretDir,
    });

    const decodedSecretString = secretResponse.payload.data.toString('utf8');
    const secret = JSON.parse(decodedSecretString);

    File.write(
      __dirname,
      '../../etc/config.json',
      JSON.stringify(secret, null, 2),
    );
  };
};
