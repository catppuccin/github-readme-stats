import fs from "fs";
import { variants } from "@catppuccin/palette";

const header = fs.readFileSync("tmpl/readme.header.md");
const footer = fs.readFileSync("tmpl/readme.footer.md");

var readme = header.toString();
readme += "\n## Usage\n\n";

const user_url =
  "https://github-readme-stats.vercel.app/api?username=Pocco81&show_icons=true";
const repo_url =
  "https://github-readme-stats.vercel.app/api/pin/?username=catppuccin&repo=catppuccin";

function makeStatsConfig(paletteName) {
  var bgColor = variants[paletteName].base.hex.slice(1);
  var textColor = variants[paletteName].text.hex.slice(1);
  var iconColor = variants[paletteName].mauve.hex.slice(1);
  var titleColor = variants[paletteName].teal.hex.slice(1);
  return `&bg_color=${bgColor}&text_color=${textColor}&icon_color=${iconColor}&title_color=${titleColor}`;
}

for (var paletteName in variants) {
  var colorConfig = makeStatsConfig(paletteName);
  var userMdLink = `![${paletteName} user preview](${user_url}${colorConfig})`;
  var repoMdLink = `![${paletteName} repo preview](${repo_url}${colorConfig})`;
  readme += `### ${
    paletteName.charAt(0).toUpperCase() + paletteName.slice(1)
  }\n\n${userMdLink}\n${repoMdLink}\n\n`;
  readme += `append \`${colorConfig}\` to the url\n\n`;
}

readme += footer.toString();

fs.writeFileSync("./README.md", readme);
