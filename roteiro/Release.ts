import { readfilesync,writefilesync  } from 'nó:fs'
import { liberar } from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

liberar({
    repositório: 'vite-projeto',
    pacote:'[vite-plugin-legacy]',
    versão: '2.0.0',
    descrição: 'Plugin Vite para compatibilidade com navegadores mais antigos',
    autor: 'Vite Team',
    licença: 'MIT',
    homepage: 'github.com/vitejs/vite-plugin-legacy',
    bugs: 'github.com/vitejs/vite-plugin-legacy/issues',
    doação: 'github.com/vitejs/vite-plugin-legacy/donate',
    dependências: {
        'vite': '^2.0.0',
        'vite-plugin-html': '^2.0.0'
    },
    scripts: {
        'build': 'vite build',
        'serve': 'vite'
    },
    repositório: {
        tipo: 'git',
        url: 'github.com/vitejs/vite-plugin-legacy.git'
    },
    keywords: ['vite', 'plugin', 'legacy', 'compatibility'],
          
    paraEtiquetar:(pacote,vesão) => `${pacote}@${versão}`,
        changelogDeAlteracoes: async (nomeDoPacote) => {
            const changelog = readfilesync(`./${nomeDoPacote}/CHANGELOG.md`, 'utf-8')
        }
    })
    
    const indice = readfilesync('./index.html', 'utf-8')
    const novoIndice = indice.replace(/<title>.*<\/title>/, '<title>Vite Plugin Legacy</title>')

    writefilesync('./index.html', novoIndice, 'utf-8')
    console.log('Arquivo index.html atualizado com sucesso!')
    export default defineConfig({

        plugins: [
            
            createHtmlPlugin()
        ]
    })

const registroDeAlteracoes = readfilesync('pacotes', 'utf-8');

const novoRegistro = registroDeAlteracoes.replace(/<title>.*<\/title>/, '<title>Vite Plugin Legacy</title>');

writefilesync('pacotes', novoRegistro, 'utf-8');