module.exports = async (kernel) => {
  const port = await kernel.port();
  return {
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          venv: "env",
          env: {},
          path: "app",
          message: [
            `python app.py --int8 --port ${port}`,
          ],
          on: [{
            event: "/http:\\/\\/\\S+/",
            done: true
          }]
        }
      },
      {
        method: "local.set",
        params: {
          url: "{{input.event[0].replace('0.0.0.0', '127.0.0.1')}}"
        }
      },
      {
        method: "shell.run",
        params: {
          message: [
            "start {{local.url}}"
          ]
        }
      }
    ]
  };
};
