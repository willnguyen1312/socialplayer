import { getExportsSize } from "export-size"
import fs from "fs/promises"

const packages = [
  "core",
  "preact",
  "qwik",
  "react",
  "solid",
  "svelte",
  "vue",
  "angular/dist/angular",

  // plugins
  "dailymotion",
  "facebook",
  "mixcloud",
  "soundcloud",
  "streamable",
  "twitch",
  "vidyard",
  "vimeo",
  "wistia",
  "youtube",
]

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024,
    dm = decimals || 2,
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

async function main() {
  const result = await Promise.all(
    packages.map((pkg) => {
      return Promise.resolve(
        getExportsSize({
          pkg: `./packages/${pkg}`,
          output: false,
          bundler: "rollup",
          includes: ["@socialplayer/core"],
        }),
      )
    }),
  )

  const data: Record<string, Record<string, string>> = {}

  result.forEach((item) => {
    const { packageJSON, exports } = item
    const bundleInfo: Record<string, string> = {}

    exports.forEach((item) => {
      bundleInfo[item.name] = formatBytes(item.minzipped)
    })

    data[packageJSON.name] = bundleInfo
  })

  await fs.writeFile("size.json", JSON.stringify(data, null, 2) + "\n")
}

main()
