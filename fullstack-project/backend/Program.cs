using System.Text;
using Backend.Data;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;
using Backend.Models;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Bind JWT settings from configuration
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.AddSingleton<JwtService>();

// Configure Entity Framework Core to use MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    }
    // Replace the version below with your installed MySQL version
    var serverVersion = new MySqlServerVersion(new Version(8, 0, 32));
    options.UseMySql(connectionString, serverVersion);
});

// Add controllers
builder.Services.AddControllers();

// Configure CORS to allow requests from the React front‑end.  Without this
// policy the browser will block requests due to the Same Origin Policy when
// your API and front‑end are served from different ports (e.g. 5000 and 3000).
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // You can adjust the origin list to match your front‑end URL(s).
        policy.WithOrigins(
            "http://localhost:3000",    // React development server
            "http://127.0.0.1:3000"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// Configure JWT authentication
var jwtSection = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSection.GetValue<string>("Secret");
if (string.IsNullOrEmpty(secretKey))
{
    throw new InvalidOperationException("JWT Secret is missing in configuration.");
}
var key = Encoding.UTF8.GetBytes(secretKey);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSection.GetValue<string>("Issuer"),
        ValidAudience = jwtSection.GetValue<string>("Audience"),
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Seed default admin user
SeedDefaultAdmin(app.Services);

// Configure middleware
app.UseRouting();

var uploadsRoot = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
if (!Directory.Exists(uploadsRoot))
{
    Directory.CreateDirectory(uploadsRoot);
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsRoot),
    RequestPath = "/uploads"
});

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
});

app.Run();


static void SeedDefaultAdmin(IServiceProvider serviceProvider)
{
    using (var scope = serviceProvider.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        
        if (!context.Admins.Any(a => a.Email == "admin@erp.com"))
        {
            
            var admin = new Admin
            {
                Name = "Default Admin",
                Email = "admin@erp.com",
                PasswordHash = ComputeHash("Admin@123"),
                Role = "Admin",
                AccountNumber = "0000000001"
            };
            
            context.Admins.Add(admin);
            context.SaveChanges();
            
            Console.WriteLine("Default admin user created successfully!");
            Console.WriteLine("Email: admin@erp.com");
            Console.WriteLine("Password: Admin@123");
        }
    }
}

static string ComputeHash(string password)
{
    using (var sha256 = SHA256.Create())
    {
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}