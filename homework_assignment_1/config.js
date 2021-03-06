// Create and export configs
const environments = {};
// Default staging environment
environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging'
};
// Production environment
environments.production = {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production'
};

// Determine export
const currentEnvironment = typeof process.env.NODE_ENV === 'string' 
                            ? process.env.NODE_ENV.toLowerCase()
                            : 'staging';
const environmentToExport = environments.hasOwnProperty(currentEnvironment)
                            ? environments[currentEnvironment]
                            : environments['staging'];

// Actually export environment
module.exports = environmentToExport;