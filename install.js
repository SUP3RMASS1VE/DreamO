module.exports = {
  run: [
    // Clone the main app repository
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/bytedance/DreamO app"
        ]
      }
    },
    // Start torch environment
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
        }
      }
    },
    // Install dependencies
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    // Clone model FIRST
    {
      method: "shell.run",
      params: {
        message: [
          "git lfs install",
          "mkdir cache && mkdir cache\\HF_HOME && mkdir cache\\HF_HOME\\hub && mkdir cache\\HF_HOME\\hub\\models--black-forest-labs--FLUX.1-dev && mkdir cache\\HF_HOME\\hub\\models--black-forest-labs--FLUX.1-dev\\snapshots",
          "git clone https://huggingface.co/cocktailpeanut/xulf-d cache/HF_HOME/hub/models--black-forest-labs--FLUX.1-dev/snapshots/0ef5fff789c832c5c7f4e127f94c8b54bbcced44"
        ]
      }
    },
    // Create refs/main file (no blank lines, no newline)
    {
      method: "shell.run",
      params: {
        message: [
          "mkdir cache\\HF_HOME\\hub\\models--black-forest-labs--FLUX.1-dev\\refs",
          "<nul set /p=0ef5fff789c832c5c7f4e127f94c8b54bbcced44> cache\\HF_HOME\\hub\\models--black-forest-labs--FLUX.1-dev\\refs\\main"
        ]
      }
    }
  ]
}
