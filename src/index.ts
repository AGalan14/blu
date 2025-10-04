import { Client, GatewayIntentBits, Collection } from "discord.js";
import dotenv from "dotenv";
import { loadEvents } from "./handlers/eventHandler";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Creamos una nueva instancia del cliente de Discord
// Los 'Intents' le dicen a Discord qué tipo de eventos tu bot quiere recibir
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Necesario para interacciones básicas del servidor
  ],
});

// ¡Aquí llamamos a nuestro manejador de eventos!
loadEvents(client);

// Iniciamos sesión en Discord con el token del bot
const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error("El token de Discord no está definido en el archivo .env");
}

client.login(token);
