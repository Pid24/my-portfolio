module.exports = {
  apps: [
    {
      name: "my-portfolio",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3003",
      cwd: "/var/www/my-portfolio",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}
