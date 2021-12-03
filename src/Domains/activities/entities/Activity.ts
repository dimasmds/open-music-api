type Activity = {
  username: string;
  title: string;
  action: 'add' | 'delete',
  time: string;
}

export default Activity;
