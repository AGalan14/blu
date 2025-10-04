import { Client } from "discord.js";
import fs from "fs";
import path from "path";

export function loadEvents(client: Client): void {
  // Construimos la ruta a la carpeta de eventos
  const eventsPath = path.join(__dirname, "../events");
  // Leemos todas las subcarpetas (categorías de eventos)
  const eventFolders = fs.readdirSync(eventsPath);

  for (const folder of eventFolders) {
    const folderPath = path.join(eventsPath, folder);
    // Leemos todos los archivos .ts dentro de cada subcarpeta
    const eventFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of eventFiles) {
      const filePath = path.join(folderPath, file);
      // Importamos el evento
      const event = require(filePath);

      // Verificamos si el evento debe ejecutarse una sola vez (once) o siempre (on)
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }

      console.log(`✅ Evento cargado: ${event.name}`);
    }
  }
}
