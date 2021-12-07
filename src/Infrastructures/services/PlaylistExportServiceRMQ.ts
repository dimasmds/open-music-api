// TODO: no test yet!
import amqp from 'amqplib';
import PlaylistExportService from '../../Domains/playlists/service/PlaylistExportService';

class PlaylistExportServiceRMQ implements PlaylistExportService {
  public static async createConnection() {
    return amqp.connect('amqp://localhost');
  }

  async export(playlistId: string, targetEmail: string): Promise<void> {
    const connection = await PlaylistExportServiceRMQ.createConnection();
    const channel = await connection.createChannel();

    const queue = 'playlist.export';
    const message = JSON.stringify({ playlistId, targetEmail });

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  }
}

export default PlaylistExportServiceRMQ;
