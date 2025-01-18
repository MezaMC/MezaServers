module.exports = {
    apps: [
        {
            name: 'meza-servers',
            port: '3033',
            script: './server/index.mjs',
            args: 'start',
            env_file: './.env'
        }
    ]
}
