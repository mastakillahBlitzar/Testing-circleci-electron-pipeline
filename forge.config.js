module.exports = {
  packagerConfig: {
    name: "Sidekick"
  },
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {
        format: "ULFO",
        platforms: ["darwin"]
      }
    },
    {
      name: "@electron-forge/maker-wix",
      config: {
        ui: {
          template: `<UIRef Id="WixUI_Minimal" />`
        }
      }
    }
  ]
};
