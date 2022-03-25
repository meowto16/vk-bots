FROM node:17.8
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

CMD ["npm", "run", "start", "--es-module-specifier-resolution=node"]