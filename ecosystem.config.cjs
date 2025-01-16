module.exports = {
    apps: [
        {
            name: 'MezaServers',
            port: '3033',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
