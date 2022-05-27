FROM mcr.microsoft.com/dotnet/runtime:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Silo/Silo.csproj", "Silo/"]
RUN dotnet restore "Silo/Silo.csproj"
COPY . .
WORKDIR "/src/Silo"
RUN dotnet build "Silo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Silo.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Silo.dll"]
