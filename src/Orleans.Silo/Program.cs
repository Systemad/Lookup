using System.Net;
using API;
using API.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Orleans;
using Orleans.Configuration;
using Orleans.Grains;
using Orleans.Hosting;
using Orleans.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var silo = new SiloHostBuilder()
    .UseLocalhostClustering()
    .Configure<ClusterOptions>(options =>
    {
        options.ClusterId = "dev";
        options.ServiceId = "lookup-service";
    })
    .Configure<EndpointOptions>(options =>
    {
        options.AdvertisedIPAddress = IPAddress.Loopback;
    })
    //.AddMemoryGrainStorageAsDefault()
    //.ConfigureApplicationParts(parts => parts.AddFromDependencyContext().WithReferences())
    .AddMemoryGrainStorage("AccountState")
    .AddMemoryGrainStorage("PubSubStore")
    .ConfigureApplicationParts(services =>
    {
        services.AddApplicationPart(typeof(IPushNotifierGrain).Assembly).WithReferences()
            .AddApplicationPart(typeof(PushNotifierGrain).Assembly).WithReferences();
        
        services.AddApplicationPart(typeof(ILookupAccount).Assembly).WithReferences()
            .AddApplicationPart(typeof(LookupAccount).Assembly).WithReferences();
    })
    //.AddSimpleMessageStreamProvider(Constants.InMemoryStream)
    .ConfigureServices(services =>
    {
        services.AddSignalR();
    })
    .ConfigureLogging(
        log => log
            .AddFilter("Orleans.Runtime.Management.ManagementGrain", LogLevel.Warning)
            .AddFilter("Orleans.Runtime.SiloControl", LogLevel.Warning))
    .UseDashboard()
    .Build();

//builder.Services.AddSignalRApplication();
builder.Services.AddSingleton(silo);

var app = builder.Build();

await silo.StartAsync();
await app.RunAsync();