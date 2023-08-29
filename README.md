# default

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).


## Developing with podman
Install podman, follow instruction for your OS in https://podman.io/

cd into the application directory, you'll see a file called `Containerfile`.

Build the image

```
podman build . -t ${USER}/web-poc
```

Run the application using podman and mount `src/` to the pod to edit files in real time.
```
podman run -e CHOKIDAR_USEPOLLING=true  -v ${PWD}/src/:/app/src/ -p 8080:8080 ${USER}/web-poc
```

In case you need to run a command in the Container o see logs, use the terminal available in the podman dashboard.
