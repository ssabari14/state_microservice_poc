# 1️⃣ Use Node.js 20 (required by your Next.js version)
FROM node:20-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy dependency files
COPY package.json package-lock.json ./

# 4️⃣ Install dependencies
RUN npm ci

# 5️⃣ Copy source code
COPY . .

# 6️⃣ Build Next.js app
RUN npm run build

# 7️⃣ Expose port
EXPOSE 3000

# 8️⃣ Start production server
CMD ["npm", "start"]
