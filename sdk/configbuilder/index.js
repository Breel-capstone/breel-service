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
    if (process.env.ENVIRONMENT == 'development') {
      const gcpSecretDir = `projects/${process.env.GCP_PROJECT_ID}/secrets/${
        process.env.GCP_SECRET_NAME
      }/versions/${process.env.GCP_VERSION || 'latest'}`;

      const [secretResponse] = await this.gcpSecretClient.accessSecretVersion({
        name: gcpSecretDir,
      });

      const decodedSecretString = secretResponse.payload.data.toString('utf8');
      secret = JSON.parse(decodedSecretString);
    } else if (process.env.ENVIRONMENT == 'staging') {
      secret = JSON.parse(process.env.CONFIG_JSON);
    }

    File.write(
      __dirname,
      '../../etc/config.json',
      JSON.stringify(secret, null, 2),
    );
  };

  buildSequelizeConfig = (globalConfig) => {
    const sequelizeConfigPath = '../../etc/sequelize-config.json';
    if (
      globalConfig.SQL.ORM == 'sequelize' &&
      !File.isExist(__dirname, sequelizeConfigPath)
    ) {
      const sequelizeConfig = {
        username: globalConfig.SQL.Username,
        password: globalConfig.SQL.Password,
        database: globalConfig.SQL.Database,
        host: globalConfig.SQL.Host,
        dialect: globalConfig.SQL.Dialect,
        benchmark: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      };

      if (process.env.ENVIRONMENT == 'development') {
        sequelizeConfig.dialectOptions = undefined;
      }

      File.write(
        __dirname,
        sequelizeConfigPath,
        JSON.stringify(
          {
            development: sequelizeConfig,
            test: sequelizeConfig,
            production: sequelizeConfig,
          },
          null,
          2,
        ),
      );
    }
  };
};
