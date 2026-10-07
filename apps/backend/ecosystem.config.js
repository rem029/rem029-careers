module.exports = {
    apps: [
        {
            name: "careers-printemps-backend", // Name of your backend app (PayloadCMS)
            script: "dist/server.js", // Directly run the compiled server file
            autorestart: true, // Automatically restart if crashes occur
            exec_mode: "cluster", // Cluster mode for PayloadCMS as well
            instances: 1, // Max instances based on available CPU cores
            max_memory_restart: "1G", // Restart if memory exceeds 1GB
            env: {
                NODE_ENV: "production", // Run PayloadCMS in production mode
                PAYLOAD_CONFIG_PATH: "dist/payload.config.js", // Ensure the correct config path is set
            },
            watch: false, // Disable file watching for production
        },
    ],
};