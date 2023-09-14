# NVim API

This is a FiveM resource which hosts an API for my Neovim commands to work.

It is meant to be used together with
[FiveM.nvim](https://github.com/Z3rio/FiveM.nvim) (Which requires the Neovim
editor)

## Requirements

- [Node.js](https://nodejs.org/en)

## Setup

1. Open your terminal and run: `npm install`, `npm run build` in `nvimapi`'s
   directory. This will install all node modules and build the files.

2. Add the following line to your `server.cfg` for the resource to have
   permission to restart/stop other resources and such.

```lua
add_principal resource.nvimapi group.admin
```
