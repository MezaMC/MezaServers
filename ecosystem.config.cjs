module.exports = {
    apps: [
        {
            name: 'meza-servers',
            port: '3033',
            script: './server/index.mjs',
            args: 'start',

            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production",
            },

            env_file: "/opt/meza-servers/.env"

        }
    ]
}
