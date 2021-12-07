/* eslint-disable no-unused-vars */
interface PlaylistExportService {
  export(playlistId: string, targetEmail: string): Promise<void>;
}

export default PlaylistExportService;
