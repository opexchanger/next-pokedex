FROM node:14

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY tsconfig.json ./

RUN npm install

COPY . .

ENV DATABASE_URL postgres://pokedex_j5vc_user:skssbOrbdISFG5I4MyOQt3h83JUot27P@dpg-cd4o0sqrrk02t5fiqjvg-a.oregon-postgres.render.com/pokedex_j5vc

RUN npm run pre-build

RUN npm run build

# ENV NODE_ENV production

# EXPOSE 3000

ENV PORT 3001

CMD ["npm", "start"]

# FROM node:14

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# ENV PORT=8080

# EXPOSE 8080

# CMD [ "npm", "start" ]