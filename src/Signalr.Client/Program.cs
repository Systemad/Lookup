using Domain;
using Microsoft.AspNetCore.SignalR.Client;

Console.WriteLine("Entry point");
var connection = new HubConnectionBuilder()
    .WithUrl(new Uri("https://localhost:7256/mainhub"))
    .WithAutomaticReconnect()
    .Build();

Console.WriteLine("HubConnection built");
connection.On<LookupMessage>("lookupReceived", (message) =>
{
    Console.WriteLine("Client: Lookup received " + message.Content);
});  

Console.WriteLine("Method added");

Console.WriteLine("Starting client");
await connection.StartAsync();

var uuid = Guid.NewGuid();
Console.WriteLine("client Started");
//Thread.Sleep(10000);

await connection.InvokeAsync("NewLookupMethod", uuid, "lookUpWhatevs");


Console.ReadLine();