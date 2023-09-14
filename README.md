# NVim API

This is a FiveM resource which hosts an API for my Neovim commands to work.

It is meant to be used together with
[FiveM.nvim](https://github.com/Z3rio/FiveM.nvim) (Which requires the Neovim
editor)

**More information will be added here once it is finished**

## Setup

Add the following line to your `server.cfg` for the resource to have perms for
restarting/stopping other resources.

```lua
add_principal resource.nvimapi group.admin
```
