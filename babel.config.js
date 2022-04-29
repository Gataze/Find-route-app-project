module.exports = {
    "presets": [
        "@babel/preset-env",
        {
            "modules": "auto"
        },
        "jest"
    ],
    "plugins": ["@babel/plugin-proposal-export-default-from"]
};