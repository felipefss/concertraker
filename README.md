# ConcerTraker

This app helps you keep track of the concerts you've been to.

# Pre-requisites

This project uses supabase's services of authentication and database. This project was built using the following:

- Docker v24.0.5
- Node.js v18.15.0
- yarn v1.22.19
- expo v49.0.9
- Android Virtual Device / iOS simulator / physical device

# How to run

## Supabase dev environment

In order to leverage of a full dev environment, you need to use supabase. To do it, run the following command in the
project root folder:

```bash
$ npx supabase start
```

This will trigger the download and initial set up of the docker containers. **Make sure you have Docker Desktop or the docker daemon running**.

To stop the service, just run:

```bash
$ npx supabase stop
```

## Set up device or simulator

To be able to build and run the app, you need a physical device or an Android Simulator configured. I won't get into
details of how to do it, but here is the documentation for it:
[Android Virtual Device DOCS](https://developer.android.com/studio/run/managing-avds).

## Dot env

There are 2 environment variables that are required for the project to run.

- EXPO_PUBLIC_SUPABASE_URL
- EXPO_PUBLIC_SUPABASE_ANON_KEY

They need to be set in a `.env` file in the root folder of the project.

The values for them you will get after running supabase's containers.

## Run the project

With the Virtual Device open and ready, just type the following in the project root:

```bash
$ yarn install
$ yarn start
```

After the Expo QR Code and Menu appears, press "a" to **open Android**.

# Next steps

This project is meant as a learning experience and showcase React/mobile skills. But if I was to continue developing
the project (which may still happen eventually, because it has been fun), I was thinking of adding the following:

- Add a friend list
  - Ability to look up friends by name/email and see their concert list
  - Add a friend's concert to my own concert list
- Light/Dark mode
- Integrate concerts with setlist.fm API
  - User would be able to relive the concert through the setlist, plus there could be some stats about the concert,
    which are available in the API, as well

# Learnings

- Expo version has to be greater than 49.0.6 to build the project
- There are a LOT of unmet dependencies in Expo. I had to manually install all of them so the project could build
  correctly
- I want to rebuild this with Flutter to see how different the Developer Experience and the actual app feeling is after
  built
