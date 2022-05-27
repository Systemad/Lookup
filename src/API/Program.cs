using System.Net;
using API.Extensions;
using API.Extensions.Orleans;
using API.SignalR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NSwag.AspNetCore;
using Orleans;
using Orleans.Configuration;
using Orleans.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    //options.JsonSerializerOptions.ReferenceHandler = Newtonsoft.Json.ReferenceLoopHandling.Ignore,
    //options.SerializerSettings. PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddApiVersioning(config =>
{
    config.DefaultApiVersion = new ApiVersion(1, 0);
    // use default version when version is not specified
    config.AssumeDefaultVersionWhenUnspecified = true;
    // Advertise the API versions supported for the particular endpoint
    config.ReportApiVersions = true;
});

builder.Services.AddVersionedApiExplorer(setup =>
{
    setup.GroupNameFormat = "'v'VVV";
    setup.SubstituteApiVersionInUrl = true;
});

builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});

builder.Services.AddAppAuthentication(builder.Configuration);
builder.Services.AddSignalRApplication();
builder.Services.AddCorsService();
builder.Services.AddOpenApiServiceOath(builder.Configuration);

// Due SignalR issues, we're co-hosting Orleans alongside the API.
//builder.Services.AddOrleans();
builder.Host.UseOrleans(silobuilder =>
{
    silobuilder.UseLocalhostClustering();
    silobuilder.Configure<ClusterOptions>(options =>
    {
        options.ClusterId = "dev";
        options.ServiceId = "lookup-service";
    });
    silobuilder.Configure<EndpointOptions>(options =>
    {
        options.AdvertisedIPAddress = IPAddress.Loopback;
    });
    silobuilder.AddMemoryGrainStorage("AccountState");
    silobuilder.ConfigureLogging(
        log => log
            .AddFilter("Orleans.Runtime.Management.ManagementGrain", LogLevel.Warning)
            .AddFilter("Orleans.Runtime.SiloControl", LogLevel.Warning));
    silobuilder.UseDashboard();
});

var app = builder.Build();

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
//app.MapControllers();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<BaseHub>("/mainhub");
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi3(settings =>
    {
        settings.OAuth2Client = new OAuth2ClientSettings
        {
            ClientId = builder.Configuration["Swagger:ClientId"],
            AppName = "swagger-ui-client"
        };
    });
}

app.Run();