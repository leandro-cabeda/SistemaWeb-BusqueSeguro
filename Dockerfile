# Image ser usada de referencia la no DockerHub
FROM node:carbon

# diretorio que vai tar aplicação do container da image no docker
WORKDIR /usr/src/app

#copia tudo que tem package* e que vem depois e clona no Workdir ferencia do diretorio: ./
COPY package*.json ./

# Executa a instalação das dependencias 
RUN npm install

# Copia tudo que tiver mesmo nivel do Dockerfile para Workdir
COPY . .


# Exportando a porta 3000 do container para quem ta de fora
EXPOSE 3000

# Definição da image quando for buildar , vai executar passo a passo desses comandos
CMD [ "npm","start" ]

