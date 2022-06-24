This is a Twitter clone, called Lookup, made with Orleans and React.

NOTE: The project is in a very (very) early state!

## Technologies
* [React with Typescript, Redux Toolkit (Query), Styled Components](https://reactjs.org/)
* [ASP.NET Core 6](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-6.0)
* [Orleans with ADO.NET](https://github.com/dotnet/orleans)
* [Docker](https://www.docker.com/)
* [SignalR](https://dotnet.microsoft.com/en-us/apps/aspnet/signalr)
* [ViteJs](https://vitejs.dev/)
* [ChakraUI](https://chakra-ui.com/)

## Features:
- Send and delete Lookups
- Ability to follow people, and display recent lookups in timeline
- Ability to reply to lookups
- Ability to click a Lookup, and view detailed information as well as replies
- Ability to view profile of users, which included info and Lookups
F

## Getting it running

### API
1. You need to add authentication configuration, to set Azure B2C up, follow these guides [Azure B2C](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/azure-ad-b2c?view=aspnetcore-6.0)
2. Navigate to `src/lookup` and run `npm install`
3. Navigate to `src/lookup` and run `npm run dev` to launch the front end

### React
1. Edit the authentication configuration in src/lookup/features/auth/authConfig.ts (use the same values provided above)
2. Navigate to `src/lookup` and run `npm install`
3. Run `npm run dev` to launch the front end

### Local Configuration
The project is configured to use HTTPS and SSL certificate by default. If the certificate does not exist, it will create one automatically upon start.

### Azure Web Apps (TODO)
The app is not currently setup for seamless deployment. You can find the files in assets.

## Overview

### API & Orleans
The API is co-hosted with Orleans, and you can find the endpoints as well as the SignalR hubs.

### Lookup
Contains React project, seperated from backend

## License
Coming soon
