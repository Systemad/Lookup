using Orleans;
using Orleans.Configuration;
using Orleans.Interfaces;

namespace API.Extensions.Orleans;

public class ClusterClientHostedService : IHostedService, IAsyncDisposable, IDisposable
{
    public IClusterClient Client { get; }
    
    public ClusterClientHostedService(ILoggerProvider loggerProvider)
    {
        Client = new ClientBuilder()
            // TODO: Add ADO.NET Clustering to deployment
            .UseLocalhostClustering()
            .Configure<ClusterOptions>(options =>
            {
                options.ClusterId = "dev";
                options.ServiceId = "lookup-service";
            })
            .ConfigureApplicationParts(services =>
            {
                services.AddApplicationPart(typeof(IPushNotifierGrain).Assembly).WithReferences()
                    .AddApplicationPart(typeof(PushNotifierGrain).Assembly).WithReferences();

                services.AddApplicationPart(typeof(ILookupAccount).Assembly).WithReferences();
                //.AddApplicationPart(typeof(LookupAccount).Assembly).WithReferences();
            })
            .ConfigureServices(services =>
            {
                //services.AddHostedService<HubListUpdater>();
                //services.AddSignalRApplication();
            })
            .ConfigureLogging(
                log => log
                    .AddFilter("Orleans.Runtime.Management.ManagementGrain", LogLevel.Warning)
                    .AddFilter("Orleans.Runtime.SiloControl", LogLevel.Warning))
            .Build();
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await Client.Connect();
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await Client.Close();
        Client.Dispose();
    }
    
    public void Dispose() => Client?.Dispose();
    public ValueTask DisposeAsync() => Client?.DisposeAsync() ?? default;
}