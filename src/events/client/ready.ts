import { Events, Client } from "discord.js";

module.exports = {
  name: Events.ClientReady, // El nombre del evento que estamos escuchando
  once: true, // Indica que este evento solo debe ejecutarse una vez
  execute(client: Client) {
    // El 'client.user' no puede ser nulo aquí porque el evento se dispara después del login
    console.log(`🚀 ¡Listo! Conectado como ${client.user!.tag}`);
  },
};
