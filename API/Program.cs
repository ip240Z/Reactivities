// Creates Kestrel Server
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// used for dependency injections

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<Persistence.DataContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("defaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline. Think of this as middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

// Registers endpoints with controllers
app.MapControllers();

// using means whatever is inside the scope will be destroyed after the service is done being used. 
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try {
    var context = services.GetRequiredService<Persistence.DataContext>();
    await context.Database.MigrateAsync();
    await Persistence.Seed.SeedData(context);
} catch (Exception ex) {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
};

app.Run();
