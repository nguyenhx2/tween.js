/**
 * Make adjustments to the definition generated by Typescript
 */

var fs = require('fs')
var path = require('path')

var file = path.join(__dirname, '../dist/index.d.ts')

let content = fs.readFileSync(file) + ''

content = content
	.replace(/\r\n/g, '\n')
	.replace(/\s*export default [^;{]+;/g, '')
	.replace(/export (default )?(?!{)/g, '')
	.replace(/(}\n)?declare module [^{]+{/g, '')
	.replace(/import [^;]+;/g, '')
	.replace(/}\n$/, '')
	.replace(/;\n(\s*)\//g, ';\n\n$1/')
	.replace(/}\n(\s*)([^\s])/g, '}\n\n$1$2')
	.replace(/\n\n(\s*\n)+/g, '\n\n')

content = `declare module "@tweenjs/tween.js" {
${content}
} `

fs.writeFileSync(file, content)
