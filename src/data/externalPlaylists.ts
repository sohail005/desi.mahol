/**
 * Playlists that stream directly from YouTube instead of the internal
 * song catalogue. Shown in the "Playlists" dropdown alongside the
 * rotation-based playlists from src/data/playlists.ts.
 */
export interface ExternalPlaylist {
  id: string;
  label: string;
  youtubePlaylistId: string;
}

export const externalPlaylists: ExternalPlaylist[] = [
  {
    id: "garba-dandiya",
    label: "Garba / Dandiya",
    youtubePlaylistId: "PL9bw4S5ePsEEp4e2YJPsWMfiFkpKzELRR",
  },
  {
    id: "party",
    label: "Party",
    youtubePlaylistId: "PLnGRV05XmAq2xzqAI9kr-9o11J7uLS19w",
  },
  {
    id: "marathi",
    label: "Marathi",
    youtubePlaylistId: "PLMyxT3YKEH7VY4YKBX2yF8mNyfTnBtG1J",
  },
  {
    id: "2026-specials",
    label: "2026 Specials",
    youtubePlaylistId: "PLO7-VO1D0_6MnOoKQGmYNY2OoCOP3GRfm",
  },
];
