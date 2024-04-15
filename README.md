# Client

An Angular client for an Airbnb clone.

## Pull external libraries

You will need to pull the GIT submodule [Errbmb/types](https://github.com/ErrBmb/types) into the directory `/libs/types` with `git submodule update --init --recursive`.

## Installation

Run `npm i` to install all dependencies. You will need to patch the `ngx-mapbox-gl` dependency by commenting the following lines:

```ts
// File: /node_modules/ngx-mapbox-gl/fesm2022/ngx-mapbox-gl.mjs
// Lines: 33 to 35

if (options.customMapboxApiUrl) {
  MapboxGl.baseApiUrl = options.customMapboxApiUrl
}
```

You will also need to create the environments files with the following command:

```sh
$ ng generate environments
```

And set the following environment variables in both `environment.development.ts` and `environment.ts`:

```ts
export const environment = {
  MAPBOX_TOKEN: "<Your MapBox Token>",
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
