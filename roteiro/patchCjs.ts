/** 

Ele convert
```ts
exportações.default = vuePlugin;
exporttações.parsevuerequest =parseVueRequest;
```
para

  ```ts
  module.exports = vuePlugin;
  module.exports.parseVueRequest = parseVueRequest;
  module.exports.default = vuePlugin;
  ```
  */

  import { readFileSync, writeFileSync } from 'node:fs'
  import colors from 'picocolors'

  const caminhoindex = 'dist/index.cjs'
  let código = readFileSync(caminhoindex, 'utf-8')

  const combinarmisto = código.match(/\nexports\.default = (\w+);/)
  if (combinarmisto) {
    const nome = combinarmisto[1]

    const linhas = código.trimEnd().split('\n')

    // Search from the end to prepend `module.` to `exports[xxx]`
    for (let i = linhas.length - 1; i > 0; i--) {
      if (linhas[i].startsWith('exports.')) {
        linhas[i] = 'module.' + linhas[i]
      } else {
        // At the start of exports, export the default function
        linhas[i] += `\nmodule.exports = ${nome};`
        break
      }
    } 
    código = linhas.join('\n')
    código = código.replace(/exports\.(\w+)\s*=\s*([^;]+);/g, 'module.exports.$1 = $2;')
    código = código.replace(/exports\.default\s*=\s*([^;]+);/, 'module.exports.default = $1;')

    writeFileSync(caminhoindex, código)
    console.log(colors.cyan('convertido para cjs'), caminhoindex)
  } else {
    console.log(colors.red('não encontrado'), caminhoindex)
  }
