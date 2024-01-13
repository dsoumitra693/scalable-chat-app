{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  
  "pre-commit": [
    "ts.check",
    "build",
    "add-build"
  ],
  "devDependencies": {
    "@types/express": "^4.17.21",
    "pre-commit": "^1.2.2",
    "tsc-watch": "^6.0.4",
    "typescript": "^5.3.3"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "ioredis": "^5.3.2",
    "node-appwrite": "^11.1.0",
    "socket.io": "^4.7.3"
  }
}
