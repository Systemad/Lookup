using Domain;

namespace Signalr.Client
{
    class Program
    {
        private static List<LookupMessage> Messages = new();
        static void Main(string[] args)
        {
            var guidd = Guid.NewGuid();
            var item = new LookupMessage
            {
                Id = guidd,
                Content = "non edited",
                PublisherUsername = "user",
                Timestamp = DateTimeOffset.Now,
                Likes = 0,
                Edited = false,
                ReplyId = null,
                EditedTimetamp = null
            };
            
            Messages.Add(item);

            var returnitem = Messages.FirstOrDefault(x => x.Id == guidd);
            if (returnitem is null) return;
            returnitem.Content = "edited content";
            var index = Messages.FindIndex(z => z.Id == guidd);
            Messages[index] = returnitem;
        }
    }
}


/*
Console.WriteLine("Entry point");
var connection = new HubConnectionBuilder()
    .WithUrl(new Uri("https://localhost:7256/mainhub"))
    .WithAutomaticReconnect()
    .Build();

Console.WriteLine("HubConnection built");
connection.On<LookupMessage>("lookupReceived", (message) =>
{
    Console.WriteLine("Client: Lookup received " + message);
});  

Console.WriteLine("Method added");

Console.WriteLine("Starting client");
await connection.StartAsync();

var uuid = Guid.NewGuid();
Console.WriteLine("client Started");
//Thread.Sleep(10000);
// string Content, bool edited, DateTimeOffset? editedTimestamp = null, Guid? replyId = null
var model = new CreateLookupModel("hey", false);

await connection.InvokeAsync("NewLookupMethod", uuid, model);


Console.ReadLine();
*/