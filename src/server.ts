import App from './App';

const server = App.listen(3001, '127.0.0.1', () => {
  console.log('Server is running on port 3001');
});

process.on('unhandledRejection', (reason: unknown, p: Promise<unknown>) => {
  p.catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(`Error: ${reason instanceof Error ? reason.name : 'Unknown'}: `, error.message);
    } else {
      console.error(`UnhandledRejection occurred. Reason: ${reason}`);
    }
  }).finally(() => {
    server.close((closeError: Error | undefined) => {
      if (closeError) {
        console.error(`Server close error: ${closeError.message}`);
      }
      process.exit(1);
    });
  });
});
