module.exports = {
    apps: [
        {
            name: "careers-printemps-frontend", // Name of your frontend app
            script: "node_modules/.bin/next", // Use the Next.js binary to start the app
            args: "start -p 3006", // Start the Next.js app
            exec_mode: "cluster", // Cluster mode to utilize multiple CPUs
            instances: 1, // Max instances based on available CPU cores
            autorestart: true, // Automatically restart if crashes occur
            watch: false, // You can enable watching for dev, but false for production
            max_memory_restart: "1G", // Restart if memory exceeds 1GB
            env: {
                NODE_ENV: "production", // Set environment to production
                PORT: 3006
            },
        },
    ],
};
