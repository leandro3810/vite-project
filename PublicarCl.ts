import {publicar} from '@vitejs/release-scripts';

publicar({
    proveniência: verdadeiro,
    obterpkgdir(pacote) {
        if (pacote === 'vite+react') {
            retornar `pacotes/${pacote}/dist`
        }
        },
    })
