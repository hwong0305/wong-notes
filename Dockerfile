FROM devwong0305/myproxy-node:0.1.0

WORKDIR /home/node/app

COPY . /home/node/app
RUN npm install

CMD ["npm", "run", "start"]