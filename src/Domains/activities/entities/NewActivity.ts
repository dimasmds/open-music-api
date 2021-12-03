type NewActivity = {
  playlistId?: string
  songId: string
  userId: string
  action: 'add' | 'delete',
  time: string
}

export default NewActivity;
