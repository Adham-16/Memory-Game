export function Messages({ progress }) {
  let message = '';

  if (progress === 'quarter') {
    message = 'You have completed a quarter of the cards!';
  } else if (progress === 'half') {
    message = 'You have completed half of the cards!';
  } else if (progress === 'done') {
    message = 'Well done, you have completed this round!';
  }

  return (
    <div className="text-center">
      {message && <p className="text-2xl text-green-500">{message}</p>}
    </div>
  );
}
